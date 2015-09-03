var harvest = function(creep, energyStores) {
	if (creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES_ACTIVE);
		var source = creep.memory.source < 2 ? creep.memory.source : 1;
		creep.moveTo(sources[source || 0]);
		creep.harvest(sources[source || 0]);
	} else {
		creep.moveTo(energyStores[source || 0]);
		creep.transferEnergy(energyStores[source || 0]);
	}
};

var spawn = function(spawn) {
    console.log('Spawning a d_harvester.');
    var currentTime =  Date.now();
    var source = Math.floor(Math.random() * (1 - 0 + 1));
    var name = 'Harvester' + currentTime + "source" + source;
    spawn.createCreep([CARRY, WORK, WORK, MOVE], name, {role: 'harvester', born: currentTime, source: source });
};

module.exports = {
    harvest: harvest,
    spawn: spawn
};
