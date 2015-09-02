"use strict";

var harvest = function harvest(creep, energyStores) {
	if (creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		creep.moveTo(sources[creep.memory.source]);
		creep.harvest(sources[creep.memory.source]);
	} else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(energyStores[0]);
	}
};

var spawn = function spawn() {
	var currentTime = Date.now();
	var name = "Harvester" + currentTime;
	var source = Math.floor(Math.random() * (1 - 0 + 1));
	Game.spawns.Spawn1.createCreep([CARRY, WORK, MOVE], name, { role: 'harvester', born: currentTime, source: source });
};

module.exports = {
	harvest: harvest,
	spawn: spawn
};