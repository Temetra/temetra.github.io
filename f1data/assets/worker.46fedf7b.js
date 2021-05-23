var t=Object.defineProperty,e=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,s=(e,n,r)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,c=(t,e)=>{for(var n in e||(e={}))a.call(e,n)&&s(t,n,e[n]);if(r)for(var n of r(e))i.call(e,n)&&s(t,n,e[n]);return t},o=(t,r)=>e(t,n(r));import{s as u,e as d}from"./Measurement.d8df8411.js";import{G as E,H as l}from"./vendor.067a736e.js";var m={open:async function(t){return E(t,1,{upgrade:e=>e.createObjectStore(t)}).then((e=>({get:n=>e.get(t,n),put:(n,r)=>e.put(t,r,n),clear:()=>e.clear(t)})))}};const T=t=>{throw t};var I={string:t=>t?`"${t}"`:"NULL",number:t=>t?+t:"NULL",date:t=>t?new Date(t).valueOf()/1e3:"NULL",path:(...t)=>t.map((t=>t.replace(/\/+$/,""))).join("/")};function h(t,e,n){try{e.run(n.createStmt),e.run(n.createIndices),t({done:"table",table:n.tablename})}catch(r){throw new Error(`createTable "${n.tablename}"\n${r.message}`)}}async function b(t,e,n,r,a){return async function(t,e){return m.open(t).then((t=>t.get(e))).then((t=>t||T("not-cached"))).catch((n=>{if("not-cached"==n)return fetch(e).then((t=>t||T("not-found"))).then((t=>t.text())).then((async n=>await m.open(t).then((t=>t.put(e,n))).then((t=>n))));throw n}))}(n,r.filepath(a)).then((t=>function*(t,e){var n,r;const a=(null==e?void 0:e.separator)||",",i=(null==e?void 0:e.delimiter)||'"';let s=[],c=0,o=!1;for(let u=0;u<t.length;u++){let e=t.charAt(u),r=t.charAt(u+1);s[c]=s[c]||"",e==i&&o&&r==i?(s[c]+=e,u++):e!=i?e!=a||o?"\r"!=e&&"\n"!=e||o?s[c]+=e:("\r"==e&&"\n"==r&&u++,(null==(n=s[0])?void 0:n.length)>0&&(yield s),s=[],c=0):c++:o=!o}(null==(r=s[0])?void 0:r.length)>0&&(yield s)}(t))).then((t=>function(t,e,n){let r=n.next().value,a=[];for(let i of n)a.push(i.map(((t,n)=>e(t,n))));return`INSERT INTO ${t} ([${r.join("], [")}]) VALUES (${a.join("),\n(")})`}(r.tablename,r.mapToSQL,t))).then((t=>e.run(t))).then((e=>t({done:"insert",table:r.tablename}))).catch((t=>{throw new Error(`insertFetchedData "${r.tablename}" "${r.filepath(a)}"\n${t.message}"`)}))}const p={tablename:"circuits",filepath:t=>I.path(t.dataLocation,"circuits.csv"),createStmt:'CREATE TABLE "circuits" (\n\t"circuitId"\tINTEGER NOT NULL UNIQUE,\n\t"name"\tTEXT,\n\t"location"\tTEXT,\n\t"country"\tTEXT,\n\t"lat"\tREAL,\n\t"lng"\tREAL,\n\t"alt"\tINTEGER,\n\tPRIMARY KEY("circuitId"))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.string,I.string,I.string,I.number,I.number,I.number][e](t)},f={tablename:"constructors_colours",filepath:t=>I.path(t.dataLocation,"constructors_colours.csv"),createStmt:'CREATE TABLE "constructors_colours" (\n\t"constructorColourId"\tINTEGER NOT NULL DEFAULT 0 UNIQUE,\n\t"constructorId"\tINTEGER,\n\t"year"\tINTEGER,\n\t"colour"\tTEXT,\n\tPRIMARY KEY("constructorColourId" AUTOINCREMENT))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.number,I.number,I.string][e](t)},N={tablename:"constructors",filepath:t=>I.path(t.dataLocation,"constructors.csv"),createStmt:'CREATE TABLE "constructors" (\n\t"constructorId"\tINTEGER NOT NULL UNIQUE,\n\t"name"\tTEXT,\n\t"nationality"\tTEXT,\n\tPRIMARY KEY("constructorId"))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.string,I.string][e](t)},R={tablename:"drivers",filepath:t=>I.path(t.dataLocation,"drivers.csv"),createStmt:'CREATE TABLE "drivers" (\n\t"driverId"\tINTEGER NOT NULL UNIQUE,\n\t"number"\tINTEGER,\n\t"code"\tTEXT,\n\t"forename"\tTEXT,\n\t"surname"\tTEXT,\n\t"dob"\tINTEGER,\n\t"nationality"\tTEXT,\n\tPRIMARY KEY("driverId"))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.number,I.string,I.string,I.string,I.date,I.string][e](t)},L={tablename:"qualifying",filepath:t=>I.path(t.dataLocation,"qualifying.csv"),createStmt:'CREATE TABLE "qualifying" (\n\t"qualifyId"\tINTEGER NOT NULL UNIQUE,\n\t"raceId"\tINTEGER,\n\t"driverId"\tINTEGER,\n\t"constructorId"\tINTEGER,\n\t"number"\tINTEGER,\n\t"position"\tINTEGER,\n\t"q1"\tINTEGER,\n\t"q2"\tINTEGER,\n\t"q3"\tINTEGER,\n\tPRIMARY KEY("qualifyId"))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.number,I.number,I.number,I.number,I.number,I.number,I.number,I.number][e](t)},g={tablename:"races",filepath:t=>I.path(t.dataLocation,"races.csv"),createStmt:'CREATE TABLE "races" (\n\t"raceId"\tINTEGER NOT NULL UNIQUE,\n\t"circuitId"\tINTEGER,\n\t"year"\tINTEGER,\n\t"round"\tINTEGER,\n\t"title"\tTEXT,\n\t"when"\tINTEGER,\n\tPRIMARY KEY("raceId"))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.number,I.number,I.number,I.string,I.date][e](t)},v={tablename:"results",filepath:t=>I.path(t.dataLocation,"results",`${null==t?void 0:t.year}.csv`),createStmt:'CREATE TABLE "results" (\n\t"resultId"\tINTEGER NOT NULL UNIQUE,\n\t"raceId"\tINTEGER,\n\t"driverId"\tINTEGER,\n\t"constructorId"\tINTEGER,\n\t"number"\tINTEGER,\n\t"grid"\tINTEGER,\n\t"position"\tINTEGER,\n\t"positionText"\tTEXT,\n\t"positionOrder"\tINTEGER,\n\t"points"\tREAL,\n\t"laps"\tINTEGER,\n\t"milliseconds"\tINTEGER,\n\t"fastestLap"\tINTEGER,\n\t"rank"\tINTEGER,\n\t"fastestLapTime"\tINTEGER,\n\t"fastestLapSpeed"\tREAL,\n\t"statusId"\tINTEGER,\n\tPRIMARY KEY("resultId"))',createIndices:'CREATE INDEX "results_idx" ON "results" (\n\t"raceId"\n)',mapToSQL:(t,e)=>[I.number,I.number,I.number,I.number,I.number,I.number,I.number,I.string,I.number,I.number,I.number,I.number,I.number,I.number,I.number,I.number,I.number][e](t)},y={tablename:"status",filepath:t=>I.path(t.dataLocation,"status.csv"),createStmt:'CREATE TABLE "status" (\n\t"statusId"\tINTEGER NOT NULL UNIQUE,\n\t"status"\tTEXT,\n\tPRIMARY KEY("statusId"))',createIndices:"",mapToSQL:(t,e)=>[I.number,I.string][e](t)};function w(t,e,n,r){let a=t.prepare(e).getAsObject(n);return r?r(a):a}const G=t=>o(c({},t),{dob:new Date(1e3*t.dob)});const A=t=>o(c({},t),{when:new Date(1e3*t.when)});const U={locateFile:t=>`https://cdn.jsdelivr.net/npm/sql.js@1.5.0/dist/${t}`};async function S(t,e,n){let r=await l(n||U).then((t=>new t.Database)).then((e=>(t({done:"database",max:19}),e)));return h(t,r,p),h(t,r,f),h(t,r,N),h(t,r,R),h(t,r,L),h(t,r,g),h(t,r,v),h(t,r,y),await async function(t,e){return fetch(e).then((t=>t||T("not-found"))).then((t=>t.json())).then((async e=>{let n=await m.open(t);return await n.get(`${t}-version`)!=e.version&&await n.clear(),n.put(`${t}-version`,e.version)})).then((t=>{}))}("f1-data",I.path(e,"version.json")),await b(t,r,"f1-data",p,{dataLocation:e}),await b(t,r,"f1-data",f,{dataLocation:e}),await b(t,r,"f1-data",N,{dataLocation:e}),await b(t,r,"f1-data",R,{dataLocation:e}),await b(t,r,"f1-data",L,{dataLocation:e}),await b(t,r,"f1-data",g,{dataLocation:e}),await b(t,r,"f1-data",v,{dataLocation:e,year:2020}),await b(t,r,"f1-data",v,{dataLocation:e,year:2010}),await b(t,r,"f1-data",v,{dataLocation:e,year:2e3}),await b(t,r,"f1-data",y,{dataLocation:e}),{getCircuit:t=>function(t,e){if(e)return w(t,"select *\n\t\t\tfrom circuits\n\t\t\twhere circuitId = $circuitId",{$circuitId:e});return null}(r,t),getDriverByName:t=>function(t,e){return w(t,'select * \n\t\tfrom drivers \n\t\twhere (drivers.forename || " " || drivers.surname) \n\t\t\tlike $name\n\t\tlimit 1',{$name:e},G)}(r,t),getJoinedRaces:t=>function(t,e){return function(t,e,n,r){let a=[],i=t.prepare(e);for(i.bind(n);i.step();){let t=i.getAsObject();a.push(r?r(t):t)}return a}(t,"select races.*, circuits.*\n\t\tfrom races\n\t\tjoin circuits on races.circuitId = circuits.circuitId\n\t\twhere year = $year\n\t\torder by round",{$year:e},A)}(r,t)}}const O=self;let $=null;const j=new class{constructor(t){this.dispatcher=t,this.requestHandlers={}}registerHandler(t,e){if(t in this.requestHandlers)throw`ServerWorkerStub: Handler already registered for '${t}'`;this.requestHandlers[t]=e}receive(t){if(t.name in this.requestHandlers){u("ServerWorkerStub",t.id);let e=e=>this.dispatcher({id:t.id,name:"progress",data:e});this.requestHandlers[t.name](t.data,e).then((e=>this.dispatcher({id:t.id,name:"payload",data:e}))).then((()=>d("ServerWorkerStub",t.id))).catch((e=>this.dispatcher({id:t.id,name:"error",data:e})))}else this.dispatcher({id:t.id,name:"error",data:"Unknown worker message"})}}((t=>O.postMessage(t)));O.onmessage=t=>j.receive(t.data),j.registerHandler("init",(async function(t,e){if(null==$)return S(e,t.path).then((t=>{$=t}));throw"Database already initialised"})),j.registerHandler("getCircuit",(async t=>$.getCircuit(t.circuitId))),j.registerHandler("getJoinedRaces",(async t=>$.getJoinedRaces(t.year)));
