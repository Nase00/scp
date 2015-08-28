var build = function(creep) {
    function doWork() {
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
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
        }
    }
    
    function construct() {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
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
        doWork();
    }
};

var spawn = function(spawn) {
    var currentTime = Date.now();
    var builderName = "Builder" + currentTime;
    spawn.createCreep([CARRY, WORK, WORK, MOVE], builderName, {role: 'builder', born: currentTime});
};

module.exports = {
    build: build,
    spawn: spawn
};
