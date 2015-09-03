module.exports = function() {
    var config = require('config');
    
    var dHarvester = require('duna-harvester');
    var dBuilder = require('duna-builder');
    var dGuard = require('duna-guard');
    
    var dHarvesters = 0;
    var dBuilders = 0;
    var dGuards = 0;
    
    for (var name in Game.creeps) {
    	var creep = Game.creeps[name];
        
        if (creep.memory.role == 'd_harvester') {
            dHarvester.harvest(creep, config.energyStores);
            dHarvesters++;
    	} else if (creep.memory.role == 'd_builder') {
            dBuilder.build(creep, config.availableEnergy);
            dBuilders++;
    	} else if (creep.memory.role == 'd_guard') {
        	dGuard.guard(creep);
        	dGuards++;
        }
    }

    if (dHarvesters < config.duna.units.harvesters) {
        dHarvester.spawn(config.spawn);
    } else if (builders < config.duna.units.builders) {
        dBuilder.spawn(config.spawn);
    } else if (guards < config.duna.units.guards) {
        dGuard.spawn(config.spawn);
    }
}();
