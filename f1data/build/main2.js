window.addEventListener("error", event => {
    fetch(`/error/window/?${encodeURI(event.message)}`);
});
window.addEventListener("unhandledrejection", event => {
    event.promise.catch(err => fetch(`/error/promise/?${encodeURI(err)}`));
});

function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$1(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

/**
 * @typedef {Object} WrappedComponent Object returned by the `wrap` method
 * @property {SvelteComponent} component - Component to load (this is always asynchronous)
 * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
 * @property {Object} [props] - Optional dictionary of static props
 * @property {Object} [userData] - Optional user data dictionary
 * @property {bool} _sveltesparouter - Internal flag; always set to true
 */

/**
 * @callback AsyncSvelteComponent
 * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
 */

/**
 * @callback RoutePrecondition
 * @param {RouteDetail} detail - Route detail object
 * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
 */

/**
 * @typedef {Object} WrapOptions Options object for the call to `wrap`
 * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
 * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
 * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
 * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
 * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
 * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
 * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
 */

/**
 * Wraps a component to enable multiple capabilities:
 * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
 * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
 * 3. Adding static props that are passed to the component
 * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
 * 
 * @param {WrapOptions} args - Arguments object
 * @returns {WrappedComponent} Wrapped component
 */
function wrap$2(args) {
    if (!args) {
        throw Error('Parameter args is required')
    }

    // We need to have one and only one of component and asyncComponent
    // This does a "XNOR"
    if (!args.component == !args.asyncComponent) {
        throw Error('One and only one of component and asyncComponent is required')
    }

    // If the component is not async, wrap it into a function returning a Promise
    if (args.component) {
        args.asyncComponent = () => Promise.resolve(args.component);
    }

    // Parameter asyncComponent and each item of conditions must be functions
    if (typeof args.asyncComponent != 'function') {
        throw Error('Parameter asyncComponent must be a function')
    }
    if (args.conditions) {
        // Ensure it's an array
        if (!Array.isArray(args.conditions)) {
            args.conditions = [args.conditions];
        }
        for (let i = 0; i < args.conditions.length; i++) {
            if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                throw Error('Invalid parameter conditions[' + i + ']')
            }
        }
    }

    // Check if we have a placeholder component
    if (args.loadingComponent) {
        args.asyncComponent.loading = args.loadingComponent;
        args.asyncComponent.loadingParams = args.loadingParams || undefined;
    }

    // Returns an object that contains all the functions to execute too
    // The _sveltesparouter flag is to confirm the object was created by this router
    const obj = {
        component: args.asyncComponent,
        userData: args.userData,
        conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
        props: (args.props && Object.keys(args.props).length) ? args.props : {},
        _sveltesparouter: true
    };

    return obj
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}

function regexparam (str, loose) {
	if (str instanceof RegExp) return { keys:false, pattern:str };
	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
	arr[0] || arr.shift();

	while (tmp = arr.shift()) {
		c = tmp[0];
		if (c === '*') {
			keys.push('wild');
			pattern += '/(.*)';
		} else if (c === ':') {
			o = tmp.indexOf('?', 1);
			ext = tmp.indexOf('.', 1);
			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
		} else {
			pattern += '/' + tmp;
		}
	}

	return {
		keys: keys,
		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
	};
}

/* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.37.0 */

const { Error: Error_1, Object: Object_1, console: console_1 } = globals;

// (214:0) {:else}
function create_else_block$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*props*/ ctx[2]];
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*props*/ 4)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(214:0) {:else}",
		ctx
	});

	return block;
}

// (207:0) {#if componentParams}
function create_if_block$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
				])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(207:0) {#if componentParams}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*componentParams*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function wrap$1(component, userData, ...conditions) {
	// Use the new wrap method and show a deprecation warning
	// eslint-disable-next-line no-console
	console.warn("Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading");

	return wrap$2({ component, userData, conditions });
}

/**
 * @typedef {Object} Location
 * @property {string} location - Location (page/view), for example `/book`
 * @property {string} [querystring] - Querystring from the hash, as a string not parsed
 */
/**
 * Returns the current location from the hash.
 *
 * @returns {Location} Location object
 * @private
 */
function getLocation() {
	const hashPosition = window.location.href.indexOf("#/");

	let location = hashPosition > -1
	? window.location.href.substr(hashPosition + 1)
	: "/";

	// Check if there's a querystring
	const qsPosition = location.indexOf("?");

	let querystring = "";

	if (qsPosition > -1) {
		querystring = location.substr(qsPosition + 1);
		location = location.substr(0, qsPosition);
	}

	return { location, querystring };
}

const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
function start(set) {
	set(getLocation());

	const update = () => {
		set(getLocation());
	};

	window.addEventListener("hashchange", update, false);

	return function stop() {
		window.removeEventListener("hashchange", update, false);
	};
});

const location = derived(loc, $loc => $loc.location);
const querystring = derived(loc, $loc => $loc.querystring);

async function push(location) {
	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
		throw Error("Invalid parameter location");
	}

	// Execute this code when the current call stack is complete
	await tick();

	// Note: this will include scroll state in history even when restoreScrollState is false
	history.replaceState(
		{
			...history.state,
			__svelte_spa_router_scrollX: window.scrollX,
			__svelte_spa_router_scrollY: window.scrollY
		},
		undefined,
		undefined
	);

	window.location.hash = (location.charAt(0) == "#" ? "" : "#") + location;
}

async function pop() {
	// Execute this code when the current call stack is complete
	await tick();

	window.history.back();
}

async function replace(location) {
	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
		throw Error("Invalid parameter location");
	}

	// Execute this code when the current call stack is complete
	await tick();

	const dest = (location.charAt(0) == "#" ? "" : "#") + location;

	try {
		const newState = { ...history.state };
		delete newState["__svelte_spa_router_scrollX"];
		delete newState["__svelte_spa_router_scrollY"];
		window.history.replaceState(newState, undefined, dest);
	} catch(e) {
		// eslint-disable-next-line no-console
		console.warn("Caught exception while replacing the current page. If you're running this in the Svelte REPL, please note that the `replace` method might not work in this environment.");
	}

	// The method above doesn't trigger the hashchange event, so let's do that manually
	window.dispatchEvent(new Event("hashchange"));
}

function link(node, hrefVar) {
	// Only apply to <a> tags
	if (!node || !node.tagName || node.tagName.toLowerCase() != "a") {
		throw Error("Action \"link\" can only be used with <a> tags");
	}

	updateLink(node, hrefVar || node.getAttribute("href"));

	return {
		update(updated) {
			updateLink(node, updated);
		}
	};
}

// Internal function used by the link function
function updateLink(node, href) {
	// Destination must start with '/'
	if (!href || href.length < 1 || href.charAt(0) != "/") {
		throw Error("Invalid value for \"href\" attribute: " + href);
	}

	// Add # to the href attribute
	node.setAttribute("href", "#" + href);

	node.addEventListener("click", scrollstateHistoryHandler);
}

/**
 * The handler attached to an anchor tag responsible for updating the
 * current history state with the current scroll state
 *
 * @param {HTMLElementEventMap} event - an onclick event attached to an anchor tag
 */
function scrollstateHistoryHandler(event) {
	// Prevent default anchor onclick behaviour
	event.preventDefault();

	const href = event.currentTarget.getAttribute("href");

	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
	history.replaceState(
		{
			...history.state,
			__svelte_spa_router_scrollX: window.scrollX,
			__svelte_spa_router_scrollY: window.scrollY
		},
		undefined,
		undefined
	);

	// This will force an update as desired, but this time our scroll state will be attached
	window.location.hash = href;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Router", slots, []);
	let { routes = {} } = $$props;
	let { prefix = "" } = $$props;
	let { restoreScrollState = false } = $$props;

	/**
 * Container for a route: path, component
 */
	class RouteItem {
		/**
 * Initializes the object and creates a regular expression from the path, using regexparam.
 *
 * @param {string} path - Path to the route (must start with '/' or '*')
 * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
 */
		constructor(path, component) {
			if (!component || typeof component != "function" && (typeof component != "object" || component._sveltesparouter !== true)) {
				throw Error("Invalid component object");
			}

			// Path must be a regular or expression, or a string starting with '/' or '*'
			if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
				throw Error("Invalid value for \"path\" argument - strings must start with / or *");
			}

			const { pattern, keys } = regexparam(path);
			this.path = path;

			// Check if the component is wrapped and we have conditions
			if (typeof component == "object" && component._sveltesparouter === true) {
				this.component = component.component;
				this.conditions = component.conditions || [];
				this.userData = component.userData;
				this.props = component.props || {};
			} else {
				// Convert the component to a function that returns a Promise, to normalize it
				this.component = () => Promise.resolve(component);

				this.conditions = [];
				this.props = {};
			}

			this._pattern = pattern;
			this._keys = keys;
		}

		/**
 * Checks if `path` matches the current route.
 * If there's a match, will return the list of parameters from the URL (if any).
 * In case of no match, the method will return `null`.
 *
 * @param {string} path - Path to test
 * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
 */
		match(path) {
			// If there's a prefix, check if it matches the start of the path.
			// If not, bail early, else remove it before we run the matching.
			if (prefix) {
				if (typeof prefix == "string") {
					if (path.startsWith(prefix)) {
						path = path.substr(prefix.length) || "/";
					} else {
						return null;
					}
				} else if (prefix instanceof RegExp) {
					const match = path.match(prefix);

					if (match && match[0]) {
						path = path.substr(match[0].length) || "/";
					} else {
						return null;
					}
				}
			}

			// Check if the pattern matches
			const matches = this._pattern.exec(path);

			if (matches === null) {
				return null;
			}

			// If the input was a regular expression, this._keys would be false, so return matches as is
			if (this._keys === false) {
				return matches;
			}

			const out = {};
			let i = 0;

			while (i < this._keys.length) {
				// In the match parameters, URL-decode all values
				try {
					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || "") || null;
				} catch(e) {
					out[this._keys[i]] = null;
				}

				i++;
			}

			return out;
		}

		/**
 * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
 * @typedef {Object} RouteDetail
 * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
 * @property {string} location - Location path
 * @property {string} querystring - Querystring from the hash
 * @property {object} [userData] - Custom data passed by the user
 * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
 * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
 */
		/**
 * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
 * 
 * @param {RouteDetail} detail - Route detail
 * @returns {bool} Returns true if all the conditions succeeded
 */
		async checkConditions(detail) {
			for (let i = 0; i < this.conditions.length; i++) {
				if (!await this.conditions[i](detail)) {
					return false;
				}
			}

			return true;
		}
	}

	// Set up all routes
	const routesList = [];

	if (routes instanceof Map) {
		// If it's a map, iterate on it right away
		routes.forEach((route, path) => {
			routesList.push(new RouteItem(path, route));
		});
	} else {
		// We have an object, so iterate on its own properties
		Object.keys(routes).forEach(path => {
			routesList.push(new RouteItem(path, routes[path]));
		});
	}

	// Props for the component to render
	let component = null;

	let componentParams = null;
	let props = {};

	// Event dispatcher from Svelte
	const dispatch = createEventDispatcher();

	// Just like dispatch, but executes on the next iteration of the event loop
	async function dispatchNextTick(name, detail) {
		// Execute this code when the current call stack is complete
		await tick();

		dispatch(name, detail);
	}

	// If this is set, then that means we have popped into this var the state of our last scroll position
	let previousScrollState = null;

	if (restoreScrollState) {
		window.addEventListener("popstate", event => {
			// If this event was from our history.replaceState, event.state will contain
			// our scroll history. Otherwise, event.state will be null (like on forward
			// navigation)
			if (event.state && event.state.__svelte_spa_router_scrollY) {
				previousScrollState = event.state;
			} else {
				previousScrollState = null;
			}
		});

		afterUpdate(() => {
			// If this exists, then this is a back navigation: restore the scroll position
			if (previousScrollState) {
				window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
			} else {
				// Otherwise this is a forward navigation: scroll to top
				window.scrollTo(0, 0);
			}
		});
	}

	// Always have the latest value of loc
	let lastLoc = null;

	// Current object of the component loaded
	let componentObj = null;

	// Handle hash change events
	// Listen to changes in the $loc store and update the page
	// Do not use the $: syntax because it gets triggered by too many things
	loc.subscribe(async newLoc => {
		lastLoc = newLoc;

		// Find a route matching the location
		let i = 0;

		while (i < routesList.length) {
			const match = routesList[i].match(newLoc.location);

			if (!match) {
				i++;
				continue;
			}

			const detail = {
				route: routesList[i].path,
				location: newLoc.location,
				querystring: newLoc.querystring,
				userData: routesList[i].userData,
				params: match
			};

			// Check if the route can be loaded - if all conditions succeed
			if (!await routesList[i].checkConditions(detail)) {
				// Don't display anything
				$$invalidate(0, component = null);

				componentObj = null;

				// Trigger an event to notify the user, then exit
				dispatchNextTick("conditionsFailed", detail);

				return;
			}

			// Trigger an event to alert that we're loading the route
			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
			dispatchNextTick("routeLoading", Object.assign({}, detail));

			// If there's a component to show while we're loading the route, display it
			const obj = routesList[i].component;

			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
			if (componentObj != obj) {
				if (obj.loading) {
					$$invalidate(0, component = obj.loading);
					componentObj = obj;
					$$invalidate(1, componentParams = obj.loadingParams);
					$$invalidate(2, props = {});

					// Trigger the routeLoaded event for the loading component
					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
					dispatchNextTick("routeLoaded", Object.assign({}, detail, { component, name: component.name }));
				} else {
					$$invalidate(0, component = null);
					componentObj = null;
				}

				// Invoke the Promise
				const loaded = await obj();

				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
				if (newLoc != lastLoc) {
					// Don't update the component, just exit
					return;
				}

				// If there is a "default" property, which is used by async routes, then pick that
				$$invalidate(0, component = loaded && loaded.default || loaded);

				componentObj = obj;
			}

			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
			if (match && typeof match == "object" && Object.keys(match).length) {
				$$invalidate(1, componentParams = match);
			} else {
				$$invalidate(1, componentParams = null);
			}

			// Set static props, if any
			$$invalidate(2, props = routesList[i].props);

			// Dispatch the routeLoaded event then exit
			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
			dispatchNextTick("routeLoaded", Object.assign({}, detail, { component, name: component.name }));

			return;
		}

		// If we're still here, there was no match, so show the empty component
		$$invalidate(0, component = null);

		componentObj = null;
	});

	const writable_props = ["routes", "prefix", "restoreScrollState"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Router> was created with unknown prop '${key}'`);
	});

	function routeEvent_handler(event) {
		bubble($$self, event);
	}

	function routeEvent_handler_1(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("routes" in $$props) $$invalidate(3, routes = $$props.routes);
		if ("prefix" in $$props) $$invalidate(4, prefix = $$props.prefix);
		if ("restoreScrollState" in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
	};

	$$self.$capture_state = () => ({
		readable,
		derived,
		tick,
		_wrap: wrap$2,
		wrap: wrap$1,
		getLocation,
		loc,
		location,
		querystring,
		push,
		pop,
		replace,
		link,
		updateLink,
		scrollstateHistoryHandler,
		createEventDispatcher,
		afterUpdate,
		regexparam,
		routes,
		prefix,
		restoreScrollState,
		RouteItem,
		routesList,
		component,
		componentParams,
		props,
		dispatch,
		dispatchNextTick,
		previousScrollState,
		lastLoc,
		componentObj
	});

	$$self.$inject_state = $$props => {
		if ("routes" in $$props) $$invalidate(3, routes = $$props.routes);
		if ("prefix" in $$props) $$invalidate(4, prefix = $$props.prefix);
		if ("restoreScrollState" in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
		if ("component" in $$props) $$invalidate(0, component = $$props.component);
		if ("componentParams" in $$props) $$invalidate(1, componentParams = $$props.componentParams);
		if ("props" in $$props) $$invalidate(2, props = $$props.props);
		if ("previousScrollState" in $$props) previousScrollState = $$props.previousScrollState;
		if ("lastLoc" in $$props) lastLoc = $$props.lastLoc;
		if ("componentObj" in $$props) componentObj = $$props.componentObj;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
			// Update history.scrollRestoration depending on restoreScrollState
			history.scrollRestoration = restoreScrollState ? "manual" : "auto";
		}
	};

	return [
		component,
		componentParams,
		props,
		routes,
		prefix,
		restoreScrollState,
		routeEvent_handler,
		routeEvent_handler_1
	];
}

class Router extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {
			routes: 3,
			prefix: 4,
			restoreScrollState: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Router",
			options,
			id: create_fragment$3.name
		});
	}

	get routes() {
		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set routes(value) {
		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get prefix() {
		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set prefix(value) {
		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get restoreScrollState() {
		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set restoreScrollState(value) {
		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const storedDb = writable(null);
const defaultLoadingStatus = {
    cache: false,
    database: false,
    circuits: false,
    drivers: false,
    constructors: false,
    races: false,
    status: false,
    qualifying: false,
    results2020: false,
    results2010: false,
    results2000: false,
};
const loadingStatus = writable(defaultLoadingStatus);
const loadingProgress = derived(loadingStatus, stat => {
    let max = Object.keys(stat).length;
    let count = Object.values(stat).reduce((acc, cur) => cur ? acc + 1 : acc, 0);
    return Math.round(count / max * 100);
});

const cacheName = "f1-data";
const error = (msg) => { throw msg; };
function getLocale() {
    return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
}
function formatDate$1(date, format) {
    date = date instanceof Date ? luxon.DateTime.fromJSDate(date) : date;
    let locale = getLocale().split("-")[0];
    return date.setLocale(locale)
        .toFormat(format || "DDDD 'at' h:mm a");
}
const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];

const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking)
            db.addEventListener('versionchange', () => blocking());
    })
        .catch(() => { });
    return openPromise;
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

var keyvalStore = {
    open(storeName) {
        return openDB(storeName, 1, {
            upgrade(db) {
                db.createObjectStore(storeName);
            },
        })
            .then(db => {
            return {
                get(key) {
                    return db.get(storeName, key);
                },
                put(key, value) {
                    return db.put(storeName, value, key);
                },
                clear() {
                    return db.clear(storeName);
                }
            };
        });
    }
};

// Deletes stale cache based on versioning document
function maintainCache(storeName, file) {
    return fetch(file)
        .then(response => response || error("not-found"))
        .then(response => response.json())
        .then(async (doc) => {
        var current = localStorage.getItem(`${storeName}-version`);
        if (current != doc.version) {
            await keyvalStore.open(storeName)
                .then(store => store.clear());
        }
        localStorage.setItem(`${storeName}-version`, doc.version);
    });
}
// Finds text from cache, fetching from server if missing
function fetchFromCache(storeName, file) {
    return keyvalStore.open(storeName)
        .then(store => store.get(file))
        .then(value => value || error("not-cached"))
        .catch(err => {
        if (err == "not-cached") {
            return fetch(file)
                .then(response => response || error("not-found"))
                .then(response => response.text())
                .then(async (text) => {
                return await keyvalStore.open(storeName)
                    .then(store => store.put(file, text))
                    .then(_ => text);
            });
        }
        else {
            throw err;
        }
    });
}

// Check cache when database is updated
storedDb.subscribe(async (db) => {
    if (db) {
        await maintainCache(cacheName, "./data/version.json");
        loadingStatus.update(n => (Object.assign(Object.assign({}, n), { cache: true })));
    }
});

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

function dsvFormat(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}

var csv = dsvFormat(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;

// Fetches CSV from cache
function fetch_csv(cacheName, request, converter) {
    return fetchFromCache(cacheName, request)
        .then(text => csvParse(text, converter));
}
// Converts array to a string compatible with SQL INSERT statements
function reduceArrayToSQLString(val) {
    var result = val
        .reduce((out, x) => {
        if (x === null || x === undefined || x === NaN)
            out.push("NULL");
        else if (typeof x === 'string')
            out.push(`"${x}"`);
        else
            out.push(x);
        return out;
    }, [])
        .join(",");
    return "(" + result + ")";
}
// Inserts array of CSV data into table
function insertCSV(db, table, data) {
    data = data.map(reduceArrayToSQLString);
    return db.run(`INSERT INTO ${table} VALUES ${data.join(",\n")}`);
}

const tableName$6 = "circuits";
const converter$6 = (d) => [
    +d.circuitId,
    d.name,
    d.location,
    d.country,
    +d.lat,
    +d.lng,
    +d.alt
];
const createStmt$6 = `CREATE TABLE "circuits" (
	"circuitId"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"location"	TEXT,
	"country"	TEXT,
	"lat"	REAL,
	"lng"	REAL,
	"alt"	INTEGER,
	PRIMARY KEY("circuitId"))`;
// Create table and add data if database changes
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt$6);
        fetch_csv(cacheName, "./data/circuits.csv", converter$6)
            .then(data => insertCSV(db, tableName$6, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { circuits: true }))));
    }
});

const tableName$5 = "drivers";
const converter$5 = (d) => [
    +d.driverId,
    d.number ? +d.number : null,
    d.code ? d.code : null,
    d.forename,
    d.surname,
    d.dob,
    d.nationality
];
const createStmt$5 = `CREATE TABLE "drivers" (
	"driverId"	INTEGER NOT NULL UNIQUE,
	"number"	INTEGER,
	"code"	TEXT,
	"forename"	TEXT,
	"surname"	TEXT,
	"dob"	TEXT,
	"nationality"	TEXT,
	PRIMARY KEY("driverId"))`;
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt$5);
        fetch_csv(cacheName, "./data/drivers.csv", converter$5)
            .then(data => insertCSV(db, tableName$5, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { drivers: true }))));
    }
});

const tableName$4 = "constructors";
const converter$4 = (d) => [
    +d.constructorId,
    d.name,
    d.nationality
];
const createStmt$4 = `CREATE TABLE "constructors" (
	"constructorId"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"nationality"	TEXT,
	PRIMARY KEY("constructorId"))`;
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt$4);
        fetch_csv(cacheName, "./data/constructors.csv", converter$4)
            .then(data => insertCSV(db, tableName$4, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { constructors: true }))));
    }
});

const tableName$3 = "races";
const converter$3 = (d) => [
    +d.raceId,
    +d.circuitId,
    +d.year,
    +d.round,
    d.title,
    d.when
];
const createStmt$3 = `CREATE TABLE "races" (
	"raceId"	INTEGER NOT NULL UNIQUE,
	"circuitId"	INTEGER,
	"year"	INTEGER,
	"round"	INTEGER,
	"title"	TEXT,
	"when"	TEXT,
	PRIMARY KEY("raceId"))`;
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt$3);
        fetch_csv(cacheName, "./data/races.csv", converter$3)
            .then(data => insertCSV(db, tableName$3, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { races: true }))));
    }
});

const tableName$2 = "status";
const converter$2 = (d) => [
    +d.statusId,
    d.status
];
const createStmt$2 = `CREATE TABLE "status" (
	"statusId"	INTEGER NOT NULL UNIQUE,
	"status"	TEXT,
	PRIMARY KEY("statusId"))`;
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt$2);
        fetch_csv(cacheName, "./data/status.csv", converter$2)
            .then(data => insertCSV(db, tableName$2, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { status: true }))));
    }
});

const tableName$1 = "qualifying";
const converter$1 = (d) => [
    +d.qualifyId,
    +d.raceId,
    +d.driverId,
    +d.constructorId,
    +d.number,
    +d.position,
    +d.q1,
    +d.q2,
    +d.q3,
];
const createStmt$1 = `CREATE TABLE "qualifying" (
	"qualifyId"	INTEGER NOT NULL UNIQUE,
	"raceId"	INTEGER,
	"driverId"	INTEGER,
	"constructorId"	INTEGER,
	"number"	INTEGER,
	"position"	INTEGER,
	"q1"	INTEGER,
	"q2"	INTEGER,
	"q3"	INTEGER,
	PRIMARY KEY("qualifyId"))`;
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt$1);
        fetch_csv(cacheName, "./data/qualifying.csv", converter$1)
            .then(data => insertCSV(db, tableName$1, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { qualifying: true }))));
    }
});

const tableName = "results";
const converter = (d) => [
    +d.resultId,
    +d.raceId,
    +d.driverId,
    +d.constructorId,
    +d.number,
    +d.grid,
    +d.position,
    d.positionText,
    +d.positionOrder,
    +d.points,
    +d.laps,
    +d.milliseconds,
    +d.fastestLap,
    +d.rank,
    +d.fastestLapTime,
    +d.fastestLapSpeed,
    +d.statusId,
];
const createStmt = `CREATE TABLE "results" (
	"resultId"	INTEGER NOT NULL UNIQUE,
	"raceId"	INTEGER,
	"driverId"	INTEGER,
	"constructorId"	INTEGER,
	"number"	INTEGER,
	"grid"	INTEGER,
	"position"	INTEGER,
	"positionText"	TEXT,
	"positionOrder"	INTEGER,
	"points"	REAL,
	"laps"	INTEGER,
	"milliseconds"	INTEGER,
	"fastestLap"	INTEGER,
	"rank"	INTEGER,
	"fastestLapTime"	INTEGER,
	"fastestLapSpeed"	REAL,
	"statusId"	INTEGER,
	PRIMARY KEY("resultId"))`;
storedDb.subscribe(db => {
    if (db != null) {
        db.run(createStmt);
        fetch_csv(cacheName, "./data/results/2020.csv", converter)
            .then(data => insertCSV(db, tableName, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { results2020: true }))))
            .then(_ => fetch_csv(cacheName, "./data/results/2010.csv", converter))
            .then(data => insertCSV(db, tableName, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { results2010: true }))))
            .then(_ => fetch_csv(cacheName, "./data/results/2000.csv", converter))
            .then(data => insertCSV(db, tableName, data))
            .then(_ => loadingStatus.update(n => (Object.assign(Object.assign({}, n), { results2000: true }))));
    }
});

// Init database
async function init() {
    // Reset stores
    loadingStatus.set(defaultLoadingStatus);
    storedDb.set(null);
    // Create database
    var sqlJsConfig = { locateFile: (file) => `https://sql.js.org/dist/${file}` };
    var SQL = await initSqlJs(sqlJsConfig);
    var db = new SQL.Database();
    // Update stores
    loadingStatus.update(n => (Object.assign(Object.assign({}, n), { database: true })));
    storedDb.set(db);
}

const minYear = 1950;
const maxYear = 2021;
const minDecade = Math.floor(minYear / 10) * 10;
const maxDecade = Math.floor(maxYear / 10) * 10;
const seasons = Array.from(Array(maxYear - minYear + 1), (_, x) => x + minYear).sort((a, b) => b - a);
const decades = Array.from(Array(((maxDecade - minDecade) / 10) + 1), (_, x) => x * 10 + minDecade).sort((a, b) => b - a);
const getSeasons = () => seasons;
const getDecades = () => {
    return decades.map(decade => {
        let count = decade + 9 > maxYear ? maxYear - decade : 9;
        let years = Array.from(Array(count), (_, x) => decade + x + 1);
        return { decade, years };
    });
};

var routes = {
    "/": wrap$2({ asyncComponent: () => import('./Landing.js') }),
    "/seasons": wrap$2({ asyncComponent: () => import('./SeasonsTable.js') }),
    "/season/:year/:round?": wrap$2({ asyncComponent: () => import('./SeasonPage.js'),
        conditions: [
            (detail) => {
                detail.params.year = parseInt(detail.params.year);
                detail.params.round = parseInt(detail.params.round);
                return getSeasons().indexOf(detail.params.year) >= 0;
            }
        ]
    }),
    "/race/:year/:round": wrap$2({ asyncComponent: () => import('./Race.js'),
        conditions: [
            (detail) => {
                detail.params.year = parseInt(detail.params.year);
                detail.params.round = parseInt(detail.params.round);
                return detail.params.year && detail.params.round;
            }
        ]
    }),
    "/notfound": wrap$2({ asyncComponent: () => import('./NotFound.js') }),
    "*": wrap$2({ asyncComponent: () => import('./NotFound.js') }),
};

/* src\components\LoadingProgress.svelte generated by Svelte v3.37.0 */
const file$1 = "src\\components\\LoadingProgress.svelte";

function create_fragment$2(ctx) {
	let content;
	let div1;
	let div0;

	const block = {
		c: function create() {
			content = element("content");
			div1 = element("div");
			div0 = element("div");
			set_style(div0, "width", /*$loadingProgress*/ ctx[0] + "%");
			attr_dev(div0, "class", "svelte-npl93p");
			add_location(div0, file$1, 24, 2, 460);
			attr_dev(div1, "id", "progress");
			attr_dev(div1, "class", "svelte-npl93p");
			add_location(div1, file$1, 23, 1, 437);
			attr_dev(content, "class", "svelte-npl93p");
			add_location(content, file$1, 22, 0, 425);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, content, anchor);
			append_dev(content, div1);
			append_dev(div1, div0);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$loadingProgress*/ 1) {
				set_style(div0, "width", /*$loadingProgress*/ ctx[0] + "%");
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(content);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let $loadingProgress;
	validate_store(loadingProgress, "loadingProgress");
	component_subscribe($$self, loadingProgress, $$value => $$invalidate(0, $loadingProgress = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("LoadingProgress", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LoadingProgress> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ loadingProgress, $loadingProgress });
	return [$loadingProgress];
}

class LoadingProgress extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LoadingProgress",
			options,
			id: create_fragment$2.name
		});
	}
}

/* src\components\Header.svelte generated by Svelte v3.37.0 */
const file = "src\\components\\Header.svelte";

function create_fragment$1(ctx) {
	let header;
	let div0;
	let a0;
	let t1;
	let nav;
	let div1;
	let a1;
	let t3;
	let div2;
	let a2;
	let t5;
	let div3;
	let a3;
	let t7;
	let div4;
	let a4;
	let t9;
	let div5;
	let a5;
	let svg;
	let path;

	const block = {
		c: function create() {
			header = element("header");
			div0 = element("div");
			a0 = element("a");
			a0.textContent = "F1 Analysis";
			t1 = space();
			nav = element("nav");
			div1 = element("div");
			a1 = element("a");
			a1.textContent = "Seasons";
			t3 = space();
			div2 = element("div");
			a2 = element("a");
			a2.textContent = "Circuits";
			t5 = space();
			div3 = element("div");
			a3 = element("a");
			a3.textContent = "Drivers";
			t7 = space();
			div4 = element("div");
			a4 = element("a");
			a4.textContent = "Constructors";
			t9 = space();
			div5 = element("div");
			a5 = element("a");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(a0, "href", "#/");
			attr_dev(a0, "class", "svelte-k1tfat");
			add_location(a0, file, 62, 2, 1595);
			attr_dev(div0, "class", "logo svelte-k1tfat");
			add_location(div0, file, 61, 1, 1573);
			attr_dev(a1, "href", "#/seasons");
			attr_dev(a1, "class", "svelte-k1tfat");
			add_location(a1, file, 65, 32, 1674);
			attr_dev(div1, "class", "svelte-k1tfat");
			toggle_class(div1, "active", /*atSeasons*/ ctx[0]);
			add_location(div1, file, 65, 2, 1644);
			attr_dev(a2, "href", "#/circuits");
			attr_dev(a2, "class", "svelte-k1tfat");
			add_location(a2, file, 66, 33, 1746);
			attr_dev(div2, "class", "svelte-k1tfat");
			toggle_class(div2, "active", /*atCircuits*/ ctx[1]);
			add_location(div2, file, 66, 2, 1715);
			attr_dev(a3, "href", "#/drivers");
			attr_dev(a3, "class", "svelte-k1tfat");
			add_location(a3, file, 67, 32, 1819);
			attr_dev(div3, "class", "svelte-k1tfat");
			toggle_class(div3, "active", /*atDrivers*/ ctx[2]);
			add_location(div3, file, 67, 2, 1789);
			attr_dev(a4, "href", "#/constructors");
			attr_dev(a4, "class", "svelte-k1tfat");
			add_location(a4, file, 68, 37, 1895);
			attr_dev(div4, "class", "svelte-k1tfat");
			toggle_class(div4, "active", /*atConstructors*/ ctx[3]);
			add_location(div4, file, 68, 2, 1860);
			attr_dev(nav, "class", "svelte-k1tfat");
			add_location(nav, file, 64, 1, 1635);
			attr_dev(path, "d", "M3.5 0c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.59 0 1.17-.14 1.66-.41a1 1 0 0 0 .13.13l1 1a1.02 1.02 0 1 0 1.44-1.44l-1-1a1 1 0 0 0-.16-.13c.27-.49.44-1.06.44-1.66 0-1.93-1.57-3.5-3.5-3.5zm0 1c1.39 0 2.5 1.11 2.5 2.5 0 .66-.24 1.27-.66 1.72-.01.01-.02.02-.03.03a1 1 0 0 0-.13.13c-.44.4-1.04.63-1.69.63-1.39 0-2.5-1.11-2.5-2.5s1.11-2.5 2.5-2.5z");
			attr_dev(path, "class", "svelte-k1tfat");
			add_location(path, file, 73, 4, 2087);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "8");
			attr_dev(svg, "height", "8");
			attr_dev(svg, "viewBox", "0 0 8 8");
			attr_dev(svg, "class", "svelte-k1tfat");
			add_location(svg, file, 72, 3, 2002);
			attr_dev(a5, "href", "#/search");
			attr_dev(a5, "class", "svelte-k1tfat");
			add_location(a5, file, 71, 2, 1978);
			attr_dev(div5, "class", "search svelte-k1tfat");
			add_location(div5, file, 70, 1, 1954);
			attr_dev(header, "class", "svelte-k1tfat");
			add_location(header, file, 60, 0, 1562);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, div0);
			append_dev(div0, a0);
			append_dev(header, t1);
			append_dev(header, nav);
			append_dev(nav, div1);
			append_dev(div1, a1);
			append_dev(nav, t3);
			append_dev(nav, div2);
			append_dev(div2, a2);
			append_dev(nav, t5);
			append_dev(nav, div3);
			append_dev(div3, a3);
			append_dev(nav, t7);
			append_dev(nav, div4);
			append_dev(div4, a4);
			append_dev(header, t9);
			append_dev(header, div5);
			append_dev(div5, a5);
			append_dev(a5, svg);
			append_dev(svg, path);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*atSeasons*/ 1) {
				toggle_class(div1, "active", /*atSeasons*/ ctx[0]);
			}

			if (dirty & /*atCircuits*/ 2) {
				toggle_class(div2, "active", /*atCircuits*/ ctx[1]);
			}

			if (dirty & /*atDrivers*/ 4) {
				toggle_class(div3, "active", /*atDrivers*/ ctx[2]);
			}

			if (dirty & /*atConstructors*/ 8) {
				toggle_class(div4, "active", /*atConstructors*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let atSeasons;
	let atCircuits;
	let atDrivers;
	let atConstructors;
	let $location;
	validate_store(location, "location");
	component_subscribe($$self, location, $$value => $$invalidate(4, $location = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Header", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		location,
		atSeasons,
		$location,
		atCircuits,
		atDrivers,
		atConstructors
	});

	$$self.$inject_state = $$props => {
		if ("atSeasons" in $$props) $$invalidate(0, atSeasons = $$props.atSeasons);
		if ("atCircuits" in $$props) $$invalidate(1, atCircuits = $$props.atCircuits);
		if ("atDrivers" in $$props) $$invalidate(2, atDrivers = $$props.atDrivers);
		if ("atConstructors" in $$props) $$invalidate(3, atConstructors = $$props.atConstructors);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$location*/ 16) {
			$$invalidate(0, atSeasons = $location.startsWith("/season"));
		}

		if ($$self.$$.dirty & /*$location*/ 16) {
			$$invalidate(1, atCircuits = $location.search("^/(circuits|race/)") >= 0);
		}

		if ($$self.$$.dirty & /*$location*/ 16) {
			$$invalidate(2, atDrivers = $location.startsWith("/drivers"));
		}

		if ($$self.$$.dirty & /*$location*/ 16) {
			$$invalidate(3, atConstructors = $location.startsWith("/constructors"));
		}
	};

	return [atSeasons, atCircuits, atDrivers, atConstructors, $location];
}

class Header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Header",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src\components\App.svelte generated by Svelte v3.37.0 */

// (19:0) {:else}
function create_else_block(ctx) {
	let header;
	let t;
	let router;
	let current;
	header = new Header({ $$inline: true });
	router = new Router({ props: { routes }, $$inline: true });
	router.$on("conditionsFailed", /*conditionsFailed*/ ctx[1]);

	const block = {
		c: function create() {
			create_component(header.$$.fragment);
			t = space();
			create_component(router.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(header, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(router, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(router.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header.$$.fragment, local);
			transition_out(router.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach_dev(t);
			destroy_component(router, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(19:0) {:else}",
		ctx
	});

	return block;
}

// (17:0) {#if $loadingProgress < 100}
function create_if_block(ctx) {
	let loadingprogress;
	let current;
	loadingprogress = new LoadingProgress({ $$inline: true });

	const block = {
		c: function create() {
			create_component(loadingprogress.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(loadingprogress, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(loadingprogress.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingprogress.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loadingprogress, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(17:0) {#if $loadingProgress < 100}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$loadingProgress*/ ctx[0] < 100) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $loadingProgress;
	validate_store(loadingProgress, "loadingProgress");
	component_subscribe($$self, loadingProgress, $$value => $$invalidate(0, $loadingProgress = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("App", slots, []);
	onMount(init);

	function conditionsFailed() {
		replace("/notfound");
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		onMount,
		Router,
		replace,
		init,
		loadingProgress,
		routes,
		LoadingProgress,
		Header,
		conditionsFailed,
		$loadingProgress
	});

	return [$loadingProgress, conditionsFailed];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

const app = new App({ target: document.body });

export { csvParseRows as A, csvFormat as B, csvFormatBody as C, csvFormatRows as D, csvFormatRow as E, csvFormatValue as F, svg_element as G, toggle_class as H, listen_dev as I, action_destroyer as J, is_function as K, run_all as L, bubble as M, binding_callbacks as N, formatDate$1 as O, months as P, set_data_dev as Q, validate_store as R, SvelteComponentDev as S, component_subscribe as T, storedDb as U, bind as V, add_flush_callback as W, app as X, transition_out as a, destroy_component as b, create_component as c, dispatch_dev as d, text as e, insert_dev as f, detach_dev as g, create_slot as h, init$1 as i, element as j, space as k, attr_dev as l, mount_component as m, add_location as n, append_dev as o, getDecades as p, validate_each_argument as q, destroy_each as r, safe_not_equal as s, transition_in as t, update_slot as u, validate_slots as v, empty as w, noop as x, dsvFormat as y, csvParse as z };
//# sourceMappingURL=main2.js.map
