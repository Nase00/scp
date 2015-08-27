module.exports = function(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
	if (targets.length) {
		creep.moveTo(targets[0]);
		creep.rangedAttack(targets[0]);
	} else {
	    creep.moveTo(28, 20)
	}
}
