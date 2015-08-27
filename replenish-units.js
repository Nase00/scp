module.exports = function() {
    var unitAmounts = require('unit-amounts');
    
    var harvester = require('harvest');
    var scout = require('scout');
    var builder = require('builder');
    var manage = require('manage');
    var guard = require('guard');
    var warrior = require('warrior');
    
    var harvesters = 0;
    var scouts = 0;
    var builders = 0;
    var managers = 0;
    var guards = 0;
    var warriors = 0;
    
    for (var name in Game.creeps) {
    	var creep = Game.creeps[name];
    
        if (creep.memory.role == 'harvester') {
            harvester(creep);
            harvesters++;
        } else if (creep.memory.role == 'scout') {
            scout(creep);
            scouts++;
    	} else if (creep.memory.role == 'builder') {
            builder(creep);
            builders++;
    	} else if (creep.memory.role == 'manager') {
    	    manage(creep);
    	    managers++;
    	} else if (creep.memory.role == 'guard') {
        	guard(creep);
        	guards++;
        } else if (creep.memory.role == 'warrior') {
        	warrior(creep);
        	warriors++;
        }
    }
    
    var randID = Math.random() * 100 + "";
    
    if (harvesters < unitAmounts.harvesters) {
        console.log("Spawning a harvester.");
        var harvesterName = "Harvester" + harvesters + randID;
        Game.spawns.Spawn1.createCreep([CARRY, WORK, MOVE], harvesterName, {role: 'harvester', born: Date.now()});
    } else if (scouts < unitAmounts.scouts) {
        console.log("Spawning a scout.");
        var scoutName = "Scout" + scouts + randID;
        Game.spawns.Spawn1.createCreep([CARRY, CARRY, WORK, MOVE, MOVE], scoutName, {role: 'scout', born: Date.now()});
    } else if (builders < unitAmounts.builders) {
        var builderName = "Builder" + builders + randID;
        Game.spawns.Spawn1.createCreep([CARRY, WORK, WORK, MOVE], builderName, {role: 'builder', born: Date.now()});
    // } else if (managers < unitAmounts.managers) {
    //     var managerName = "Manager" + managers + randID;
    //     // TODO: Build energy managers
    } else if (guards < unitAmounts.guards) {
        console.log("Spawning a guard.")
        var guardName = "Guard" + guards + randID;
        Game.spawns.Spawn1.createCreep([RANGED_ATTACK, MOVE], guardName, {role: 'guard', born: Date.now()});
    } else if (warriors < unitAmounts.warriors) {
        console.log('Spawning a warrior.');
        var warriorName = "Warrior" + warriors + randID;
        Game.spawns.Spawn1.createCreep([RANGED_ATTACK, MOVE], warriorName, {role: 'warrior', born: Date.now()});
    }
}();
