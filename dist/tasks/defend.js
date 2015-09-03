"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.defend = function (post) {
    var targets = undefined.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      creep.moveTo(targets[0]);
      creep.rangedAttack(targets[0]);
    } else {
      creep.moveTo(undefined.memory.idlePos);
    }
  };
};

module.exports = exports["default"];