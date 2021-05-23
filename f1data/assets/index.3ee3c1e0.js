import{w as s,S as e,i as t,s as a,e as r,t as n,a as o,b as c,c as l,d as i,f as d,g as u,h as f,j as h,k as m,l as p,m as v,n as $,o as g,p as E,R as y,q as w,r as _,u as x,v as A,x as I,y as D,z as k,A as j,B as C,C as V,D as P,E as S,F as b,G as L,H as O}from"./vendor.86c328c4.js";import{s as T,e as W}from"./Measurement.d8df8411.js";const q=s({max:0,count:0}),N=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],R=10*Math.floor(195),F=10*Math.floor(202.1),M=Array.from(Array(72),((s,e)=>e+1950)).sort(((s,e)=>e-s)),B=Array.from(Array((F-R)/10+1),((s,e)=>10*e+R)).sort(((s,e)=>e-s)).map((s=>{let e=s+9>2021?2021-s:9,t=Array.from(Array(e),((e,t)=>s+t+1));return{decade:s,years:t}}));const z=new function(){return new Worker("assets/worker.61f478be.js",{type:"module"})},H=new class{constructor(s){this.dispatcher=s,this.lastId=0,this.requests={}}send(s,e,t){this.lastId+=1,T("ClientWorkerStub",this.lastId);let a=null,r=new Promise(((s,e)=>a={resolve:s,reject:e,progress:t}));this.requests[this.lastId]=a;let n={id:this.lastId,name:s,data:e};return this.dispatcher(n),r}receive(s){if(s&&s.id){let e=this.requests[s.id];if(e){if("progress"==s.name)return void(e.progress&&e.progress(s.data));"error"==s.name?e.reject(s.data):"payload"==s.name&&e.resolve(s.data),e=null,delete this.requests[s.id],W("ClientWorkerStub",s.id)}}}}((s=>z.postMessage(s)));z.onmessage=s=>H.receive(s.data);function G(s){let e,t,a,g,E,y,w,_,x,A,I,D,k,j,C,V,P,S,b,L,O,T,W,q,N,R;return{c(){e=r("header"),t=r("div"),a=r("a"),g=n("F1 Analysis"),E=o(),y=r("nav"),w=r("div"),_=r("a"),x=n("Seasons"),A=o(),I=r("div"),D=r("a"),k=n("Circuits"),j=o(),C=r("div"),V=r("a"),P=n("Drivers"),S=o(),b=r("div"),L=r("a"),O=n("Constructors"),T=o(),W=r("div"),q=r("a"),N=c("svg"),R=c("path"),this.h()},l(s){e=l(s,"HEADER",{class:!0});var r=i(e);t=l(r,"DIV",{class:!0});var n=i(t);a=l(n,"A",{href:!0,class:!0});var o=i(a);g=d(o,"F1 Analysis"),o.forEach(u),n.forEach(u),E=f(r),y=l(r,"NAV",{class:!0});var c=i(y);w=l(c,"DIV",{class:!0});var h=i(w);_=l(h,"A",{href:!0,class:!0});var m=i(_);x=d(m,"Seasons"),m.forEach(u),h.forEach(u),A=f(c),I=l(c,"DIV",{class:!0});var p=i(I);D=l(p,"A",{href:!0,class:!0});var v=i(D);k=d(v,"Circuits"),v.forEach(u),p.forEach(u),j=f(c),C=l(c,"DIV",{class:!0});var $=i(C);V=l($,"A",{href:!0,class:!0});var F=i(V);P=d(F,"Drivers"),F.forEach(u),$.forEach(u),S=f(c),b=l(c,"DIV",{class:!0});var M=i(b);L=l(M,"A",{href:!0,class:!0});var B=i(L);O=d(B,"Constructors"),B.forEach(u),M.forEach(u),c.forEach(u),T=f(r),W=l(r,"DIV",{class:!0});var z=i(W);q=l(z,"A",{href:!0,class:!0});var H=i(q);N=l(H,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0,class:!0},1);var G=i(N);R=l(G,"path",{d:!0,class:!0},1),i(R).forEach(u),G.forEach(u),H.forEach(u),z.forEach(u),r.forEach(u),this.h()},h(){h(a,"href","#/"),h(a,"class","svelte-1o03dd"),h(t,"class","logo svelte-1o03dd"),h(_,"href","#/seasons"),h(_,"class","svelte-1o03dd"),h(w,"class","svelte-1o03dd"),m(w,"active",s[0]),h(D,"href","#/circuits"),h(D,"class","svelte-1o03dd"),h(I,"class","svelte-1o03dd"),m(I,"active",s[1]),h(V,"href","#/drivers"),h(V,"class","svelte-1o03dd"),h(C,"class","svelte-1o03dd"),m(C,"active",s[2]),h(L,"href","#/constructors"),h(L,"class","svelte-1o03dd"),h(b,"class","svelte-1o03dd"),m(b,"active",s[3]),h(y,"class","svelte-1o03dd"),h(R,"d","M3.5 0c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.59 0 1.17-.14 1.66-.41a1 1 0 0 0 .13.13l1 1a1.02 1.02 0 1 0 1.44-1.44l-1-1a1 1 0 0 0-.16-.13c.27-.49.44-1.06.44-1.66 0-1.93-1.57-3.5-3.5-3.5zm0 1c1.39 0 2.5 1.11 2.5 2.5 0 .66-.24 1.27-.66 1.72-.01.01-.02.02-.03.03a1 1 0 0 0-.13.13c-.44.4-1.04.63-1.69.63-1.39 0-2.5-1.11-2.5-2.5s1.11-2.5 2.5-2.5z"),h(R,"class","svelte-1o03dd"),h(N,"xmlns","http://www.w3.org/2000/svg"),h(N,"width","8"),h(N,"height","8"),h(N,"viewBox","0 0 8 8"),h(N,"class","svelte-1o03dd"),h(q,"href","#/search"),h(q,"class","svelte-1o03dd"),h(W,"class","search svelte-1o03dd"),h(e,"class","svelte-1o03dd")},m(s,r){p(s,e,r),v(e,t),v(t,a),v(a,g),v(e,E),v(e,y),v(y,w),v(w,_),v(_,x),v(y,A),v(y,I),v(I,D),v(D,k),v(y,j),v(y,C),v(C,V),v(V,P),v(y,S),v(y,b),v(b,L),v(L,O),v(e,T),v(e,W),v(W,q),v(q,N),v(N,R)},p(s,[e]){1&e&&m(w,"active",s[0]),2&e&&m(I,"active",s[1]),4&e&&m(C,"active",s[2]),8&e&&m(b,"active",s[3])},i:$,o:$,d(s){s&&u(e)}}}function J(s,e,t){let a,r,n,o,c;return g(s,E,(s=>t(4,c=s))),s.$$.update=()=>{16&s.$$.dirty&&t(0,a=c.startsWith("/season")),16&s.$$.dirty&&t(1,r=c.search("^/(circuits|race/)")>=0),16&s.$$.dirty&&t(2,n=c.startsWith("/drivers")),16&s.$$.dirty&&t(3,o=c.startsWith("/constructors"))},[a,r,n,o,c]}class K extends e{constructor(s){super(),t(this,s,J,G,a,{})}}let Q;const U={},X=function(s,e){if(!e)return s();if(void 0===Q){const s=document.createElement("link").relList;Q=s&&s.supports&&s.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(e.map((s=>{if(s in U)return;U[s]=!0;const e=s.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${t}`))return;const a=document.createElement("link");return a.rel=e?"stylesheet":Q,e||(a.as="script",a.crossOrigin=""),a.href=s,document.head.appendChild(a),e?new Promise(((s,e)=>{a.addEventListener("load",s),a.addEventListener("error",e)})):void 0}))).then((()=>s()))};function Y(s){let e,t;return e=new y({props:{routes:s[1]}}),e.$on("conditionsFailed",s[0]),{c(){w(e.$$.fragment)},l(s){_(e.$$.fragment,s)},m(s,a){x(e,s,a),t=!0},p:$,i(s){t||(A(e.$$.fragment,s),t=!0)},o(s){I(e.$$.fragment,s),t=!1},d(s){D(e,s)}}}function Z(s){const e=[s=>(s.params.year=parseInt(s.params.year),s.params.round=parseInt(s.params.round),M.indexOf(s.params.year)>=0)];return[()=>j("/notfound"),{"/":k({asyncComponent:()=>X((()=>import("./Landing.169c3a88.js")),["assets/Landing.169c3a88.js","assets/vendor.86c328c4.js","assets/SectionTemplate.dd53ffa1.js","assets/SectionTemplate.c0c65056.css"])}),"/seasons":k({asyncComponent:()=>X((()=>import("./SeasonsTable.aa5ee899.js")),["assets/SeasonsTable.aa5ee899.js","assets/SeasonsTable.b5eaae68.css","assets/vendor.86c328c4.js","assets/SectionTemplate.dd53ffa1.js","assets/SectionTemplate.c0c65056.css","assets/Measurement.d8df8411.js"])}),"/season/:year/:round?":k({asyncComponent:()=>X((()=>import("./SeasonPage.273f8101.js")),["assets/SeasonPage.273f8101.js","assets/SeasonPage.8661ebc2.css","assets/vendor.86c328c4.js","assets/SectionTemplate.dd53ffa1.js","assets/SectionTemplate.c0c65056.css","assets/Measurement.d8df8411.js"]),conditions:e}),"*":k({asyncComponent:()=>X((()=>import("./NotFound.6bd38f8b.js")),["assets/NotFound.6bd38f8b.js","assets/vendor.86c328c4.js","assets/SectionTemplate.dd53ffa1.js","assets/SectionTemplate.c0c65056.css"])})}]}class ss extends e{constructor(s){super(),t(this,s,Z,Y,a,{})}}function es(s){let e;const t=s[4].default,a=S(t,s,s[3],null);return{c(){a&&a.c()},l(s){a&&a.l(s)},m(s,t){a&&a.m(s,t),e=!0},p(s,r){a&&a.p&&(!e||8&r)&&b(a,t,s,s[3],r,null,null)},i(s){e||(A(a,s),e=!0)},o(s){I(a,s),e=!1},d(s){a&&a.d(s)}}}function ts(s){let e,t,a;var r=s[1];return r&&(e=new r({})),{c(){e&&w(e.$$.fragment),t=C()},l(s){e&&_(e.$$.fragment,s),t=C()},m(s,r){e&&x(e,s,r),p(s,t,r),a=!0},p(s,a){if(r!==(r=s[1])){if(e){V();const s=e;I(s.$$.fragment,1,0,(()=>{D(s,1)})),P()}r?(e=new r({}),w(e.$$.fragment),A(e.$$.fragment,1),x(e,t.parentNode,t)):e=null}},i(s){a||(e&&A(e.$$.fragment,s),a=!0)},o(s){e&&I(e.$$.fragment,s),a=!1},d(s){s&&u(t),e&&D(e,s)}}}function as(s){let e,t,a,r;const n=[ts,es],o=[];function c(s,e){return s[0]?0:1}return e=c(s),t=o[e]=n[e](s),{c(){t.c(),a=C()},l(s){t.l(s),a=C()},m(s,t){o[e].m(s,t),p(s,a,t),r=!0},p(s,[r]){let l=e;e=c(s),e===l?o[e].p(s,r):(V(),I(o[l],1,1,(()=>{o[l]=null})),P(),t=o[e],t?t.p(s,r):(t=o[e]=n[e](s),t.c()),A(t,1),t.m(a.parentNode,a))},i(s){r||(A(t),r=!0)},o(s){I(t),r=!1},d(s){o[e].d(s),s&&u(a)}}}function rs(s,e,t){let{$$slots:a={},$$scope:r}=e,{skeletonised:n=!1}=e,{template:o}=e,{slot:c}=e;return c=c,s.$$set=s=>{"skeletonised"in s&&t(0,n=s.skeletonised),"template"in s&&t(1,o=s.template),"slot"in s&&t(2,c=s.slot),"$$scope"in s&&t(3,r=s.$$scope)},[n,o,c,r,a]}class ns extends e{constructor(s){super(),t(this,s,rs,as,a,{skeletonised:0,template:1,slot:2})}}function os(s){let e,t,a;return{c(){e=r("content"),t=r("div"),a=r("div"),this.h()},l(s){e=l(s,"CONTENT",{class:!0});var r=i(e);t=l(r,"DIV",{id:!0,class:!0});var n=i(t);a=l(n,"DIV",{style:!0,class:!0}),i(a).forEach(u),n.forEach(u),r.forEach(u),this.h()},h(){L(a,"width",s[0]+"%"),h(a,"class","svelte-13i7go3"),h(t,"id","progress"),h(t,"class","svelte-13i7go3"),h(e,"class","svelte-13i7go3")},m(s,r){p(s,e,r),v(e,t),v(t,a)},p(s,[e]){1&e&&L(a,"width",s[0]+"%")},i:$,o:$,d(s){s&&u(e)}}}function cs(s,e,t){let a,r;return g(s,q,(s=>t(1,r=s))),s.$$.update=()=>{2&s.$$.dirty&&t(0,a=r.count/r.max*100)},[a,r]}class ls extends e{constructor(s){super(),t(this,s,cs,os,a,{})}}function is(s){let e,t,a,r;return e=new K({}),a=new ss({}),{c(){w(e.$$.fragment),t=o(),w(a.$$.fragment)},l(s){_(e.$$.fragment,s),t=f(s),_(a.$$.fragment,s)},m(s,n){x(e,s,n),p(s,t,n),x(a,s,n),r=!0},i(s){r||(A(e.$$.fragment,s),A(a.$$.fragment,s),r=!0)},o(s){I(e.$$.fragment,s),I(a.$$.fragment,s),r=!1},d(s){D(e,s),s&&u(t),D(a,s)}}}function ds(s){let e,t;return e=new ns({props:{slot:"header",template:ls,skeletonised:s[0],$$slots:{default:[is]},$$scope:{ctx:s}}}),{c(){w(e.$$.fragment)},l(s){_(e.$$.fragment,s)},m(s,a){x(e,s,a),t=!0},p(s,[t]){const a={};1&t&&(a.skeletonised=s[0]),4&t&&(a.$$scope={dirty:t,ctx:s}),e.$set(a)},i(s){t||(A(e.$$.fragment,s),t=!0)},o(s){I(e.$$.fragment,s),t=!1},d(s){D(e,s)}}}function us(s,e,t){var a=this&&this.__awaiter||function(s,e,t,a){return new(t||(t=Promise))((function(r,n){function o(s){try{l(a.next(s))}catch(e){n(e)}}function c(s){try{l(a.throw(s))}catch(e){n(e)}}function l(s){var e;s.done?r(s.value):(e=s.value,e instanceof t?e:new t((function(s){s(e)}))).then(o,c)}l((a=a.apply(s,e||[])).next())}))};let r=!0;return O((()=>a(void 0,void 0,void 0,(function*(){H.send("init",null,(s=>q.update((e=>({max:s.max||e.max,count:++e.count}))))).then((()=>t(0,r=!1)))})))),[r]}new class extends e{constructor(s){super(),t(this,s,us,ds,a,{})}}({target:document.getElementById("app")});export{ns as S,H as c,B as g,N as m};
