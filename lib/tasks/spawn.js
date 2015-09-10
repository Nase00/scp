'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rooms = require('../rooms');

var _rooms2 = _interopRequireDefault(_rooms);

exports['default'] = function () {
  Spawn.prototype.spawn = function (creepType) {
    var creep = _rooms2['default'][undefined.room.name].creepSchema[creepType];
    console.log(_rooms2['default'][undefined.room.name], '===', creepType);
    console.log(undefined.createCreep(creep.bodyParts, creep.name, creep.memory));
    // Memory.rooms[this.room.name].actualCreepCount[creepType]++;
  };
};

module.exports = exports['default'];