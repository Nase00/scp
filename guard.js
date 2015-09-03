var guard = function(creep) {
    var targets = creep.room.find(FIND_HOSTILE_SPAWNS);
    if (targets.length) {
        creep.moveTo(targets[0]);
        creep.rangedAttack(targets[0]);
    } else {
        creep.moveTo(23, 25);
       //creep.moveTo(31, 0);
    }
};

var spawn = function(spawn) {
    console.log('Spawning a guard.');
    var currentTime = Date.now();
    var name = "Guard" + currentTime;
    spawn.createCreep([RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE], name, {role: 'guard', born: currentTime});  
};

module.exports = {
    guard: guard,
    spawn: spawn
};
