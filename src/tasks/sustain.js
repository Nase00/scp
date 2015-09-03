export default (room, unitCount) => {
	for (let creepType in Memory.rooms[room].unitCount) {
		if (creepType < unitCount[creepType]) {
			Game.rooms[room].spawn(creepType);
		}
	}
};
