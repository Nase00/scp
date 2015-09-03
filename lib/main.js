// Load queries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesEnergyStorage = require('./queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

var _queriesEnergySources = require('./queries/energy-sources');

var _queriesEnergySources2 = _interopRequireDefault(_queriesEnergySources);

// Load prototypes

var _tasks = require('./tasks');

// Load room subroutines

var _rooms = require('./rooms');

exports['default'] = function () {
  // Clean memory
  for (var creep in Memory.creeps) {
    if (!Game.creeps[creep]) {
      delete Memory.creeps[creep];
    }
  }

  // Execute queries
  (0, _queriesEnergyStorage2['default'])();
  (0, _queriesEnergySources2['default'])();

  // Execute prototypes
  (0, _tasks.defend)();
  (0, _tasks.collect)();
  (0, _tasks.recharge)();
  (0, _tasks.upkeep)();
  (0, _tasks.spawn)();
  (0, _tasks.war)();

  // Execute room subroutines
  (0, _rooms.W17N4)();
  (0, _rooms.W17N3)();

  // Execute creep tasks
  for (var _name in Game.creeps) {
    var creep = Game.creeps[_name];
    switch (creep.memory.role) {
      case 'harvester':
        creep.collect();
        break;
      // case 'forager':
      //   creep.forage();
      //   break;
      // case 'worker':
      //   if (creep.carry.energy < creep.carryCapacity) {
      //     creep.upkeep();
      //   } else {
      //     creep.recharge();   
      //   }
      //   break;
      // case 'guard':
      //   creep.defend();
      //   break;
      // case 'warrior':
      //   creep.war();
      //   break;
      // default:
      //   console.log('Creep lacks recognized role!');
    }
  }
};

module.exports = exports['default'];