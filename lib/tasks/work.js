"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  Creep.prototype.work = function () {
    if (undefined.carry.energy < undefined.carryCapacity) {
      undefined.recharge();
    } else {
      undefined.upkeep();
    }
  };
};

module.exports = exports["default"];