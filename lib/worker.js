'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tasksUpkeep = require('./tasks/upkeep');

var _tasksUpkeep2 = _interopRequireDefault(_tasksUpkeep);

var build = function build(creep) {
  if (creep.carry.energy == 0) {
    creep.recharge();
  } else {
    creep.upkeep();
  }
};

exports.build = build;
var spawn = function spawn(_spawn) {
  var currentTime = Date.now();
  var builderName = "Builder" + currentTime;
  _spawn.createCreep([CARRY, WORK, WORK, MOVE], builderName, { role: 'builder', born: currentTime });
};
exports.spawn = spawn;