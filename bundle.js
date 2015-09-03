(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rooms = {
  W17N5: "[W17N5]",
  W17N3: "[W17N3]",
  W18N4: "[W18N4]"
};

exports.rooms = rooms;
var spawns = [Game.spawns.Spawn1, Game.spawns.Duna];

exports.spawns = spawns;
var wallHealth = 6000;

exports.wallHealth = wallHealth;
var currentTime = Date.now();

exports.currentTime = currentTime;
var unitTypeConstants = {
  harvester: {
    bodyParts: [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    name: 'harvester',
    memory: {
      role: 'harvester' + currentTime,
      born: currentTime,
      source: currentTime % 2
    }
  },
  worker: {
    bodyParts: [CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    name: 'worker' + currentTime,
    memory: {
      role: '',
      born: currentTime,
      source: currentTime % 2
    }
  },
  guard: {
    bodyParts: [RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE],
    name: '',
    memory: {
      role: '',
      born: currentTime,
      source: currentTime % 2,
      idlePos: "28, 29"
    }
  }
};
exports.unitTypeConstants = unitTypeConstants;
},{}],2:[function(require,module,exports){
// Load prototypes
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

  // Execute prototypes
  (0, _tasks.defend)();
  (0, _tasks.harvest)();
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
        creep.harvest();
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
      default:
        console.log('Creep lacks recognized role!');
    }
  }
};

module.exports = exports['default'];
},{"./rooms":10,"./tasks":13}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (room) {
  return room.find(FIND_CONSTRUCTION_SITES);
};

module.exports = exports["default"];
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

exports['default'] = function (room) {
  var structuresNeedingRepair = [];
  room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      if (structure.hitsMax > 1 && structure.hits < _config2['default']) {
        structuresNeedingRepair.push(i);
      }
    }
  });
  return structuresNeedingRepair;
};

module.exports = exports['default'];
},{"../config":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (room) {
  return room.find(FIND_SOURCES);
};

module.exports = exports["default"];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (room) {
  var stores = {
    energyStores: [],
    fullEnergyStores: []
  };
  room.find(FIND_STRUCTURES, {
    filter: function filter(structure) {
      var energyStorageTypes = ['extension', 'storage', 'spawn'];
      if (structure.energy < structure.energyCapacity) {
        stores.energyStores.push(structure);
      } else if (energyStorageTypes.indexOf(structure.structureType) != -1) {
        stores.fullEnergyStores.push(structure);
      }
    }
  });
  return stores;
};

module.exports = exports['default'];
},{}],7:[function(require,module,exports){
// Secondary room

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tasks = require('../tasks');

var room = "W17N3";

var unitCount = {
  harvesters: 3,
  foragers: 0,
  builders: 3,
  guards: 0,
  warriors: 0
};

exports["default"] = function () {
  (0, _tasks.sustain)(room, unitCount);
};

module.exports = exports["default"];
},{"../tasks":13}],8:[function(require,module,exports){
// Primary room

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tasks = require('../tasks');

var room = "W17N4";

var unitCount = {
  harvesters: 6,
  foragers: 8,
  builders: 11,
  guards: 9,
  warriors: 0
};

exports["default"] = function () {
  (0, _tasks.sustain)(room, unitCount);
};

module.exports = exports["default"];
},{"../tasks":13}],9:[function(require,module,exports){
// Forage room

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tasks = require('../tasks');

var room = "W17N4";

var unitCount = {
  harvesters: 6,
  foragers: 8,
  builders: 11,
  guards: 9,
  warriors: 0
};

exports["default"] = function () {
  // sustain(room, unitCount);
};

module.exports = exports["default"];
},{"../tasks":13}],10:[function(require,module,exports){
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

exports.W17N3 = _W17N32['default'];
exports.W17N4 = _W17N42['default'];
exports.W18N4 = _W18N42['default'];
},{"./W17N3":7,"./W17N4":8,"./W18N4":9}],11:[function(require,module,exports){
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
      this.moveTo(this.memory.idlePos || "27, 24");
    }
  };
};

module.exports = exports["default"];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesEnergyStorage = require('../queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

var _queriesEnergySources = require('../queries/energy-sources');

var _queriesEnergySources2 = _interopRequireDefault(_queriesEnergySources);

exports['default'] = function () {
  Creep.prototype.harvest = function () {
    var source = this.memory.source || 0;
    var sources = (0, _queriesEnergySources2['default'])(this.room);

    if (this.carry.energy < this.carryCapacity) {
      this.moveTo(sources[this.memory.source]);
      this.harvest(sources[this.memory.source]);
    } else {
      var energystores = (0, _queriesEnergyStorage2['default'])(this.room).energyStores;
      this.moveTo(energystores[0]);
      this.transferEnergy(energystores[0]);
    }
  };
};

module.exports = exports['default'];
},{"../queries/energy-sources":5,"../queries/energy-storage":6}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _defend = require('./defend');

var _defend2 = _interopRequireDefault(_defend);

var _harvest = require('./harvest');

var _harvest2 = _interopRequireDefault(_harvest);

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
exports.harvest = _harvest2['default'];
exports.recharge = _recharge2['default'];
exports.upkeep = _upkeep2['default'];
exports.spawn = _spawn2['default'];
exports.sustain = _sustain2['default'];
exports.war = _war2['default'];
},{"./defend":11,"./harvest":12,"./recharge":14,"./spawn":15,"./sustain":16,"./upkeep":17,"./war":18}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesEnergyStorage = require('../queries/energy-storage');

var _queriesEnergyStorage2 = _interopRequireDefault(_queriesEnergyStorage);

exports['default'] = function () {
  Creep.prototype.recharge = function () {
    var source = (0, _queriesEnergyStorage2['default'])(this.room).fullEnergyStores[this.memory.source || energyForRecharging.length - 1];

    creep.moveTo(source);
    source.transferEnergy(creep);
  };
};

module.exports = exports['default'];
},{"../queries/energy-storage":6}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  Spawn.prototype.spawn = function (unitType) {
    this.createCreep(_config.unitTypeConstants.bodyParts[unitType], _config.unitTypeConstants.name[unitType], _config.unitTypeConstants.memory[unitType]);
    Memory.rooms[this.room].unitCount[unitType] += 1;
  };
};

module.exports = exports['default'];
},{"../config":1}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (room, unitCount) {
	for (var creepType in Memory.rooms[room].unitCount) {
		if (creepType < unitCount[creepType]) {
			Game.rooms[room].spawn(creepType);
		}
	}
};

module.exports = exports["default"];
},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesConstructionSites = require('../queries/construction-sites');

var _queriesConstructionSites2 = _interopRequireDefault(_queriesConstructionSites);

var _queriesDamagedStructures = require('../queries/damaged-structures');

var _queriesDamagedStructures2 = _interopRequireDefault(_queriesDamagedStructures);

exports['default'] = function () {
  Creep.prototype.upkeep = function () {
    var source = this.memory.source || 0;

    if ((0, _queriesDamagedStructures2['default'])(this.room).length) {
      this.moveTo(_queriesDamagedStructures2['default'][source]);
      this.repair(_queriesDamagedStructures2['default'][source]);
    } else if ((0, _queriesConstructionSites2['default'])(this.room).length) {
      this.moveTo(_queriesConstructionSites2['default'][source]);
      this.build(_queriesConstructionSites2['default'][source]);
    } else {
      this.moveTo(this.source.controller);
      this.upgradeController(this.source.controller);
    }
  };
};

module.exports = exports['default'];
},{"../queries/construction-sites":3,"../queries/damaged-structures":4}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.war = function (post) {
    var targets = this.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      this.moveTo(targets[0]);
      this.rangedAttack(targets[0]);
    } else {
      this.moveTo(this.memory.idlePos || "27, 24");
    }
  };
};

module.exports = exports["default"];
},{}],19:[function(require,module,exports){
var script = require('./lib/main')();

},{"./lib/main":2}]},{},[19]);