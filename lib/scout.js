"use strict";

var scout = function scout(creep, energyStores) {
    var room1 = "[room W17N4]";
    var room2 = "[room W18N4]";
    // var room3 = "[room W18N4]";

    if (creep.carry.energy < creep.carryCapacity) {
        if (creep.room == room1) {
            creep.moveTo(0, 40);
        } else if (creep.room == room2) {
            extract();
        }
    } else {
        if (creep.room == room2) {
            creep.say("Meep");
            creep.moveTo(49, 39);
        } else {
            deposit();
        }
    }

    function extract() {
        creep.say("Meep");
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }

    function deposit() {
        creep.moveTo(energyStores[0]);
        creep.transferEnergy(energyStores[0]);
    }
};

var spawn = function spawn(_spawn) {
    console.log("Spawning a Scout.");
    var currentTime = Date.now();
    var name = "Scout" + currentTime;
    _spawn.createCreep([CARRY, CARRY, WORK, MOVE, MOVE], name, { role: 'scout', born: currentTime });
};

module.exports = {
    scout: scout,
    spawn: spawn
};