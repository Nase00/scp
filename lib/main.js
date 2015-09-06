// for(var i in Memory.creeps) {
//     if (!Game.creeps[i]) {
//         delete Memory.creeps[i];
//     }
// }

// require('custom-script');
// require('self-sustain');

// Load memory primer
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _memory = require('./memory');

var _memory2 = _interopRequireDefault(_memory);

// Load queries

var _queriesEnergyStorage = require('./queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

var _queriesEnergySources = require('./queries/energy-sources');

var _queriesEnergySources2 = _interopRequireDefault(_queriesEnergySources);

// Load prototypes

var _tasks = require('./tasks');

// Load room subroutines

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = (function () {
  console.log('test');
  // Clean memory
  for (var creep in Memory.creeps) {
    if (!Game.creeps[creep]) {
      delete Memory.creeps[creep];
    }
  }

  (function () {
    // Prime memory
    (0, _memory2['default'])();

    // Execute queries
    (0, _queriesEnergyStorage2['default'])();
    (0, _queriesEnergySources2['default'])();

    // Execute prototypes
    (0, _tasks.defend)();
    (0, _tasks.collect)();
    (0, _tasks.work)();
    (0, _tasks.recharge)();
    (0, _tasks.upkeep)();
    (0, _tasks.spawn)();
    (0, _tasks.war)();

    // Execute sustinence
    for (var room in _rooms2['default']) {
      (0, _tasks.sustain)(room);
    }
  })();

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
      case 'builder':
        creep.work();
        break;
      // case 'guard':
      //   creep.defend();
      //   break;
      // case 'warrior':
      //   creep.war();
      //   break;
      default:
        console.log(creep + ' with role ' + creep.memory.role + ' has no task!');
    }
  }
})();

module.exports = exports['default'];