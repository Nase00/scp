var scout = function (creep, energyStores) {
    var room1 = creep.memory.room || '[room W17N4]';
    var room2 = '[room W18N4]';
    // var room3 = "[room W18N4]";

	if (creep.carry.energy < creep.carryCapacity && !(creep.room == room1 && creep.carry.energy > 0)) {
	    if (creep.room == room1) {
            creep.moveTo(0, 40);
        } else if (creep.room == room2) {
            extract();
        }
	} else {
	    if (creep.room == room2) {
	        creep.say('Doot');
            creep.moveTo(49, 39);
        } else {
            // creep.say('Manamana');
            deposit();
        }
	}
	
	function extract() {
		var sources = creep.room.find(FIND_SOURCES);
		creep.moveTo(sources[0]);
		creep.harvest(sources[0]);
	}
	
	function deposit() {
	    var energyStore = energyStores.length > 2 ? energyStores[energyStores.length - 2] : energyStores[0]
		creep.moveTo(energyStore);
		creep.transferEnergy(energyStore);
	}
};

var spawn = function(spawn, room) {
    console.log('Spawning a Scout.');
    var currentTime = Date.now();
    var name = 'Scout' + currentTime;
    var source = Math.floor(Math.random() * (1 - 0 + 1));
    spawn.createCreep([CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE], name, {role: 'scout', born: currentTime, source: source, room: room});  
};

module.exports = {
    scout: scout,
    spawn: spawn
};
