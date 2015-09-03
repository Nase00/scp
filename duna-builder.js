var build = function(creep, availableEnergy) {
    // if (creep.pos == "[room W17N4 pos 39,20]" || creep.pos == "[room W17N4 pos 40, 20]") {
    //     creep.moveTo(40, 20);
    // } else {
        creep.say('B');
        if (creep.carry.energy <= 1) {
    		creep.moveTo(availableEnergy[availableEnergy.length - 1]);
    		availableEnergy[availableEnergy.length - 1].transferEnergy(creep);
    	} else {
    	    doWork();
    	}
    // }
    
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

var spawn = function(spawn) {
    var currentTime = Date.now();
    var builderName = 'Duna Builder' + currentTime;
    var willRepair = currentTime % 3;
    spawn.createCreep([CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], builderName, {role: 'd_builder', born: currentTime, willRepair: willRepair});
};

module.exports = {
    build: build,
    spawn: spawn
};
