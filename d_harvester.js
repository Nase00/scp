var harvest = function(creep, source) {
    var energyStores = [];
    var availableEnergy = [];
    creep.room.find(FIND_STRUCTURES, {
        filter: function(i) {
            if (i.energy < i.energyCapacity) {
                energyStores.push(i);
            }
            if (i.energy > 0 && i.structureType == 'extension' || i.structureType == 'spawn') {
                availableEnergy.push(i);
            }
        }
    });

	if (creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES_ACTIVE);

		creep.moveTo(sources[1]);
		creep.harvest(sources[1]);
	} else {
		creep.moveTo(energyStores[0]);
		creep.transferEnergy(energyStores[0]);
	}
};

var spawn = function(spawn) {
    console.log('Spawning a d_harvester.');
    var currentTime =  Date.now();
    var source = 1;
    var name = 'dHarvester' + currentTime + "source" + source;
    spawn.createCreep([CARRY, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], name, {role: 'd_harvester', born: currentTime, source: source });
};

module.exports = {
    harvest: harvest,
    spawn: spawn
};
