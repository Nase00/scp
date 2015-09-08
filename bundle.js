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
    (0, _tasks.forage)();
    (0, _tasks.work)();
    (0, _tasks.recharge)();
    (0, _tasks.upkeep)();
    (0, _tasks.spawn)();
    (0, _tasks.war)();
    (0, _tasks.deathKnell)();

    // Execute structure tasks
    (0, _tasks.sustain)();
    (0, _tasks.linkTransfers)();
  })();

  // Execute creep tasks
  for (var _name in Game.creeps) {
    var creep = Game.creeps[_name];
    switch (creep.memory.role) {
      case 'harvester':
      case 'd_harvester':
        // legacy
        creep.collect();
        break;
      case 'forager':
      case 'scout':
        // legacy
        creep.forage();
        break;
      case 'worker':
      case 'builder': // legacy
      case 'd_builder':
        // legacy
        creep.work();
        break;
      // case 'guard':
      //   creep.defend();
      //   break;
      // case 'warrior':
      //   creep.war();
      //   break;
      default:
      // console.log(creep + ' with role ' + creep.memory.role + ' has no task!');
    }

    // Subtract creep from count immediately prior to death
    if (creep.ticksToLive === 1) {
      creep.deathKnell();
    }
  }
})();

module.exports = exports['default'];
},{"./memory":3,"./queries/energy-sources":4,"./queries/energy-storage":5,"./rooms":9,"./tasks":14}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  for (var room in _rooms2['default']) {
    // Flush
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Memory.rooms[room].sources.length = 0;
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Static
    Memory.rooms[room].links = _rooms2['default'][room].links;
    Memory.rooms[room].creepCount = _rooms2['default'][room].creepCount;

    // Persistent
    Memory.rooms[room].actualCreepCount = {};
  }
};

module.exports = exports['default'];
},{"./rooms":9}],4:[function(require,module,exports){
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
},{"../rooms":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    // Transmitter link needs to be at absolute beginning of the array
    if (Memory.rooms[room].links.transmitterIds.length) {
      for (var transmitterId in _rooms2['default'][room].links.transmitterIds) {
        var transmitter = Game.getObjectById(_rooms2['default'][room].links.transmitterIds[transmitterId]);
        if (transmitter.energy !== transmitter.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(_rooms2['default'][room].links.transmitterIds[transmitterId]);
        }
      }
    }

    var spawns = [];
    var extensions = [];
    var links = [];
    var storages = [];

    if (Game.rooms[room]) {
      Game.rooms[room].find(FIND_STRUCTURES, {
        filter: function filter(structure) {
          if (structure.energyCapacity > 0 && structure.energy < structure.energyCapacity) {
            Memory.rooms[room].stores.energyStores.push(structure.id);
          } else {
            switch (structure.structureType) {
              case 'spawn':
                spawns.push(structure.id);
                break;
              case 'extension':
                extensions.push(structure.id);
                break;
              case 'link':
                links.push(structure.id);
                break;
              case 'storage':
                storages.push(structure.id);
                break;
            }
          }
        }
      });
    } else {
      console.log('GAME OBJECT FORGOT ABOUT A ROOM!'); // Bug?
    }

    Memory.rooms[room].stores.fullEnergyStores = spawns.concat(extensions, storages);

    // Receiver link needs to be at absolute end of the array
    if (_rooms2['default'][room].links.receiverId.length && Game.getObjectById(_rooms2['default'][room].links.receiverId).energy > 0) {
      Memory.rooms[room].stores.fullEnergyStores.push(_rooms2['default'][room].links.receiverId);
    }
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];
},{"../rooms":9}],6:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W17N3';

exports['default'] = {
  name: roomName,
  wallhealth: 4000,
  roadHealth: 500,
  spawnIds: ['55e5fc58d1239485043987a0'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvesters: 5,
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    // forager: {
    //   bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    //   name: 'forager',
    //   memory: {
    //     role: 'forager' + currentTime,
    //     born: currentTime,
    // origin: {
    //   name: 'W17N4'
    // },
    //     source: currentTime % 2
    //   }
    // },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
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
        origin: {
          name: 'W17N4'
        },
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];
},{"../../config":1}],7:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W17N4';

exports['default'] = {
  name: roomName,
  wallHealth: 40000,
  roadHealth: 2000,
  spawnIds: ['55defc603a94852a6ddf657e'],
  links: {
    transmitterIds: ['55e4d627002b197809962d40', '55ebd31b30de2f106e550700'],
    receiverId: '55ea5371ec54fa140a98012e'
  },
  creepCount: {
    harvesters: 9,
    foragers: 8,
    builders: 6,
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    W18N4_forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        origin: {
          name: 'W17N4',
          exit: '0, 41'
        },
        destination: {
          name: 'W18N4',
          exit: '49, 40',
          sourceId: '55c34a6b5be41a0a6e80badb'
        },
        passThroughRoomIndex: 0
      }
    },
    W17N3_forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'forager',
      memory: {
        role: 'forager' + _config.currentTime,
        born: _config.currentTime,
        source: _config.currentTime % 2,
        origin: {
          name: 'W17N4',
          exit: '31, 49'
        },
        destination: {
          name: 'W17N3',
          exit: '31, 0',
          sourceId: '55c34a6b5be41a0a6e80c3cc'
        },
        passThroughRoomIndex: 0
      }
    },
    worker: {
      bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
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
        origin: {
          name: 'W17N4'
        },
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];
},{"../../config":1}],8:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W18N4';

exports['default'] = {
  name: roomName,
  wallHealth: 500,
  roadHealth: 500,
  spawnIds: [],

  links: {
    transmitterIds: [],
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
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
        origin: {
          name: 'W17N4'
        },
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
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2,
        idlePos: '28, 29'
      }
    }
  }
};
module.exports = exports['default'];
},{"../../config":1}],9:[function(require,module,exports){
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
},{"./W17N3":6,"./W17N4":7,"./W18N4":8}],10:[function(require,module,exports){
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
      var energyStore = Game.getObjectById(Memory.rooms[this.room.name].stores.energyStores[0]);

      this.moveTo(energyStore);
      this.transferEnergy(energyStore);
    }
  };
};

module.exports = exports['default'];
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.deathKnell = function () {
    console.log(this.name + ' is about to expire.');
    Memory.rooms[this.memory.origin.name].actualCreepCount[creepType]--;
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

exports['default'] = function () {
  Creep.prototype.forage = function () {
    this.say('F+');

    var fullOfEnergy = this.carry.energy === this.carryCapacity;

    switch (this.room.name) {
      case this.memory.origin.name:
        if (fullOfEnergy) {
          var energyStores = Memory.rooms[this.room.name].stores.energyStores;

          this.moveTo(energyStores[0]);
          this.transferEnergy(energyStores[0]);
        } else {
          this.moveTo(this.memory.origin.exit);
        }
        this.memory.passThroughRoomIndex = 0;
        break;
      case this.memory.destination.name:
        if (fullOfEnergy) {
          this.moveTo(this.memory.destination.exit);
        } else {
          var source = Game.getObjectById(this.memory.destination.sourceId);
          this.moveTo(source);
          this.harvest(source);
        }
        this.memory.passThroughRoomIndex = 0;
        break;
      default:
        var direction = fullOfEnergy ? 'toOrigin' : 'toDestination';
        this.moveTo(this.memory.passThroughRooms[this.memory.passThroughRoomIndex][direction]);
        direct === 'toOrigin' ? this.memory.passThroughRoomIndex-- : this.memory.passThroughRoomIndex++;
    }
  };
};

module.exports = exports['default'];
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _defend = require('./defend');

var _defend2 = _interopRequireDefault(_defend);

var _collect = require('./collect');

var _collect2 = _interopRequireDefault(_collect);

var _forage = require('./forage');

var _forage2 = _interopRequireDefault(_forage);

var _work = require('./work');

var _work2 = _interopRequireDefault(_work);

var _recharge = require('./recharge');

var _recharge2 = _interopRequireDefault(_recharge);

var _upkeep = require('./upkeep');

var _upkeep2 = _interopRequireDefault(_upkeep);

var _war = require('./war');

var _war2 = _interopRequireDefault(_war);

var _deathKnell = require('./death-knell');

var _deathKnell2 = _interopRequireDefault(_deathKnell);

var _spawn = require('./spawn');

var _spawn2 = _interopRequireDefault(_spawn);

var _sustain = require('./sustain');

var _sustain2 = _interopRequireDefault(_sustain);

var _linkTransfers = require('./link-transfers');

var _linkTransfers2 = _interopRequireDefault(_linkTransfers);

exports.defend = _defend2['default'];
exports.collect = _collect2['default'];
exports.forage = _forage2['default'];
exports.work = _work2['default'];
exports.recharge = _recharge2['default'];
exports.upkeep = _upkeep2['default'];
exports.war = _war2['default'];
exports.deathKnell = _deathKnell2['default'];
exports.spawn = _spawn2['default'];
exports.sustain = _sustain2['default'];
exports.linkTransfers = _linkTransfers2['default'];
},{"./collect":10,"./death-knell":11,"./defend":12,"./forage":13,"./link-transfers":15,"./recharge":16,"./spawn":17,"./sustain":18,"./upkeep":19,"./war":20,"./work":21}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {};

module.exports = exports["default"];
},{}],16:[function(require,module,exports){
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
},{"../queries/energy-storage":5}],17:[function(require,module,exports){
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
    console.log(this.createCreep(creep.bodyParts, creep.name, creep.memory));
    Memory.rooms[this.room].actualCreepCount[creepType]++;
  };
};

module.exports = exports['default'];
},{"../rooms":9}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  for (var room in _rooms2['default']) {
    for (var creepType in _rooms2['default'][room].creepCount) {
      console.log(Memory.rooms[room].actualCreepCount[creepType], _rooms2['default'][room].creepCount[creepType]);
      if (Memory.rooms[room].actualCreepCount[creepType] < _rooms2['default'][room].creepCount[creepType]) {
        var idleSpawns = [];
        for (var spawnId in Memory.rooms[room].spawnIds) {
          var spawn = Game.getObjectById(spawnId);
          if (!spawn.spawning) {
            idleSpawns.push(spawn);
          }
        };

        console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][room].name);
        idleSpawn[0].spawn(creepType);
      }
    }
  }
};

module.exports = exports['default'];
},{"../rooms":9}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.work = function () {
    if (this.carry.energy === 0) {
      this.recharge();
    } else {
      this.upkeep();
    }
  };
};

module.exports = exports["default"];
},{}],22:[function(require,module,exports){
var main = require('./lib/main');

},{"./lib/main":2}]},{},[22]);
