import{i as t,g as n,p as r,c as e,a as s,b as a,s as o,S as c,d as u,m as l,e as i,t as f,f as d,h as v,O as p,o as h,k as m,j as g,q as $,r as w,E as y,u as j,N as q,l as R,x as I,y as b,R as x,T as N,w as L,G as k,H as C,U as P,L as S,V as T}from"./main2.js";import{a as B,b as G}from"./measured.js";import{S as H}from"./SectionTemplate.js";function M(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var s,a=n(t);if(e){var o=n(this).constructor;s=Reflect.construct(a,arguments,o)}else s=a.apply(this,arguments);return r(this,s)}}function O(t,n,r){var e=t.slice();return e[6]=n[r],e}function D(t,n,r){var e=t.slice();return e[9]=n[r],e}function E(t){var n;return{c:function(){n=g("No results")},m:function(t,r){m(t,n,r)},p:L,d:function(t){t&&R(n)}}}function U(t){for(var n,r,e,s=[],a=new Map,o=t[2],c=function(t){return t[9].resultId},u=0;u<o.length;u+=1){var l=D(t,o,u),i=c(l);a.set(i,s[u]=V(i,l))}return{c:function(){n=h("table"),(r=h("tr")).innerHTML='<th class="svelte-wljgsq">Driver</th> \n\t\t\t\t<th class="svelte-wljgsq">Constructor</th> \n\t\t\t\t<th class="svelte-wljgsq">Grid</th> \n\t\t\t\t<th class="svelte-wljgsq">Position</th> \n\t\t\t\t<th class="svelte-wljgsq">Laps</th> \n\t\t\t\t<th class="svelte-wljgsq">Points</th>',e=$();for(var t=0;t<s.length;t+=1)s[t].c();w(n,"class","svelte-wljgsq")},m:function(t,a){m(t,n,a),j(n,r),j(n,e);for(var o=0;o<s.length;o+=1)s[o].m(n,null)},p:function(t,r){4&r&&(o=t[2],s=P(s,r,c,1,t,o,a,n,T,V,null,D))},d:function(t){t&&R(n);for(var r=0;r<s.length;r+=1)s[r].d()}}}function V(t,n){var r,e,s,a,o,c,u,l,i,f,d,v,p,y,I,b,x,N,L,P,S,T,B,G,H,M,O=n[9].forename+"",D=n[9].surname+"",E=n[9].team+"",U=n[9].grid+"",V=(n[9].position||n[9].status)+"",z=n[9].laps+"",A=n[9].points+"";return{key:t,first:null,c:function(){r=h("tr"),e=h("td"),s=g(O),a=$(),o=g(D),c=$(),u=h("td"),l=h("div"),f=$(),d=g(E),v=$(),p=h("td"),y=g(U),I=$(),b=h("td"),x=g(V),N=$(),L=h("td"),P=g(z),S=$(),T=h("td"),B=g(A),G=$(),w(e,"class","svelte-wljgsq"),w(l,"class","svelte-wljgsq"),w(u,"class","team svelte-wljgsq"),w(p,"class","svelte-wljgsq"),w(b,"class","svelte-wljgsq"),w(L,"class","svelte-wljgsq"),w(T,"class","svelte-wljgsq"),this.first=r},m:function(t,h){m(t,r,h),j(r,e),j(e,s),j(e,a),j(e,o),j(r,c),j(r,u),j(u,l),j(u,f),j(u,d),j(r,v),j(r,p),j(p,y),j(r,I),j(r,b),j(b,x),j(r,N),j(r,L),j(L,P),j(r,S),j(r,T),j(T,B),j(r,G),H||(M=k(i=n[3].call(null,l,n[9].color)),H=!0)},p:function(t,r){n=t,4&r&&O!==(O=n[9].forename+"")&&q(s,O),4&r&&D!==(D=n[9].surname+"")&&q(o,D),i&&C(i.update)&&4&r&&i.update.call(null,n[9].color),4&r&&E!==(E=n[9].team+"")&&q(d,E),4&r&&U!==(U=n[9].grid+"")&&q(y,U),4&r&&V!==(V=(n[9].position||n[9].status)+"")&&q(x,V),4&r&&z!==(z=n[9].laps+"")&&q(P,z),4&r&&A!==(A=n[9].points+"")&&q(B,A)},d:function(t){t&&R(r),H=!1,M()}}}function z(t){for(var n,r=t[0],e=[],s=0;s<r.length;s+=1)e[s]=A(O(t,r,s));return{c:function(){n=h("ul");for(var t=0;t<e.length;t+=1)e[t].c()},m:function(t,r){m(t,n,r);for(var s=0;s<e.length;s+=1)e[s].m(n,null)},p:function(t,s){if(3&s){var a;for(r=t[0],a=0;a<r.length;a+=1){var o=O(t,r,a);e[a]?e[a].p(o,s):(e[a]=A(o),e[a].c(),e[a].m(n,null))}for(;a<e.length;a+=1)e[a].d(1);e.length=r.length}},d:function(t){t&&R(n),I(e,t)}}}function A(t){var n,r,e,s,a,o=t[6].country+"";return{c:function(){var c;n=h("li"),r=h("a"),e=g(o),a=$(),w(r,"href",s="#/race/"+t[6].year+"/"+t[6].round),y(n,"highlight",t[6].raceId==(null===(c=t[1])||void 0===c?void 0:c.raceId))},m:function(t,s){m(t,n,s),j(n,r),j(r,e),j(n,a)},p:function(t,a){var c;(1&a&&o!==(o=t[6].country+"")&&q(e,o),1&a&&s!==(s="#/race/"+t[6].year+"/"+t[6].round)&&w(r,"href",s),3&a)&&y(n,"highlight",t[6].raceId==(null===(c=t[1])||void 0===c?void 0:c.raceId))},d:function(t){t&&R(n)}}}function F(t){var n,r;function e(t,n){var r;return(null===(r=t[2])||void 0===r?void 0:r.length)>0?U:E}var s=e(t),a=s(t),o=t[0]&&z(t);return{c:function(){a.c(),n=$(),o&&o.c(),r=b()},m:function(t,e){a.m(t,e),m(t,n,e),o&&o.m(t,e),m(t,r,e)},p:function(t,c){s===(s=e(t))&&a?a.p(t,c):(a.d(1),(a=s(t))&&(a.c(),a.m(n.parentNode,n))),t[0]?o?o.p(t,c):((o=z(t)).c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},d:function(t){a.d(t),t&&R(n),o&&o.d(t),t&&R(r)}}}function J(t){var n;return{c:function(){n=g("No race")},m:function(t,r){m(t,n,r)},p:L,d:function(t){t&&R(n)}}}function K(t){var n,r,e,s,a,o,c,u,l,i,f=t[1].year+"",d=t[1].title+"",v=t[1].round+"",p=S(null===(n=t[1])||void 0===n?void 0:n.when)+"";return{c:function(){r=h("div"),e=g(f),s=$(),a=g(d),o=g(", Round "),c=g(v),u=$(),l=h("div"),i=g(p),w(r,"class","svelte-wljgsq"),w(l,"class","svelte-wljgsq")},m:function(t,n){m(t,r,n),j(r,e),j(r,s),j(r,a),j(r,o),j(r,c),m(t,u,n),m(t,l,n),j(l,i)},p:function(t,n){var r;2&n&&f!==(f=t[1].year+"")&&q(e,f),2&n&&d!==(d=t[1].title+"")&&q(a,d),2&n&&v!==(v=t[1].round+"")&&q(c,v),2&n&&p!==(p=S(null===(r=t[1])||void 0===r?void 0:r.when)+"")&&q(i,p)},d:function(t){t&&R(r),t&&R(u),t&&R(l)}}}function Q(t){var n;function r(t,n){return t[1]?K:J}var e=r(t),s=e(t);return{c:function(){n=h("div"),s.c(),w(n,"class","title svelte-wljgsq"),w(n,"slot","header")},m:function(t,r){m(t,n,r),s.m(n,null)},p:function(t,a){e===(e=r(t))&&s?s.p(t,a):(s.d(1),(s=e(t))&&(s.c(),s.m(n,null)))},d:function(t){t&&R(n),s.d()}}}function W(t){var n,r;return n=new H({props:{$$slots:{header:[Q],default:[F]},$$scope:{ctx:t}}}),{c:function(){u(n.$$.fragment)},m:function(t,e){l(n,t,e),r=!0},p:function(t,r){var e=i(r,1)[0],s={};4103&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i:function(t){r||(f(n.$$.fragment,t),r=!0)},o:function(t){d(n.$$.fragment,t),r=!1},d:function(t){v(n,t)}}}function X(t,n,r){var e;p(t,x,(function(t){return r(5,e=t)}));var s,a,o,c=n.params;return t.$$set=function(t){"params"in t&&r(4,c=t.params)},t.$$.update=function(){48&t.$$.dirty&&c.year&&r(0,s=B(e,c.year)),17&t.$$.dirty&&c.round&&s&&r(1,a=s.find((function(t){return t.round==c.round}))),34&t.$$.dirty&&r(2,o=a?G(e,a.raceId):null)},[s,a,o,function(t,n){return n?(t.style.backgroundColor=n,N(n)<200&&(t.style.borderColor=n)):t.classList.add("no-team-color"),{}},c,e]}var Y=function(n){t(u,c);var r=M(u);function u(t){var n;return e(this,u),n=r.call(this),s(a(n),t,X,W,o,{params:4}),n}return u}();export default Y;
//# sourceMappingURL=Race.js.map
