var guard = function(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
	if (targets.length) {
		creep.moveTo(targets[0]);
		creep.rangedAttack(targets[0]);
	} else {
	    creep.moveTo(28, 20)
	}
};

var spawn = function(spawn) {
    console.log("Spawning a guard.");
    var currentTime = Date.now();
    var name = "Guard" + currentTime;
    spawn.createCreep([RANGED_ATTACK, MOVE], name, {role: 'guard', born: currentTime});  
};

module.exports = {
    guard: guard,
    spawn: spawn
};
