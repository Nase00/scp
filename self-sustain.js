
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
    var dBuilder = require('d_builder');

    var harvesters = 0;
    var scouts = 0;
    var explorers = 0;
    var builders = 0;
    var guards = 0;
    var warriors = 0;

    var dHarvesters = 0;
    var dBuilders = 0;

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.pos == '[room W17N4 pos 37,19]') {
            creep.moveTo(36, 18);
        }

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
        } else if (creep.memory.role == 'd_harvester') {
            dHarvester.harvest(creep, Game.spawns.Duna);
            dHarvesters++;
        } else if (creep.memory.role == 'd_builder') {
            dBuilder.build(creep, Game.spawns.Duna);
            dBuilders++;
        } else if (creep.memory.role == 'guard') {
            guard.guard(creep);
            guards++;
        } else if (creep.memory.role == 'warrior') {
            warrior.warrior(creep);
            warriors++;
        }
    }

    if (harvesters < config.units.harvesters) {
        harvester.spawn(config.spawn);
    } else if (scouts < config.units.scouts) {
        scout.spawn(config.spawn);
    } else if (explorers < config.units.explorers) {
        explorer.spawn(config.spawn, config.rooms.room1);
    } else if (builders < config.units.builders) {
        builder.spawn(config.spawn);
    } else if (guards < config.units.guards) {
        guard.spawn(config.spawn);
    } else if (warriors < config.units.warriors) {
        warrior.spawn(config.spawn);
    }

    if (dHarvesters < config.units.dHarvesters) {
        dHarvester.spawn(Game.spawns.Duna);
    }
}();
