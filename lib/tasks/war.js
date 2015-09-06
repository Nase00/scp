'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.war = function (post) {
    var targets = undefined.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      undefined.moveTo(targets[0]);
      undefined.rangedAttack(targets[0]);
    } else {
      undefined.moveTo(undefined.memory.idlePos || '27, 24');
    }
  };
};

module.exports = exports['default'];