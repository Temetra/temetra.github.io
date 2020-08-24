var app=function(){"use strict";var t=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")};var n=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};function r(t,n,r){return t(r={path:n,exports:{},require:function(t,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&r.path)}},r.exports),r.exports}var e=r((function(t){function n(r,e){return t.exports=n=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},n(r,e)}t.exports=n}));var o=function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&e(t,n)},i=r((function(t){function n(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(r)}t.exports=n}));var u=function(t,r){return!r||"object"!==i(r)&&"function"!=typeof r?n(t):r},c=r((function(t){function n(r){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(r)}t.exports=n})),a=r((function(t){var n=function(t){var n=Object.prototype,r=n.hasOwnProperty,e="function"==typeof Symbol?Symbol:{},o=e.iterator||"@@iterator",u=e.asyncIterator||"@@asyncIterator",c=e.toStringTag||"@@toStringTag";function a(t,n,r){return Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{a({},"")}catch(t){a=function(t,n,r){return t[n]=r}}function f(t,n,r,e){var o=n&&n.prototype instanceof p?n:p,i=Object.create(o.prototype),u=new _(e||[]);return i._invoke=function(t,n,r){var e="suspendedStart";return function(o,i){if("executing"===e)throw new Error("Generator is already running");if("completed"===e){if("throw"===o)throw i;return O()}for(r.method=o,r.arg=i;;){var u=r.delegate;if(u){var c=$(u,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===e)throw e="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);e="executing";var a=s(t,n,r);if("normal"===a.type){if(e=r.done?"completed":"suspendedYield",a.arg===l)continue;return{value:a.arg,done:r.done}}"throw"===a.type&&(e="completed",r.method="throw",r.arg=a.arg)}}}(t,r,u),i}function s(t,n,r){try{return{type:"normal",arg:t.call(n,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var l={};function p(){}function h(){}function d(){}var v={};v[o]=function(){return this};var y=Object.getPrototypeOf,m=y&&y(y(E([])));m&&m!==n&&r.call(m,o)&&(v=m);var g=d.prototype=p.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(n){a(t,n,(function(t){return this._invoke(n,t)}))}))}function w(t,n){var e;this._invoke=function(o,u){function c(){return new n((function(e,c){!function e(o,u,c,a){var f=s(t[o],t,u);if("throw"!==f.type){var l=f.arg,p=l.value;return p&&"object"===i(p)&&r.call(p,"__await")?n.resolve(p.__await).then((function(t){e("next",t,c,a)}),(function(t){e("throw",t,c,a)})):n.resolve(p).then((function(t){l.value=t,c(l)}),(function(t){return e("throw",t,c,a)}))}a(f.arg)}(o,u,e,c)}))}return e=e?e.then(c,c):c()}}function $(t,n){var r=t.iterator[n.method];if(void 0===r){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=void 0,$(t,n),"throw"===n.method))return l;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var e=s(r,t.iterator,n.arg);if("throw"===e.type)return n.method="throw",n.arg=e.arg,n.delegate=null,l;var o=e.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,l):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,l)}function x(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function k(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,i=function n(){for(;++e<t.length;)if(r.call(t,e))return n.value=t[e],n.done=!1,n;return n.value=void 0,n.done=!0,n};return i.next=i}}return{next:O}}function O(){return{value:void 0,done:!0}}return h.prototype=g.constructor=d,d.constructor=h,h.displayName=a(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===h||"GeneratorFunction"===(n.displayName||n.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,a(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(w.prototype),w.prototype[u]=function(){return this},t.AsyncIterator=w,t.async=function(n,r,e,o,i){void 0===i&&(i=Promise);var u=new w(f(n,r,e,o),i);return t.isGeneratorFunction(r)?u:u.next().then((function(t){return t.done?t.value:u.next()}))},b(g),a(g,c,"Generator"),g[o]=function(){return this},g.toString=function(){return"[object Generator]"},t.keys=function(t){var n=[];for(var r in t)n.push(r);return n.reverse(),function r(){for(;n.length;){var e=n.pop();if(e in t)return r.value=e,r.done=!1,r}return r.done=!0,r}},t.values=E,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function e(r,e){return u.type="throw",u.arg=t,n.next=r,e&&(n.method="next",n.arg=void 0),!!e}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion;if("root"===i.tryLoc)return e("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),a=r.call(i,"finallyLoc");if(c&&a){if(this.prev<i.catchLoc)return e(i.catchLoc,!0);if(this.prev<i.finallyLoc)return e(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return e(i.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return e(i.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=n,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(u)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),l},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),l}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc===t){var e=r.completion;if("throw"===e.type){var o=e.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:E(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}}));var f=function(t){if(Array.isArray(t))return t};var s=function(t,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],e=!0,o=!1,i=void 0;try{for(var u,c=t[Symbol.iterator]();!(e=(u=c.next()).done)&&(r.push(u.value),!n||r.length!==n);e=!0);}catch(t){o=!0,i=t}finally{try{e||null==c.return||c.return()}finally{if(o)throw i}}return r}};var l=function(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e};var p=function(t,n){if(t){if("string"==typeof t)return l(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(t,n):void 0}};var h=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")};var d=function(t,n){return f(t)||s(t,n)||p(t,n)||h()};var v=function(t,n){for(;!Object.prototype.hasOwnProperty.call(t,n)&&null!==(t=c(t)););return t};r((function(t){function n(r,e,o){return"undefined"!=typeof Reflect&&Reflect.get?t.exports=n=Reflect.get:t.exports=n=function(t,n,r){var e=v(t,n);if(e){var o=Object.getOwnPropertyDescriptor(e,n);return o.get?o.get.call(r):o.value}},n(r,e,o||r)}t.exports=n}));var y=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")};var m=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}},g=r((function(t){function n(r,o,i){return m()?t.exports=n=Reflect.construct:t.exports=n=function(t,n,r){var o=[null];o.push.apply(o,n);var i=new(Function.bind.apply(t,o));return r&&e(i,r.prototype),i},n.apply(null,arguments)}t.exports=n}));r((function(t){function n(r){var o="function"==typeof Map?new Map:void 0;return t.exports=n=function(t){if(null===t||!y(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==o){if(o.has(t))return o.get(t);o.set(t,n)}function n(){return g(t,arguments,c(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e(n,t)},n(r)}t.exports=n}));var b=function(t){if(Array.isArray(t))return l(t)};var w=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)};var $=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")};var x=function(t){return b(t)||w(t)||p(t)||$()};function k(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var _,E=function(t,n,r){return n&&k(t.prototype,n),r&&k(t,r),t};function O(){}function S(t){return t()}function R(){return Object.create(null)}function L(t){t.forEach(S)}function j(t){return"function"==typeof t}function P(t,n){return t!=t?n==n:t!==n||t&&"object"===i(t)||"function"==typeof t}function A(t,n,r){t.$$.on_destroy.push(function(t){if(null==t)return O;for(var n=arguments.length,r=new Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];var o=t.subscribe.apply(t,r);return o.unsubscribe?function(){return o.unsubscribe()}:o}(n,r))}function T(t,n){t.appendChild(n)}function D(t,n,r){t.insertBefore(n,r||null)}function N(t){t.parentNode.removeChild(t)}function F(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function J(){return C(" ")}function G(t,n,r){null==r?t.removeAttribute(n):t.getAttribute(n)!==r&&t.setAttribute(n,r)}function I(t){return Array.from(t.childNodes)}function B(t,n,r){t.classList[r?"add":"remove"](n)}function M(t){_=t}function q(t){(function(){if(!_)throw new Error("Function called outside component initialization");return _})().$$.on_mount.push(t)}var H=[],K=[],Q=[],U=[],Y=Promise.resolve(),z=!1;function V(t){Q.push(t)}var W=!1,X=new Set;function Z(){if(!W){W=!0;do{for(var t=0;t<H.length;t+=1){var n=H[t];M(n),tt(n.$$)}for(H.length=0;K.length;)K.pop()();for(var r=0;r<Q.length;r+=1){var e=Q[r];X.has(e)||(X.add(e),e())}Q.length=0}while(H.length);for(;U.length;)U.pop()();z=!1,W=!1,X.clear()}}function tt(t){if(null!==t.fragment){t.update(),L(t.before_update);var n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(V)}}var nt,rt=new Set;function et(){nt={r:0,c:[],p:nt}}function ot(){nt.r||L(nt.c),nt=nt.p}function it(t,n){t&&t.i&&(rt.delete(t),t.i(n))}function ut(t,n,r,e){if(t&&t.o){if(rt.has(t))return;rt.add(t),nt.c.push((function(){rt.delete(t),e&&(r&&t.d(1),e())})),t.o(n)}}function ct(t){t&&t.c()}function at(t,n,r){var e=t.$$,o=e.fragment,i=e.on_mount,u=e.on_destroy,c=e.after_update;o&&o.m(n,r),V((function(){var n=i.map(S).filter(j);u?u.push.apply(u,x(n)):L(n),t.$$.on_mount=[]})),c.forEach(V)}function ft(t,n){var r=t.$$;null!==r.fragment&&(L(r.on_destroy),r.fragment&&r.fragment.d(n),r.on_destroy=r.fragment=null,r.ctx=[])}function st(t,n){-1===t.$$.dirty[0]&&(H.push(t),z||(z=!0,Y.then(Z)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function lt(t,n,r,e,o,i){var u=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[-1],c=_;M(t);var a=n.props||{},f=t.$$={fragment:null,ctx:null,props:i,update:O,not_equal:o,bound:R(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:R(),dirty:u,skip_bound:!1},s=!1;if(f.ctx=r?r(t,a,(function(n,r){var e=!(arguments.length<=2)&&arguments.length-2?arguments.length<=2?void 0:arguments[2]:r;return f.ctx&&o(f.ctx[n],f.ctx[n]=e)&&(!f.skip_bound&&f.bound[n]&&f.bound[n](e),s&&st(t,n)),r})):[],f.update(),s=!0,L(f.before_update),f.fragment=!!e&&e(f.ctx),n.target){if(n.hydrate){var l=I(n.target);f.fragment&&f.fragment.l(l),l.forEach(N)}else f.fragment&&f.fragment.c();n.intro&&it(t.$$.fragment),at(t,n.target,n.anchor),Z()}M(c)}var pt=function(){function n(){t(this,n)}return E(n,[{key:"$destroy",value:function(){ft(this,1),this.$destroy=O}},{key:"$on",value:function(t,n){var r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),function(){var t=r.indexOf(n);-1!==t&&r.splice(t,1)}}},{key:"$set",value:function(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}]),n}();function ht(t,n){return new Promise(r=>setTimeout(()=>r(n),t))}function dt(t){if(t.ok)return t;throw{message:t.statusText,status:t.status}}function vt(t,n,r=(()=>{})){let e=Object.entries(t);r(0,e.length);let o=0,i={};const u=[];for(let[t,c]of e){let a=fetch(c).then(dt).then(n).then(n=>i[t]=n).then(()=>r(++o,e.length));u.push(a)}return Promise.all(u).then(()=>i)}var yt=[];function mt(t){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,e=[];function o(r){if(P(t,r)&&(t=r,n)){for(var o=!yt.length,i=0;i<e.length;i+=1){var u=e[i];u[1](),yt.push(u,t)}if(o){for(var c=0;c<yt.length;c+=2)yt[c][0](yt[c+1]);yt.length=0}}}function i(n){o(n(t))}function u(i){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,c=[i,u];return e.push(c),1===e.length&&(n=r(o)||O),i(t),function(){var t=e.indexOf(c);-1!==t&&e.splice(t,1),0===e.length&&(n(),n=null)}}return{set:o,update:i,subscribe:u}}const gt=mt(!1),bt=mt([]),wt=mt([]),$t=mt(null),xt=new(window.AudioContext||window.webkitAudioContext);let kt;async function _t(t){return await t.arrayBuffer().then(t=>xt.decodeAudioData(t))}function Et(t,n){$t.set({name:"sounds",progress:t,total:n})}function Ot(t){let n=kt[t];if(n){const t=xt.createBufferSource();t.buffer=n,t.connect(xt.destination),t.start()}}var St,Rt;!function(t){t[t.Ace=1]="Ace",t[t.Two=2]="Two",t[t.Three=3]="Three",t[t.Four=4]="Four",t[t.Five=5]="Five",t[t.Six=6]="Six",t[t.Seven=7]="Seven",t[t.Eight=8]="Eight",t[t.Nine=9]="Nine",t[t.Ten=10]="Ten",t[t.Jack=11]="Jack",t[t.Queen=12]="Queen",t[t.King=13]="King"}(St||(St={})),function(t){t[t.Clubs=1]="Clubs",t[t.Diamonds=2]="Diamonds",t[t.Hearts=3]="Hearts",t[t.Spades=4]="Spades",t[t.Joker=5]="Joker"}(Rt||(Rt={}));const Lt=Object.keys(St).filter(t=>!Number(t)).map(t=>St[t]),jt=Object.keys(Rt).filter(t=>!Number(t)).map(t=>Rt[t]).filter(t=>t!=Rt.Joker);function Pt(t,n){return t==Rt.Joker?Rt[t]:`${St[n]} of ${Rt[t]}`}async function At(){gt.set(!0)}function Tt(){return async function(){gt.set(!1),Ot("blip"),wt.set([]),await ht(500),function(){const t=[];for(const n of jt)for(const r of Lt)t.push({suit:n,rank:r});bt.set(t)}(),bt.update(t=>{let n,r,e=t.length;for(;0!=e;)r=Math.floor(Math.random()*e),e-=1,n=t[e],t[e]=t[r],t[r]=n;return t})}().then(Dt).then(Dt).then(Dt).then(Dt).then(Dt).then(Nt)}async function Dt(){var t,n;let r;await ht((t=375,n=425,Math.random()*(n-t)+t)),bt.update(t=>(r=t.shift(),t)),wt.update(t=>(t.push(r),t)),await ht(0),Ot("card")}async function Nt(){await ht(500),gt.set(!0)}let Ft;function Ct(){const t={CardBackground:"images/cards/CardBackground.svg",Joker:"images/cards/Joker.svg"};for(const n of jt)for(const r of Lt){let e=`${Rt[n]}${St[r]}`;t[e]=`images/cards/${e}.svg`}return vt(t,Jt,Gt).then(t=>Ft=t)}async function Jt(t){return await t.blob().then(t=>new Promise(n=>{const r=new FileReader;r.addEventListener("error",()=>n(null)),r.addEventListener("load",t=>n(t.target.result)),r.readAsDataURL(t)}))}function Gt(t,n){$t.set({name:"images",progress:t,total:n})}function It(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=c(t);if(n){var o=c(this).constructor;r=Reflect.construct(e,arguments,o)}else r=e.apply(this,arguments);return u(this,r)}}function Bt(t){var n,r,e,o,i;return{c:function(){n=F("section"),r=F("img"),e=J(),o=F("img"),G(r,"alt",""),G(r,"class","svelte-1827fna"),G(o,"alt",i=Pt(t[0],t[1])),G(o,"class","svelte-1827fna"),G(n,"class","svelte-1827fna"),B(n,"deal",t[4]),B(n,"spin",t[5])},m:function(i,u){D(i,n,u),T(n,r),t[7](r),T(n,e),T(n,o),t[8](o)},p:function(t,r){var e=d(r,1)[0];3&e&&i!==(i=Pt(t[0],t[1]))&&G(o,"alt",i),16&e&&B(n,"deal",t[4]),32&e&&B(n,"spin",t[5])},i:O,o:O,d:function(r){r&&N(n),t[7](null),t[8](null)}}}function Mt(t,n,r){var e,o,i,u,c=n.suit,a=void 0===c?Rt.Joker:c,f=n.rank,s=void 0===f?St.Ace:f,l=n.mode,p=void 0===l?"":l;return q((function(){r(2,e.src=Ft.CardBackground,e),r(3,o.src=function(t,n){switch(t){case Rt.Joker:return Ft.Joker;default:return Ft[`${Rt[t]}${St[n]}`]}}(a,s),o)})),t.$$set=function(t){"suit"in t&&r(0,a=t.suit),"rank"in t&&r(1,s=t.rank),"mode"in t&&r(6,p=t.mode)},t.$$.update=function(){64&t.$$.dirty&&r(4,i="deal"===p),64&t.$$.dirty&&r(5,u="spin"===p)},[a,s,e,o,i,u,p,function(t){K[t?"unshift":"push"]((function(){r(2,e=t)}))},function(t){K[t?"unshift":"push"]((function(){r(3,o=t)}))}]}var qt=function(r){o(i,r);var e=It(i);function i(r){var o;return t(this,i),o=e.call(this),lt(n(o),r,Mt,Bt,P,{suit:0,rank:1,mode:6}),o}return i}(pt);function Ht(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=c(t);if(n){var o=c(this).constructor;r=Reflect.construct(e,arguments,o)}else r=e.apply(this,arguments);return u(this,r)}}function Kt(t){var n,r,e,o,i,u,c,a,f,s;return o=new qt({props:{suit:1,rank:1,mode:t[0]}}),{c:function(){n=F("section"),r=F("button"),e=F("span"),ct(o.$$.fragment),i=J(),(u=F("span")).textContent="Deal cards",G(e,"class","icon"),G(u,"class","text svelte-1b2m7i"),G(r,"type","button"),G(r,"class","cyan"),r.disabled=c=!t[1],G(n,"class","svelte-1b2m7i")},m:function(t,c){var l,p,h,d;D(t,n,c),T(n,r),T(r,e),at(o,e,null),T(r,i),T(r,u),a=!0,f||(p="click",h=Tt,(l=r).addEventListener(p,h,d),s=function(){return l.removeEventListener(p,h,d)},f=!0)},p:function(t,n){var e=d(n,1)[0],i={};1&e&&(i.mode=t[0]),o.$set(i),(!a||2&e&&c!==(c=!t[1]))&&(r.disabled=c)},i:function(t){a||(it(o.$$.fragment,t),a=!0)},o:function(t){ut(o.$$.fragment,t),a=!1},d:function(t){t&&N(n),ft(o),f=!1,s()}}}function Qt(t,n,r){var e,o;return A(t,gt,(function(t){return r(1,e=t)})),t.$$.update=function(){2&t.$$.dirty&&r(0,o=e?"spin":"")},[o,e]}var Ut=function(r){o(i,r);var e=Ht(i);function i(r){var o;return t(this,i),o=e.call(this),lt(n(o),r,Qt,Kt,P,{}),o}return i}(pt);function Yt(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=c(t);if(n){var o=c(this).constructor;r=Reflect.construct(e,arguments,o)}else r=e.apply(this,arguments);return u(this,r)}}function zt(t,n,r){var e=t.slice();return e[1]=n[r],e}function Vt(t){var n,r;return n=new qt({props:{suit:t[1].suit,rank:t[1].rank,mode:"deal"}}),{c:function(){ct(n.$$.fragment)},m:function(t,e){at(n,t,e),r=!0},p:function(t,r){var e={};1&r&&(e.suit=t[1].suit),1&r&&(e.rank=t[1].rank),n.$set(e)},i:function(t){r||(it(n.$$.fragment,t),r=!0)},o:function(t){ut(n.$$.fragment,t),r=!1},d:function(t){ft(n,t)}}}function Wt(t){for(var n,r,e,o,i,u=t[0],c=[],a=0;a<u.length;a+=1)c[a]=Vt(zt(t,u,a));var f=function(t){return ut(c[t],1,1,(function(){c[t]=null}))};return{c:function(){n=F("section"),r=F("div"),e=F("div"),o=F("div");for(var t=0;t<c.length;t+=1)c[t].c();G(o,"class","cards svelte-y451lc"),G(e,"class","table felt svelte-y451lc"),G(r,"class","container svelte-y451lc"),G(n,"class","svelte-y451lc")},m:function(t,u){D(t,n,u),T(n,r),T(r,e),T(e,o);for(var a=0;a<c.length;a+=1)c[a].m(o,null);i=!0},p:function(t,n){var r=d(n,1)[0];if(1&r){var e;for(u=t[0],e=0;e<u.length;e+=1){var i=zt(t,u,e);c[e]?(c[e].p(i,r),it(c[e],1)):(c[e]=Vt(i),c[e].c(),it(c[e],1),c[e].m(o,null))}for(et(),e=u.length;e<c.length;e+=1)f(e);ot()}},i:function(t){if(!i){for(var n=0;n<u.length;n+=1)it(c[n]);i=!0}},o:function(t){c=c.filter(Boolean);for(var n=0;n<c.length;n+=1)ut(c[n]);i=!1},d:function(t){t&&N(n),function(t,n){for(var r=0;r<t.length;r+=1)t[r]&&t[r].d(n)}(c,t)}}}function Xt(t,n,r){var e;return A(t,wt,(function(t){return r(0,e=t)})),[e]}var Zt=function(r){o(i,r);var e=Yt(i);function i(r){var o;return t(this,i),o=e.call(this),lt(n(o),r,Xt,Wt,P,{}),o}return i}(pt);function tn(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=c(t);if(n){var o=c(this).constructor;r=Reflect.construct(e,arguments,o)}else r=e.apply(this,arguments);return u(this,r)}}function nn(t){var n,r,e,o,i,u,c;return{c:function(){n=F("section"),r=F("div"),e=C("Loading "),o=C(t[0]),i=J(),u=F("div"),(c=F("progress")).value=t[1],G(n,"class","svelte-1ks6api")},m:function(t,a){D(t,n,a),T(n,r),T(r,e),T(r,o),T(n,i),T(n,u),T(u,c)},p:function(t,n){var r=d(n,1)[0];1&r&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(o,t[0]),2&r&&(c.value=t[1])},i:O,o:O,d:function(t){t&&N(n)}}}function rn(t,n,r){var e,o,i;return A(t,$t,(function(t){return r(2,e=t)})),t.$$.update=function(){4&t.$$.dirty&&r(0,o=e?e.name:""),4&t.$$.dirty&&r(1,i=e&&e.progress?e.progress/e.total:0)},[o,i]}var en=function(r){o(i,r);var e=tn(i);function i(r){var o;return t(this,i),o=e.call(this),lt(n(o),r,rn,nn,P,{}),o}return i}(pt);function on(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=c(t);if(n){var o=c(this).constructor;r=Reflect.construct(e,arguments,o)}else r=e.apply(this,arguments);return u(this,r)}}function un(t){var n,r;return n=new en({}),{c:function(){ct(n.$$.fragment)},m:function(t,e){at(n,t,e),r=!0},i:function(t){r||(it(n.$$.fragment,t),r=!0)},o:function(t){ut(n.$$.fragment,t),r=!1},d:function(t){ft(n,t)}}}function cn(t){var n,r,e,o;return n=new Ut({}),e=new Zt({}),{c:function(){ct(n.$$.fragment),r=J(),ct(e.$$.fragment)},m:function(t,i){at(n,t,i),D(t,r,i),at(e,t,i),o=!0},i:function(t){o||(it(n.$$.fragment,t),it(e.$$.fragment,t),o=!0)},o:function(t){ut(n.$$.fragment,t),ut(e.$$.fragment,t),o=!1},d:function(t){ft(n,t),t&&N(r),ft(e,t)}}}function an(t){var n,r,e,o,i=[cn,un],u=[];function c(t,n){return t[0]?0:1}return r=c(t),e=u[r]=i[r](t),{c:function(){n=F("section"),e.c(),G(n,"class","svelte-ny0vsf")},m:function(t,e){D(t,n,e),u[r].m(n,null),o=!0},p:function(t,o){d(o,1)[0];var a=r;(r=c(t))!==a&&(et(),ut(u[a],1,1,(function(){u[a]=null})),ot(),(e=u[r])||(e=u[r]=i[r](t)).c(),it(e,1),e.m(n,null))},i:function(t){o||(it(e),o=!0)},o:function(t){ut(e),o=!1},d:function(t){t&&N(n),u[r].d()}}}function fn(t,n,r){var e=this&&this.__awaiter||function(t,n,r,e){return new(r||(r=Promise))((function(o,i){function u(t){try{a(e.next(t))}catch(t){i(t)}}function c(t){try{a(e.throw(t))}catch(t){i(t)}}function a(t){var n;t.done?o(t.value):(n=t.value,n instanceof r?n:new r((function(t){t(n)}))).then(u,c)}a((e=e.apply(t,n||[])).next())}))},o=!1;return q((function(){return e(void 0,void 0,void 0,a.mark((function t(){return a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,vt({blip:"sounds/blip.mp3",card:"sounds/card-hard.mp3",slide:"sounds/card-soft.mp3"},_t,Et).then(t=>kt=t);case 2:return t.next=4,Ct();case 4:return t.next=6,At();case 6:r(0,o=!0);case 7:case"end":return t.stop()}}),t)})))})),[o]}return new(function(r){o(i,r);var e=on(i);function i(r){var o;return t(this,i),o=e.call(this),lt(n(o),r,fn,an,P,{}),o}return i}(pt))({target:document.body})}();
//# sourceMappingURL=bundle.js.map
