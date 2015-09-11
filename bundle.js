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
  })();

  // Execute creep tasks
  for (var _name in Game.creeps) {
    var creep = Game.creeps[_name];

    Memory.rooms[creep.room.name].actualCreepCount[creep.memory.role]++;

    switch (creep.memory.role) {
      case 'harvester':
      case 'd_harvester':
        // legacy
        creep.collect();
        break;
      case 'forager':
        creep.forage();
        break;
      case 'worker':
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

    // Subtract creep from count immediately prior to death NOTE: may not be necessary
    // if (creep.ticksToLive === 1) {
    //   creep.deathKnell();
    // }
  }

  // Execute structure tasks
  (0, _tasks.sustain)();
  // linkTransfers();
})();

module.exports = exports['default'];
},{"./memory":3,"./queries/energy-sources":6,"./queries/energy-storage":7,"./rooms":12,"./tasks":17}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _queries = require('./queries');

exports['default'] = function () {
  for (var room in _rooms2['default']) {
    // Insert keys if not present
    Memory.rooms[room].structuresNeedingRepair = [];
    Memory.rooms[room].structuresNeedingConstruction = [];
    Memory.rooms[room].sources = [];
    Memory.rooms[room].stores = {
      energyStores: [],
      fullEnergyStores: []
    };

    // Flush values
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Memory.rooms[room].sources.length = 0;
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Static
    Memory.rooms[room].links = _rooms2['default'][room].links;
    Memory.rooms[room].creepCount = _rooms2['default'][room].creepCount;
    Memory.rooms[room].spawnIds = _rooms2['default'][room].spawnIds;
    Memory.rooms[room].creepSchema = _rooms2['default'][room].creepSchema;

    // Persistent
    Memory.rooms[room].actualCreepCount = _.mapValues(_rooms2['default'][room].creepCount, function () {
      return 0;
    });
  }
  (0, _queries.constructionSites)();
  (0, _queries.damagedStructures)();
};

module.exports = exports['default'];
},{"./queries":8,"./rooms":12}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Game.rooms[room].find(FIND_CONSTRUCTION_SITES, {
      filter: function filter(site) {
        Memory.rooms[room].structuresNeedingConstruction.push(site.id);
      }
    });
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];
},{"../rooms":12}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  var _loop = function (room) {
    var roads = [];
    var walls = [];
    var others = [];

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: function filter(structure) {
        if (structure.hitsMax <= 1) {
          return;
        }
        switch (structure.structureType) {
          case 'road':
            if (structure.hits < _rooms2['default'][room].roadHealth) {
              roads.push(structure.id);
            }
            break;
          case 'constructedWall':
            if (structure.hits < _rooms2['default'][room].wallHealth) {
              walls.push(structure.id);
            }
            break;
          case 'extension':
          case 'storage':
          case 'link':
            if (structure.hits < structure.hitsMax) {
              others.push(structure.id);
            }
            break;
          default:
            // others.push(structure.id);
            break;
        }
      }
    });
    Memory.rooms[room].structuresNeedingRepair = [].concat(roads, walls, others);
  };

  for (var room in _rooms2['default']) {
    _loop(room);
  }
};

module.exports = exports['default'];
},{"../rooms":12}],6:[function(require,module,exports){
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
},{"../rooms":12}],7:[function(require,module,exports){
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
        if (transmitter && transmitter.energy !== transmitter.energyCapacity) {
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
          if (structure.energyCapacity > 0 && structure.energy < 50) {
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

    Memory.rooms[room].stores.fullEnergyStores = [].concat(spawns, extensions, storages);

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
},{"../rooms":12}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constructionSites = require('./construction-sites');

var _constructionSites2 = _interopRequireDefault(_constructionSites);

var _damagedStructures = require('./damaged-structures');

var _damagedStructures2 = _interopRequireDefault(_damagedStructures);

exports['default'] = {
  constructionSites: _constructionSites2['default'],
  damagedStructures: _damagedStructures2['default']
};
module.exports = exports['default'];
},{"./construction-sites":4,"./damaged-structures":5}],9:[function(require,module,exports){
// Primary room

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../../config');

var roomName = 'W17N3';

exports['default'] = {
  name: roomName,
  wallHealth: 40000,
  roadHealth: 500,
  spawnIds: ['55f315175101c33d1554fde2'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvester: 4,
    worker: 3,
    guard: 0,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Harvester' + _config.currentTime,
      memory: {
        role: 'harvester',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    // forager: {
    //   bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    //   name: 'Forager' + currentTime,
    //   memory: {
    //     role: 'forager',
    //     born: currentTime,
    // origin: {
    //   name: 'W17N4'
    // },
    //     source: currentTime % 2
    //   }
    // },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Worker' + _config.currentTime,
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
        role: 'guard',
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
        role: 'warrior',
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
},{"../../config":1}],10:[function(require,module,exports){
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
    harvester: 9,
    W18N4_forager: 8,
    W17N3_forager: 8,
    worker: 7,
    guard: 9,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'Harvester' + _config.currentTime,
      memory: {
        role: 'harvester',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    W18N4_forager: {
      bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
      name: 'Forager' + _config.currentTime,
      memory: {
        role: 'forager',
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
      name: 'Forager' + _config.currentTime,
      memory: {
        role: 'forager',
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
      name: 'Worker' + _config.currentTime,
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
        role: 'guard',
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
        role: 'warrior',
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
},{"../../config":1}],11:[function(require,module,exports){
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
    harvester: 0,
    worker: 0,
    guard: 0,
    warrior: 0
  },
  creepSchema: {
    harvester: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Harvester' + _config.currentTime,
      memory: {
        role: 'harvester',
        born: _config.currentTime,
        origin: {
          name: 'W17N4'
        },
        source: _config.currentTime % 2
      }
    },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Worker' + _config.currentTime,
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
        role: 'guard',
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
        role: 'warrior',
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
},{"../../config":1}],12:[function(require,module,exports){
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
  W17N3: _W17N32['default']
  // W17N4,
  // W18N4
};
module.exports = exports['default'];
},{"./W17N3":9,"./W17N4":10,"./W18N4":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.collect = function () {
    this.say('C+');

    if (this.carry.energy < this.carryCapacity) {
      if (Memory.rooms[this.room.name].sources.length) {
        var source = Game.getObjectById(Memory.rooms[this.room.name].sources[0]);
        if (source) {
          this.moveTo(source);
          this.harvest(source);
        } else {
          console.log('Something is wrong, source ' + source + ' is not defined.');
        }
      } else {
        console.log('No available sources for ' + this.name + 'to harvest.');
      }
    } else {
      // if (Memory.rooms[this.room.name].stores.energyStores.length) {
      var energyStore = Game.getObjectById(Memory.rooms[this.room.name].stores.energyStores[0]);
      this.moveTo(energyStore);
      this.transferEnergy(energyStore);
      // } else {
      //   this.upkeep();
      // }
    }
  };
};

module.exports = exports['default'];
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{"./collect":13,"./death-knell":14,"./defend":15,"./forage":16,"./link-transfers":18,"./recharge":19,"./spawn":20,"./sustain":21,"./upkeep":22,"./war":23,"./work":24}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {};

module.exports = exports["default"];
},{}],19:[function(require,module,exports){
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
      var source = Game.getObjectById(fullEnergyStores[fullEnergyStores.length - 1]);

      if (source) {
        this.moveTo(source);
        source.transferEnergy(this);
      } else {
        console.log('No available energy for ' + this.name + ' to recharge with');
      }
    } else {
      console.log('No available energy for ' + this.name + 'to recharge with');
    }
  };
};

module.exports = exports['default'];
},{"../queries/energy-storage":7}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  Spawn.prototype.spawn = function (creepType) {
    var creep = _rooms2['default'][this.room.name].creepSchema[creepType];
    this.createCreep(creep.bodyParts, creep.name, creep.memory);
    Memory.rooms[this.room.name].actualCreepCount[creepType]++;
  };
};

module.exports = exports['default'];
},{"../rooms":12}],21:[function(require,module,exports){
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
      // console.log(Memory.rooms[room].actualCreepCount[creepType], rooms[room].creepCount[creepType])
      if (Memory.rooms[room].actualCreepCount[creepType] < _rooms2['default'][room].creepCount[creepType]) {
        var idleSpawns = [];
        for (var spawnId in Memory.rooms[room].spawnIds) {
          var spawn = Game.getObjectById(Memory.rooms[room].spawnIds[spawnId]);
          if (spawn && !spawn.spawning) {
            idleSpawns.push(spawn);
          }
        };

        if (idleSpawns.length) {
          console.log('Spawning ' + creepType + ' in room ' + _rooms2['default'][room].name);
          idleSpawns[0].spawn(creepType);
        } else {
          console.log('Waiting for available spawner in ' + _rooms2['default'][room].name + ' to spawn ' + creepType);
        }
      }
    }
  }
};

module.exports = exports['default'];
},{"../rooms":12}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.upkeep = function () {
    var structureNeedingRepair = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingRepair[0]);
    var structureNeedingConstruction = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingConstruction[0]);

    if (structureNeedingRepair) {
      this.moveTo(structureNeedingRepair);
      this.repair(structureNeedingRepair);
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
},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
var main = require('./lib/main');

},{"./lib/main":2}]},{},[25]);
