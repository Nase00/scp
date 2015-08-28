module.exports = function() {
    var config = require('config');
    
    var harvester = require('harvester');
    var scout = require('scout');
    var builder = require('builder');
    var manager = require('manager');
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
            harvester.harvest(creep, config.energyStores);
            harvesters++;
        } else if (creep.memory.role == 'scout') {
            scout.scout(creep, config.energyStores);
            scouts++;
        } else if (creep.memory.role == 'builder') {
            builder.build(creep);
            builders++;
        } else if (creep.memory.role == 'manager') {
            manager.manage(creep);
            managers++;
        } else if (creep.memory.role == 'guard') {
            guard.guard(creep);
            guards++;
        } else if (creep.memory.role == 'warrior') {
            warrior.warrior(creep);
            warriors++;
        }
    }
    
    var randID = Math.random() * 100 + "";
    
    if (harvesters < config.units.harvesters) {
        harvester.spawn(config.spawn);
    } else if (scouts < config.units.scouts) {
        scout.spawn(config.spawn);
    } else if (builders < config.units.builders) {
        builder.spawn(config.spawn);
    // } else if (managers < config.units.managers) {
    //     var managerName = "Manager" + managers + randID;
    //     // TODO: Build energy managers
    } else if (guards < config.units.guards) {
       guard.spawn(config.spawn);
    } else if (warriors < config.units.warriors) {
        warrior.warrior(config.spawn);
    }
}();
