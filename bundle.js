(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var currentTime = Date.now();
exports.currentTime = currentTime;
},{}],2:[function(require,module,exports){
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
},{"./memory":3,"./queries/energy-sources":4,"./queries/energy-storage":5,"./rooms":10,"./tasks":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  for (var room in _rooms2['default']) {
    Memory.rooms[room].structuresNeedingRepair = [];
    Memory.rooms[room].structuresNeedingConstruction = [];
    Memory.rooms[room].sources = [];
    Memory.rooms[room].stores = {
      energyStores: [],
      fullEnergyStores: []
    };
    Memory.rooms[room].creepCount = {};
  }
};

module.exports = exports['default'];
},{"./rooms":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].sources.length = 0;
    Game.rooms[room].find(FIND_SOURCES, {
      filter: function filter(source) {
        Memory.rooms[room].sources.push(source.id);
      }
    });
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];
},{"../rooms":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Transmitter link needs to be at absolute beginning of the array
    if (_rooms2['default'][room].links.transmitters.length) {
      for (transmitter in _rooms2['default'][room].links.transmitters) {
        Memory.rooms[room].stores.fullEnergyStores.push(transmitter);
      }
    }

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: function filter(structure) {
        var energyStorageTypes = ['extension', 'spawn'];
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure.id);
        } else if (energyStorageTypes.indexOf(structure.structureType) !== -1) {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
        // Storage needs to be near the end of the array
        if (structure.structureType === 'storage') {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
      }
    });

    // Receiver link needs to be at absolute end of the array
    if (_rooms2['default'][room].links.receiverId.length) {
      Memory.rooms[room].stores.fullEnergyStores.push(_rooms2['default'][room].links.receiverId);
    }
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];
},{"../rooms":10}],6:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

exports['default'] = {
  name: 'W17N3',
  defense: 4000,
  links: {
    transmitters: [],
    receiverId: ''
  },
  creepCount: {
    harvesters: 4,
    foragers: 0,
    builders: 4,
    guards: 1,
    warriors: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'harvester',
      memory: {
        role: 'harvester' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    forager: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, MOVE],
      name: 'Guard' + _config.currentTime,
      memory: {
        role: 'Guard' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Warrior' + _config.currentTime,
      memory: {
        role: 'Warrior' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];
},{"../../config":1}],7:[function(require,module,exports){
"use strict";
},{}],8:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../../config');

var _foragerPaths = require('./forager-paths');

var _foragerPaths2 = _interopRequireDefault(_foragerPaths);

var roomName = 'W17N4';

exports['default'] = {
  name: roomName,
  defense: 6000,
  links: {
    transmitters: ['55e4d627002b197809962d40'],
    receiverId: '55ea5371ec54fa140a98012e'
  },
  creepCount: {
    harvesters: 6,
    foragers: 8,
    builders: 11,
    guards: 9,
    warriors: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'harvester',
      memory: {
        role: 'harvester' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        path: _foragerPaths2['default']
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE],
      name: 'Guard' + _config.currentTime,
      memory: {
        role: 'Guard' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Warrior' + _config.currentTime,
      memory: {
        role: 'Warrior' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];
},{"../../config":1,"./forager-paths":7}],9:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = {
  name: 'W18N4',
  defense: 500,
  links: {
    transmitter: [],
    receiverId: ''
  },
  creepCount: {
    harvesters: 2,
    foragers: 0,
    builders: 1,
    guards: 0,
    warriors: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'harvester',
      memory: {
        role: 'harvester' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Guard' + _config.currentTime,
      memory: {
        role: 'Guard' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    },
    warrior: {
      bodyParts: [RANGED_ATTACK, TOUGH, MOVE],
      name: 'Warrior' + _config.currentTime,
      memory: {
        role: 'Warrior' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];
},{"../config":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _W17N3 = require('./W17N3');

var _W17N32 = _interopRequireDefault(_W17N3);

var _W17N4 = require('./W17N4');

var _W17N42 = _interopRequireDefault(_W17N4);

var _W18N4 = require('./W18N4');

var _W18N42 = _interopRequireDefault(_W18N4);

exports['default'] = {
  W17N3: _W17N32['default'],
  W17N4: _W17N42['default'],
  W18N4: _W18N42['default']
};
module.exports = exports['default'];
},{"./W17N3":6,"./W17N4":8,"./W18N4":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.collect = function () {
    this.say('C+');

    if (this.carry.energy < this.carryCapacity) {
      if (Memory.rooms[this.room.name].sources.length) {
        var source = Game.getObjectById(Memory.rooms[this.room.name].sources[this.memory.source || 0]);

        this.moveTo(source);
        this.harvest(source);
      } else {
        console.log('No available sources for ' + this.name + 'to harvest.');
      }
    } else {
      var energystores = Memory.rooms[this.room.name].stores.energyStores;

      this.moveTo(energystores[0]);
      this.transferEnergy(energystores[0]);
    }
  };
};

module.exports = exports['default'];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.defend = function (post) {
    var targets = this.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      this.moveTo(targets[0]);
      this.rangedAttack(targets[0]);
    } else {
      this.moveTo(this.memory.idlePos || '27, 24');
    }
  };
};

module.exports = exports['default'];
},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _defend = require('./defend');

var _defend2 = _interopRequireDefault(_defend);

var _collect = require('./collect');

var _collect2 = _interopRequireDefault(_collect);

var _work = require('./work');

var _work2 = _interopRequireDefault(_work);

var _recharge = require('./recharge');

var _recharge2 = _interopRequireDefault(_recharge);

var _upkeep = require('./upkeep');

var _upkeep2 = _interopRequireDefault(_upkeep);

var _spawn = require('./spawn');

var _spawn2 = _interopRequireDefault(_spawn);

var _sustain = require('./sustain');

var _sustain2 = _interopRequireDefault(_sustain);

var _war = require('./war');

var _war2 = _interopRequireDefault(_war);

exports.defend = _defend2['default'];
exports.collect = _collect2['default'];
exports.work = _work2['default'];
exports.recharge = _recharge2['default'];
exports.upkeep = _upkeep2['default'];
exports.spawn = _spawn2['default'];
exports.sustain = _sustain2['default'];
exports.war = _war2['default'];
},{"./collect":11,"./defend":12,"./recharge":14,"./spawn":15,"./sustain":16,"./upkeep":17,"./war":18,"./work":19}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesEnergyStorage = require('../queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

exports['default'] = function () {
  Creep.prototype.recharge = function () {
    var fullEnergyStores = Memory.rooms[this.room.name].stores.fullEnergyStores;
    if (fullEnergyStores.length) {
      var source = Game.getObjectById(fullEnergyStores[this.memory.source || fullEnergyStores.length - 1]);

      this.moveTo(source);
      source.transferEnergy(this);
    } else {
      console.log('No available energy for ' + this.name + 'to recharge with');
    }
  };
};

module.exports = exports['default'];
},{"../queries/energy-storage":5}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  Spawn.prototype.spawn = function (creepType) {
    creep = _rooms2['default'][this.room].creepSchema[creepType];
    console.log(creep);
    this.createCreep(creep.bodyParts, creep.name, creep.memory);
    Memory.rooms[this.room].creepCount[creepType]++;
  };
};

module.exports = exports['default'];
},{"../rooms":10}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function (room) {
  for (var _room in _rooms2['default']) {
    for (var creepType in _rooms2['default'][_room].creepCount) {
      if (creepType < _rooms2['default'][_room].creepCount[creepType]) {
        var idleSpawn = this;
        var spawns = Game.getObjectById(Memory.rooms[_room].spawns, {
          filter: function filter(spawn) {
            if (spawn.spawning) {
              idleSpawn = spawn;
              return;
            }
          }
        });
        console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][_room].name);
        idleSpawn.spawn(creepType);
      }
    }
  }
};

module.exports = exports['default'];
},{"../rooms":10}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.upkeep = function () {
    var structureNeedingRepair = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingRepair[this.memory.source || 0]);
    var structureNeedingConstruction = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingConstruction[this.memory.source || 0]);

    if (structureNeedingRepair) {
      this.moveTo(structuresNeedingRepair);
      this.repair(structuresNeedingRepair);
    } else if (structureNeedingConstruction) {
      this.moveTo(structureNeedingConstruction);
      this.build(structureNeedingConstruction);
    } else {
      this.moveTo(this.room.controller);
      this.upgradeController(this.room.controller);
    }
  };
};

module.exports = exports["default"];
},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.war = function (post) {
    var targets = this.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      this.moveTo(targets[0]);
      this.rangedAttack(targets[0]);
    } else {
      this.moveTo(this.memory.idlePos || '27, 24');
    }
  };
};

module.exports = exports['default'];
},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.work = function () {
    if (this.carry.energy < this.carryCapacity) {
      this.recharge();
    } else {
      this.upkeep();
    }
  };
};

module.exports = exports["default"];
},{}],20:[function(require,module,exports){
var main = require('./lib/main');

},{"./lib/main":2}]},{},[20]);
