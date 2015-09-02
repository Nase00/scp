"use strict";

var manage = function manage(creep) {};

var spawn = function spawn(_spawn) {
    console.log("Spawning a manager.");
    var currentTime = Date.now();
    var name = "Manager" + currentTime;
    _spawn.createCreep([RANGED_ATTACK, MOVE], name, { role: 'guard', born: currentTime });
};

module.exports = {
    manage: manage,
    spawn: spawn
};