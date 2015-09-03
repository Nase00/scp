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