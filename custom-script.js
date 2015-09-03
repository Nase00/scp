module.exports = function(creep, availableEnergy) {
    var room1 = '[room W17N4]';
    var room2 = '[room W17N3]';
    
    creep.say('D');
    
    if (creep.carry.energy == creep.carryCapacity || (creep.room == room2 && creep.carry.energy > 0)) {
	    if (creep.room == room1) {
            creep.moveTo(32, 49);
        } else if (creep.room == room2) {
            doWork();
        }
	} else {
	    if (creep.room == room2) {
	        creep.say('Doot');
            creep.moveTo(33, 0);
        } else {
            creep.moveTo(availableEnergy[availableEnergy.length - 1]);
            availableEnergy[availableEnergy.length - 1].transferEnergy(creep);
        }
	}
	
	function doWork() {
        var structuresNeedsRepair = [];
        creep.room.find(FIND_STRUCTURES, {
            filter: function(i) {
                var repairTo = 4000;
                if (i.hitsMax > 1 && i.hitsMax > repairTo && i.hits < repairTo) {
                    // Beware spawn being pushed to Array#0
                    structuresNeedsRepair.push(i);
                }
            }
        });

        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (structuresNeedsRepair.length) {
            creep.moveTo(structuresNeedsRepair[0]);
            creep.repair(structuresNeedsRepair[0]);
        } else if (constructionSites.length) {
		    creep.moveTo(constructionSites[0]);
		    creep.build(constructionSites[0]);
		} else {
		    creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
		}
    };
};
