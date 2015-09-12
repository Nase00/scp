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
      case 'guard':
        creep.defend();
        break;
      case 'warrior':
        creep.war();
        break;
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
},{"./memory":3,"./queries/energy-sources":6,"./queries/energy-storage":7,"./rooms":10,"./tasks":15}],3:[function(require,module,exports){
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
    Memory.rooms[room] = _rooms2['default'][room];
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
},{"./queries":8,"./rooms":10}],4:[function(require,module,exports){
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
          case 'rampart':
            if (structure.hits < _rooms2['default'][room].rampartHealth) {
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
},{"../rooms":10}],6:[function(require,module,exports){
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
},{"../rooms":10}],7:[function(require,module,exports){
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
          if (structure.energyCapacity > 0 && structure.energy < structure.energyCapacity) {
            Memory.rooms[room].stores.energyStores.push(structure.id);
          }
          if (structure.energy >= 50) {
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
},{"../rooms":10}],8:[function(require,module,exports){
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

var roomName = 'W16N3';

exports['default'] = {
  name: roomName,
  wallHealth: 10000,
  rampartHealth: 100000,
  roadHealth: 500,
  spawnIds: ['55f3c4395101c33d1555096c'],
  links: {
    transmitterIds: [],
    receiverId: ''
  },
  creepCount: {
    harvester: 8,
    worker: 3,
    // W16N3_forager: 1,
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
          name: 'W16N3'
        },
        source: _config.currentTime % 2
      }
    },
    // W16N3_forager: {
    //   bodyParts: [CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    //   name: 'Forager' + currentTime,
    //   memory: {
    //     role: 'forager',
    //     born: currentTime,
    //     source: currentTime % 2,
    //     origin: {
    //       name: 'W17N3',
    //       exit: {
    //         x: 31,
    //         y: 0
    //       }
    //     },
    //     destination: {
    //       name: 'W16N3',
    //       exit: {
    //         x: 31,
    //         y: 49
    //       },
    //       sourceId: '55c34a6b5be41a0a6e80bf88'
    //     },
    //     passThroughRoomIndex: 0
    //   }
    // },
    worker: {
      bodyParts: [CARRY, WORK, MOVE],
      name: 'Worker' + _config.currentTime,
      memory: {
        role: 'worker',
        born: _config.currentTime,
        origin: {
          name: 'W16N3'
        },
        source: _config.currentTime % 2,
        willRepair: _config.currentTime % 2
      }
    },
    guard: {
      bodyParts: [ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE],
      name: 'Guard' + _config.currentTime,
      memory: {
        role: 'guard',
        born: _config.currentTime,
        origin: {
          name: 'W16N3'
        },
        source: 2,
        idlePos: {
          x: 27,
          y: 30
        }
      }
    },
    warrior: {
      bodyParts: [ATTACK, TOUGH, TOUGH, MOVE, MOVE],
      name: 'Warrior' + _config.currentTime,
      memory: {
        role: 'warrior',
        born: _config.currentTime,
        origin: {
          name: 'W16N3'
        },
        source: _config.currentTime % 2,
        idlePos: {
          x: 28,
          y: 29
        }
      }
    }
  }
};
module.exports = exports['default'];
},{"../../config":1}],10:[function(require,module,exports){
// import W17N3 from './W17N3';
// import W17N4 from './W17N4';
// import W18N4 from './W18N4';
// import W2N3 from './W2N3';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _W16N3 = require('./W16N3');

var _W16N32 = _interopRequireDefault(_W16N3);

exports['default'] = {
  // W17N3,
  // W17N4,
  // W18N4
  // W2N3
  W16N3: _W16N32['default']
};
module.exports = exports['default'];
},{"./W16N3":9}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.defend = function (post) {
    var targets = this.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      this.moveTo(targets[0]);
      this.rangedAttack(targets[0]);
    } else {
      this.moveTo(this.memory.idlePos.x || 27, this.memory.idlePos.y || 24);
    }
  };
};

module.exports = exports["default"];
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.forage = function () {
    var fullOfEnergy = this.carry.energy === this.carryCapacity;

    switch (this.room.name) {
      case this.memory.origin.name:
        if (fullOfEnergy) {
          var energyStores = Memory.rooms[this.room.name].stores.energyStores;
          var energyStore = Game.getObjectById(energyStores[0]);
          this.moveTo(energyStore);
          this.transferEnergy(energyStore);
        } else {
          this.moveTo(this.memory.origin.exit.x, this.memory.origin.exit.y);
        }
        this.memory.passThroughRoomIndex = 0;
        break;
      case this.memory.destination.name:
        if (fullOfEnergy) {
          this.moveTo(this.memory.destination.exit.x, this.memory.destination.exit.y);
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
},{}],15:[function(require,module,exports){
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
},{"./collect":11,"./death-knell":12,"./defend":13,"./forage":14,"./link-transfers":16,"./recharge":17,"./spawn":18,"./sustain":19,"./upkeep":20,"./war":21,"./work":22}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {};

module.exports = exports["default"];
},{}],17:[function(require,module,exports){
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
      }
    }
  };
};

module.exports = exports['default'];
},{"../queries/energy-storage":7}],18:[function(require,module,exports){
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
},{"../rooms":10}],19:[function(require,module,exports){
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
      // console.log(creepType, Memory.rooms[room].actualCreepCount[creepType], rooms[room].creepCount[creepType])
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
          return;
        }
        // } else {
        //   console.log('Waiting for available spawner in ' + rooms[room].name + ' to spawn ' + creepType);
        // }
      }
    }
  }
};

module.exports = exports['default'];
},{"../rooms":10}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.war = function () {
    var targets = this.room.find(FIND_HOSTILE_CREEPS);

    if (targets.length) {
      this.moveTo(Game.getObjectById('55f3999b08744ee2099ce6d4'));
      this.rangedAttack(Game.getObjectById('55f3999b08744ee2099ce6d4'));
    } else {
      if (this.room.name !== 'W17N4') {
        this.moveTo(49, 39);
      } else {
        if (targets.length) {
          this.rangedAttack(targets[0]);
        }
        //
        // if (this.memory.source) {
        //   // Block east entrance
        this.moveTo(43, 11);
        // } else {
        //   // Block south entrance
        //   this.moveTo(32, 47);
        // }

        // this.moveTo(this.room.controller);
        // this.attack(this.room.controller);
        // this.claimController(this.room.controller);
      }
    }
  };
};

module.exports = exports['default'];
},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.work = function () {
    var fullEnergyStores = Memory.rooms[this.room.name].stores.fullEnergyStores;
    if (this.carry.energy === 0 && fullEnergyStores.length) {
      this.recharge();
    } else if (this.carry.energy === this.carryCapacity || this.carry.energy > 0 && fullEnergyStores.length) {
      this.upkeep();
    } else {
      var source = Game.getObjectById(Memory.rooms[this.room.name].sources[this.memory.source || 0]);
      this.moveTo(source);
      this.harvest(source);
    }
  };
};

module.exports = exports["default"];
},{}],23:[function(require,module,exports){
var main = require('./lib/main');

},{"./lib/main":2}]},{},[23]);
