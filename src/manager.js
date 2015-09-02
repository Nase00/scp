var manage = function(creep) {
    
};

var spawn = function(spawn) {
    console.log("Spawning a manager.");
    var currentTime = Date.now();
    var name = "Manager" + currentTime;
    spawn.createCreep([RANGED_ATTACK, MOVE], name, {role: 'guard', born: currentTime});  
};

module.exports = {
    manage: manage,
    spawn: spawn
};
