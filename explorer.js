var explore = function (creep, energyStores) {
    var room1 = '[room W17N4]';
    var room2 = '[room W17N3]';
    // var room3 = "[room W18N4]";
	if (creep.carry.energy < creep.carryCapacity && !(creep.room == room1 && creep.carry.energy > 0)) {
	    if (creep.room == room1) {
            creep.moveTo(30, 49);
        } else if (creep.room == room2) {
            extract();
        }
	} else {
	    if (creep.room == room2) {
	        creep.say('Doot');
            creep.moveTo(33, 0);
        } else {
            // creep.say('Meep');
            deposit();
        }
	}
	
	function extract() {
		var sources = creep.room.find(FIND_SOURCES);
		var source = creep.memory.source < 2 ? creep.memory.source : 1;
		creep.moveTo(sources[source || 0]);
		creep.harvest(sources[source || 0]);
	}
	
	function deposit() {
		creep.moveTo(energyStores[creep.memory.source]);
		creep.transferEnergy(energyStores[creep.memory.source]);
	}
};

var spawn = function(spawn, room) {
    console.log('Spawning an Explorer.');
    var currentTime = Date.now();
    var source = Math.floor(Math.random() * (1 - 0 + 1));
    var name = 'Explorer' + currentTime + "source" + source;
    spawn.createCreep([CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], name, {role: 'explorer', born: currentTime, source: source, room: room});
};

module.exports = {
    explore: explore,
    spawn: spawn
};
