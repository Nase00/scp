module.exports = function() {
    var config = require('config');
    
    var harvester = require('harvester');
    var scout = require('scout');
    var explorer = require('explorer');
    var builder = require('builder');
    var manager = require('manager');
    var guard = require('guard');
    var warrior = require('warrior');
    
    var dHarvester = require('d_harvester');
    
    var harvesters = 0;
    var scouts = 0;
    var explorers = 0;
    var builders = 0;
    var managers = 0;
    var guards = 0;
    var warriors = 0;
    
    var dHarvesters = 0;
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.pos == '[room W17N4 pos 37,19]') {
            creep.moveTo(36, 18);
        }
        var customScript = require('custom-script');
        if (creep.memory.role == 'harvester') {
            harvester.harvest(creep, config.energyStores);
            harvesters++;
        } else if (creep.memory.role == 'scout') {
            scout.scout(creep, config.energyStores);
            scouts++;
        } else if (creep.memory.role == 'explorer') {
            explorer.explore(creep, config.energyStores);
            explorers++;
        } else if (creep.memory.role == 'builder') {
            builder.build(creep, config.availableEnergy);
            builders++;
        } else if (creep.memory.role == 'd_builder') {
            customScript(creep, config.availableEnergy);
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
    
    if (creep.memory.role == 'd_hharvester') {
        dHarvester.harvest(creep, Game.spawns.Duna);
        dHarvesters++;
    }

    if (harvesters < config.units.harvesters) {
        harvester.spawn(config.spawn);
    } else if (scouts < config.units.scouts) {
        scout.spawn(config.spawn);
    } else if (explorers < config.units.explorers) {
        explorer.spawn(config.spawn, config.rooms.room1);
    } else if (builders < config.units.builders) {
        builder.spawn(config.spawn);
    // } else if (managers < config.units.managers) {
    //     var managerName = "Manager" + managers + randID;
    //     // TODO: Build energy managers
    } else if (guards < config.units.guards) {
        guard.spawn(config.spawn);
    } else if (warriors < config.units.warriors) {
        warrior.spawn(config.spawn);
    }
    
    if (dHarvesters < config.units.dHarvesters) {
        dHarvester.spawn(Game.spawns.Duna);
    }
    
    // for(var i in Memory.creeps) {
    //     if (!Game.creeps[i]) {
    //         delete Memory.creeps[i];
    //     }
    // }
}();
