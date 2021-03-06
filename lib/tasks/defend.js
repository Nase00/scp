"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.defend = function (post) {
    var targets = undefined.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      undefined.moveTo(targets[0]);
      undefined.rangedAttack(targets[0]);
    } else {
      undefined.moveTo(undefined.memory.idlePos.x || 27, undefined.memory.idlePos.y || 24);
    }
  };
};

module.exports = exports["default"];