function e(e){let t=e.getAsObject();return t.when=new Date(t.when),t}function t(t,r){let c=t.prepare("select races.*, circuits.*\n\t\tfrom races\n\t\tjoin circuits on races.circuitId = circuits.circuitId\n\t\twhere year = $year\n\t\torder by round");c.bind({$year:r});let n=[];for(;c.step();)n.push(e(c));return n}export{t as g};
//# sourceMappingURL=races.js.map
