module.exports = function(creep) {
    function build() {
        var structuresNeedsRepair = [];
        creep.room.find(FIND_STRUCTURES, {
            filter: function(i) {
                if (i.hitsMax > 1 && i.hits < 600) {
                    structuresNeedsRepair.push(i);
                }
            }
        });

        if (structuresNeedsRepair.length) {
            creep.moveTo(structuresNeedsRepair[0]);
            creep.repair(structuresNeedsRepair[0]);
        } else if (creep.room.find(FIND_CONSTRUCTION_SITES).length) {
		    construct();
		} else {
		    creep.say("E-");
		    creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
		}
    }
    
    function construct() {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	   // creep.say("Doot");
		if (targets.length) {
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
    }
    
    if (creep.pos == "[room W17N5 pos 8,22]") {
        creep.moveTo(8, 21);
        creep.moveTo(8, 23);
    }

	if (creep.carry.energy == 0) {
	    creep.say("E+");
		creep.moveTo(Game.spawns.Spawn1);
		Game.spawns.Spawn1.transferEnergy(creep);
	} else {
	    build();
	}
}
