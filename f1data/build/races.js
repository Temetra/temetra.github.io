function processRace(stmt) {
    let output = stmt.getAsObject();
    output.when = new Date(output.when);
    return output;
}
function getJoinedRaces(db, year) {
    let stmt = db.prepare(`select races.*, circuits.*
		from races
		join circuits on races.circuitId = circuits.circuitId
		where year = $year
		order by round`);
    stmt.bind({ $year: year });
    let output = [];
    while (stmt.step()) {
        output.push(processRace(stmt));
    }
    return output;
}

export { getJoinedRaces as g };
//# sourceMappingURL=races.js.map
