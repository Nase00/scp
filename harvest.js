module.exports = function (creep) {
	if (creep.carry.energy < creep.carryCapacity) {
	    creep.say("H+")
		var sources = creep.room.find(FIND_SOURCES);
// 		var randomSource = Math.floor(Math.random() * 2);
// 		console.log(randomSource)
		creep.moveTo(sources[0]);
		creep.harvest(sources[0]);
	} else {
	    creep.say("D+")
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1);
	}
}
