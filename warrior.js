var warrior = function(creep) {
    var room1 = '[room W17N4]';
    var room2 = '[room W17N3]';
    var room3 = '[room W18N4]';
    
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    
   if (targets.length) {
        creep.moveTo(targets[0]);
        creep.rangedAttack(targets[0]);
    } else if (creep.room == room1) {
        creep.moveTo(29, 49);
    // } else if (creep.room == room2) {
    //     creep.moveTo(0, 15);
    } else if (creep.room == room2) {
        creep.moveTo(35, 37);
        // claim();
    }
    
    function claim() {
        creep.moveTo(creep.room.controller);
        creep.claimController(creep.room.controller);
        creep.say('C');
        if (creep.claimController(creep.room.controller) == -15) {
            console.log('Global Control Level is not enough.');
        }
    };
};

var spawn = function(spawn) {
    console.log('Spawning a warrior.');
    var currentTime = Date.now();
    var warriorName = 'Warrior' + currentTime;
    spawn.createCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], warriorName, {role: 'warrior', born: currentTime});
};

module.exports = {
    warrior: warrior,
    spawn: spawn
}
