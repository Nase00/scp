module.exports = function (creep) {
    var room1 = "[room W17N5]";
    var room2 = "[room W17N4]";
    var room3 = "[room W18N4]";
    
	if (creep.carry.energy < creep.carryCapacity) {
	    if (creep.room == room1) {
	        creep.say("Doot");
            creep.moveTo(2, 39);
        } else if (creep.room == room2) {
            extract();
        }
	} else {
	    if (creep.room == room2) {
	        creep.say("Meep");
            creep.moveTo(26, 0);
        } else {
            deposit();
        }
	}
	
	function extract() {
	    creep.say("E");
		var sources = creep.room.find(FIND_SOURCES);
		creep.moveTo(sources[0]);
		creep.harvest(sources[0]);
	}
	
	function deposit() {
	    creep.say("D")
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1);
	}
}
