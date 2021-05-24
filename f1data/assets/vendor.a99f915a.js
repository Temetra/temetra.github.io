var t=Object.defineProperty,n=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(n,e,o)=>e in n?t(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o;function s(){}function i(t,n){for(const e in n)t[e]=n[e];return t}function c(t){return t()}function a(){return Object.create(null)}function u(t){t.forEach(c)}function l(t){return"function"==typeof t}function f(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function p(t,n){return t!=t?n==n:t!==n}function d(t,...n){if(null==t)return s;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function h(t,n,e){t.$$.on_destroy.push(d(n,e))}function m(t,n,e,o){if(t){const r=g(t,n,e,o);return t[0](r)}}function g(t,n,e,o){return t[1]&&o?i(e.ctx.slice(),t[1](o(n))):e.ctx}function $(t,n,e,o,r,s,i){const c=function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(n,o,r,s);if(c){const r=g(n,e,o,i);t.p(r,c)}}function y(t,n){t.appendChild(n)}function b(t,n,e){t.insertBefore(n,e||null)}function w(t){t.parentNode.removeChild(t)}function v(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function _(t){return document.createElement(t)}function E(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function x(t){return document.createTextNode(t)}function k(){return x(" ")}function O(){return x("")}function j(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function C(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function S(t){return Array.from(t.childNodes)}function A(t,n,e,o){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===n){let n=0;const s=[];for(;n<o.attributes.length;){const t=o.attributes[n++];e[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return o?E(n):_(n)}function P(t,n){for(let e=0;e<t.length;e+=1){const o=t[e];if(3===o.nodeType)return o.data=""+n,t.splice(e,1)[0]}return x(n)}function L(t){return P(t," ")}function N(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function q(t,n,e,o){t.style.setProperty(n,e,o?"important":"")}function I(t,n,e){t.classList[e?"add":"remove"](n)}let R;function D(t){R=t}function T(){if(!R)throw new Error("Function called outside component initialization");return R}function M(t){T().$$.on_mount.push(t)}function F(){const t=T();return(n,e)=>{const o=t.$$.callbacks[n];if(o){const r=function(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}(n,e);o.slice().forEach((n=>{n.call(t,r)}))}}}function Y(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach((t=>t(n)))}const z=[],B=[],X=[],G=[],H=Promise.resolve();let J=!1;function K(){J||(J=!0,H.then(tt))}function U(){return K(),H}function W(t){X.push(t)}function Q(t){G.push(t)}let V=!1;const Z=new Set;function tt(){if(!V){V=!0;do{for(let t=0;t<z.length;t+=1){const n=z[t];D(n),nt(n.$$)}for(D(null),z.length=0;B.length;)B.pop()();for(let t=0;t<X.length;t+=1){const n=X[t];Z.has(n)||(Z.add(n),n())}X.length=0}while(z.length);for(;G.length;)G.pop()();J=!1,V=!1,Z.clear()}}function nt(t){if(null!==t.fragment){t.update(),u(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(W)}}const et=new Set;let ot;function rt(){ot={r:0,c:[],p:ot}}function st(){ot.r||u(ot.c),ot=ot.p}function it(t,n){t&&t.i&&(et.delete(t),t.i(n))}function ct(t,n,e,o){if(t&&t.o){if(et.has(t))return;et.add(t),ot.c.push((()=>{et.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function at(t,n){const e={},o={},r={$$scope:1};let s=t.length;for(;s--;){const i=t[s],c=n[s];if(c){for(const t in i)t in c||(o[t]=1);for(const t in c)r[t]||(e[t]=c[t],r[t]=1);t[s]=c}else for(const t in i)r[t]=1}for(const i in o)i in e||(e[i]=void 0);return e}function ut(t){return"object"==typeof t&&null!==t?t:{}}function lt(t,n,e){const o=t.$$.props[n];void 0!==o&&(t.$$.bound[o]=e,e(t.$$.ctx[o]))}function ft(t){t&&t.c()}function pt(t,n){t&&t.l(n)}function dt(t,n,e,o){const{fragment:r,on_mount:s,on_destroy:i,after_update:a}=t.$$;r&&r.m(n,e),o||W((()=>{const n=s.map(c).filter(l);i?i.push(...n):u(n),t.$$.on_mount=[]})),a.forEach(W)}function ht(t,n){const e=t.$$;null!==e.fragment&&(u(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function mt(t,n,e,o,r,i,c=[-1]){const l=R;D(t);const f=t.$$={fragment:null,ctx:null,props:i,update:s,not_equal:r,bound:a(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:n.context||[]),callbacks:a(),dirty:c,skip_bound:!1};let p=!1;if(f.ctx=e?e(t,n.props||{},((n,e,...o)=>{const s=o.length?o[0]:e;return f.ctx&&r(f.ctx[n],f.ctx[n]=s)&&(!f.skip_bound&&f.bound[n]&&f.bound[n](s),p&&function(t,n){-1===t.$$.dirty[0]&&(z.push(t),K(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}(t,n)),e})):[],f.update(),p=!0,u(f.before_update),f.fragment=!!o&&o(f.ctx),n.target){if(n.hydrate){const t=S(n.target);f.fragment&&f.fragment.l(t),t.forEach(w)}else f.fragment&&f.fragment.c();n.intro&&it(t.$$.fragment),dt(t,n.target,n.anchor,n.customElement),tt()}D(l)}class gt{$destroy(){ht(this,1),this.$destroy=s}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const $t=[];function yt(t,n){return{subscribe:bt(t,n).subscribe}}function bt(t,n=s){let e;const o=[];function r(n){if(f(t,n)&&(t=n,e)){const n=!$t.length;for(let e=0;e<o.length;e+=1){const n=o[e];n[1](),$t.push(n,t)}if(n){for(let t=0;t<$t.length;t+=2)$t[t][0]($t[t+1]);$t.length=0}}}return{set:r,update:function(n){r(n(t))},subscribe:function(i,c=s){const a=[i,c];return o.push(a),1===o.length&&(e=n(r)||s),i(t),()=>{const t=o.indexOf(a);-1!==t&&o.splice(t,1),0===o.length&&(e(),e=null)}}}}function wt(t,n,e){const o=!Array.isArray(t),r=o?[t]:t,i=n.length<2;return yt(e,(t=>{let e=!1;const c=[];let a=0,f=s;const p=()=>{if(a)return;f();const e=n(o?c[0]:c,t);i?t(e):f=l(e)?e:s},h=r.map(((t,n)=>d(t,(t=>{c[n]=t,a&=~(1<<n),e&&p()}),(()=>{a|=1<<n}))));return e=!0,p(),function(){u(h),f()}}))}function vt(t){if(!t)throw Error("Parameter args is required");if(!t.component==!t.asyncComponent)throw Error("One and only one of component and asyncComponent is required");if(t.component&&(t.asyncComponent=()=>Promise.resolve(t.component)),"function"!=typeof t.asyncComponent)throw Error("Parameter asyncComponent must be a function");if(t.conditions){Array.isArray(t.conditions)||(t.conditions=[t.conditions]);for(let n=0;n<t.conditions.length;n++)if(!t.conditions[n]||"function"!=typeof t.conditions[n])throw Error("Invalid parameter conditions["+n+"]")}t.loadingComponent&&(t.asyncComponent.loading=t.loadingComponent,t.asyncComponent.loadingParams=t.loadingParams||void 0);return{component:t.asyncComponent,userData:t.userData,conditions:t.conditions&&t.conditions.length?t.conditions:void 0,props:t.props&&Object.keys(t.props).length?t.props:{},_sveltesparouter:!0}}function _t(t){let n,e,o;const r=[t[2]];var s=t[0];function c(t){let n={};for(let e=0;e<r.length;e+=1)n=i(n,r[e]);return{props:n}}return s&&(n=new s(c()),n.$on("routeEvent",t[7])),{c(){n&&ft(n.$$.fragment),e=O()},l(t){n&&pt(n.$$.fragment,t),e=O()},m(t,r){n&&dt(n,t,r),b(t,e,r),o=!0},p(t,o){const i=4&o?at(r,[ut(t[2])]):{};if(s!==(s=t[0])){if(n){rt();const t=n;ct(t.$$.fragment,1,0,(()=>{ht(t,1)})),st()}s?(n=new s(c()),n.$on("routeEvent",t[7]),ft(n.$$.fragment),it(n.$$.fragment,1),dt(n,e.parentNode,e)):n=null}else s&&n.$set(i)},i(t){o||(n&&it(n.$$.fragment,t),o=!0)},o(t){n&&ct(n.$$.fragment,t),o=!1},d(t){t&&w(e),n&&ht(n,t)}}}function Et(t){let n,e,o;const r=[{params:t[1]},t[2]];var s=t[0];function c(t){let n={};for(let e=0;e<r.length;e+=1)n=i(n,r[e]);return{props:n}}return s&&(n=new s(c()),n.$on("routeEvent",t[6])),{c(){n&&ft(n.$$.fragment),e=O()},l(t){n&&pt(n.$$.fragment,t),e=O()},m(t,r){n&&dt(n,t,r),b(t,e,r),o=!0},p(t,o){const i=6&o?at(r,[2&o&&{params:t[1]},4&o&&ut(t[2])]):{};if(s!==(s=t[0])){if(n){rt();const t=n;ct(t.$$.fragment,1,0,(()=>{ht(t,1)})),st()}s?(n=new s(c()),n.$on("routeEvent",t[6]),ft(n.$$.fragment),it(n.$$.fragment,1),dt(n,e.parentNode,e)):n=null}else s&&n.$set(i)},i(t){o||(n&&it(n.$$.fragment,t),o=!0)},o(t){n&&ct(n.$$.fragment,t),o=!1},d(t){t&&w(e),n&&ht(n,t)}}}function xt(t){let n,e,o,r;const s=[Et,_t],i=[];function c(t,n){return t[1]?0:1}return n=c(t),e=i[n]=s[n](t),{c(){e.c(),o=O()},l(t){e.l(t),o=O()},m(t,e){i[n].m(t,e),b(t,o,e),r=!0},p(t,[r]){let a=n;n=c(t),n===a?i[n].p(t,r):(rt(),ct(i[a],1,1,(()=>{i[a]=null})),st(),e=i[n],e?e.p(t,r):(e=i[n]=s[n](t),e.c()),it(e,1),e.m(o.parentNode,o))},i(t){r||(it(e),r=!0)},o(t){ct(e),r=!1},d(t){i[n].d(t),t&&w(o)}}}function kt(){const t=window.location.href.indexOf("#/");let n=t>-1?window.location.href.substr(t+1):"/";const e=n.indexOf("?");let o="";return e>-1&&(o=n.substr(e+1),n=n.substr(0,e)),{location:n,querystring:o}}const Ot=yt(null,(function(t){t(kt());const n=()=>{t(kt())};return window.addEventListener("hashchange",n,!1),function(){window.removeEventListener("hashchange",n,!1)}})),jt=wt(Ot,(t=>t.location));async function Ct(t){if(!t||t.length<1||"/"!=t.charAt(0)&&0!==t.indexOf("#/"))throw Error("Invalid parameter location");await U();const s=("#"==t.charAt(0)?"":"#")+t;try{const t=((t,s)=>{for(var i in s||(s={}))e.call(s,i)&&r(t,i,s[i]);if(n)for(var i of n(s))o.call(s,i)&&r(t,i,s[i]);return t})({},history.state);delete t.__svelte_spa_router_scrollX,delete t.__svelte_spa_router_scrollY,window.history.replaceState(t,void 0,s)}catch(i){console.warn("Caught exception while replacing the current page. If you're running this in the Svelte REPL, please note that the `replace` method might not work in this environment.")}window.dispatchEvent(new Event("hashchange"))}function St(t,n,e){let{routes:o={}}=n,{prefix:r=""}=n,{restoreScrollState:s=!1}=n;class i{constructor(t,n){if(!n||"function"!=typeof n&&("object"!=typeof n||!0!==n._sveltesparouter))throw Error("Invalid component object");if(!t||"string"==typeof t&&(t.length<1||"/"!=t.charAt(0)&&"*"!=t.charAt(0))||"object"==typeof t&&!(t instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:e,keys:o}=function(t,n){if(t instanceof RegExp)return{keys:!1,pattern:t};var e,o,r,s,i=[],c="",a=t.split("/");for(a[0]||a.shift();r=a.shift();)"*"===(e=r[0])?(i.push("wild"),c+="/(.*)"):":"===e?(o=r.indexOf("?",1),s=r.indexOf(".",1),i.push(r.substring(1,~o?o:~s?s:r.length)),c+=~o&&!~s?"(?:/([^/]+?))?":"/([^/]+?)",~s&&(c+=(~o?"?":"")+"\\"+r.substring(s))):c+="/"+r;return{keys:i,pattern:new RegExp("^"+c+(n?"(?=$|/)":"/?$"),"i")}}(t);this.path=t,"object"==typeof n&&!0===n._sveltesparouter?(this.component=n.component,this.conditions=n.conditions||[],this.userData=n.userData,this.props=n.props||{}):(this.component=()=>Promise.resolve(n),this.conditions=[],this.props={}),this._pattern=e,this._keys=o}match(t){if(r)if("string"==typeof r){if(!t.startsWith(r))return null;t=t.substr(r.length)||"/"}else if(r instanceof RegExp){const n=t.match(r);if(!n||!n[0])return null;t=t.substr(n[0].length)||"/"}const n=this._pattern.exec(t);if(null===n)return null;if(!1===this._keys)return n;const e={};let o=0;for(;o<this._keys.length;){try{e[this._keys[o]]=decodeURIComponent(n[o+1]||"")||null}catch(s){e[this._keys[o]]=null}o++}return e}async checkConditions(t){for(let n=0;n<this.conditions.length;n++)if(!(await this.conditions[n](t)))return!1;return!0}}const c=[];o instanceof Map?o.forEach(((t,n)=>{c.push(new i(n,t))})):Object.keys(o).forEach((t=>{c.push(new i(t,o[t]))}));let a=null,u=null,l={};const f=F();async function p(t,n){await U(),f(t,n)}let d=null;var h;s&&(window.addEventListener("popstate",(t=>{d=t.state&&t.state.__svelte_spa_router_scrollY?t.state:null})),h=()=>{d?window.scrollTo(d.__svelte_spa_router_scrollX,d.__svelte_spa_router_scrollY):window.scrollTo(0,0)},T().$$.after_update.push(h));let m=null,g=null;return Ot.subscribe((async t=>{m=t;let n=0;for(;n<c.length;){const o=c[n].match(t.location);if(!o){n++;continue}const r={route:c[n].path,location:t.location,querystring:t.querystring,userData:c[n].userData,params:o};if(!(await c[n].checkConditions(r)))return e(0,a=null),g=null,void p("conditionsFailed",r);p("routeLoading",Object.assign({},r));const s=c[n].component;if(g!=s){s.loading?(e(0,a=s.loading),g=s,e(1,u=s.loadingParams),e(2,l={}),p("routeLoaded",Object.assign({},r,{component:a,name:a.name}))):(e(0,a=null),g=null);const n=await s();if(t!=m)return;e(0,a=n&&n.default||n),g=s}return o&&"object"==typeof o&&Object.keys(o).length?e(1,u=o):e(1,u=null),e(2,l=c[n].props),void p("routeLoaded",Object.assign({},r,{component:a,name:a.name}))}e(0,a=null),g=null})),t.$$set=t=>{"routes"in t&&e(3,o=t.routes),"prefix"in t&&e(4,r=t.prefix),"restoreScrollState"in t&&e(5,s=t.restoreScrollState)},t.$$.update=()=>{32&t.$$.dirty&&(history.scrollRestoration=s?"manual":"auto")},[a,u,l,o,r,s,function(n){Y(t,n)},function(n){Y(t,n)}]}wt(Ot,(t=>t.querystring));class At extends gt{constructor(t){super(),mt(this,t,St,xt,f,{routes:3,prefix:4,restoreScrollState:5})}}export{Ct as A,O as B,rt as C,st as D,m as E,$ as F,q as G,M as H,v as I,j as J,Y as K,B as L,N as M,p as N,lt as O,Q as P,At as R,gt as S,k as a,E as b,A as c,S as d,_ as e,P as f,w as g,L as h,mt as i,C as j,I as k,b as l,y as m,s as n,h as o,jt as p,ft as q,pt as r,f as s,x as t,dt as u,it as v,bt as w,ct as x,ht as y,vt as z};
