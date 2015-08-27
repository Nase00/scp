module.exports = function(creep) {
    var room1 = "[room W17N5]";
    var room2 = "[room W17N4]";
    var room3 = "[room W18N4]";
    
    var targets = creep.room.find(FIND_HOSTILE_SPAWNS);
    
   if (targets.length) {
        creep.moveTo(targets[0]);
        creep.attack(targets[0]);
    } else if (creep.room == room1) {
        creep.moveTo(25, 49);
    // } else if (creep.room == room2) {
    //     creep.moveTo(0, 15);
    } else if (creep.room == room2) {
        creep.moveTo(6, 22);
        claim();
    }
    
    function claim() {
        creep.claimController(creep.room.controller);
        if (creep.claimController(creep.room.controller) == -15) {
            console.log("Global Control Level is not enough.");
        }
    };
}
