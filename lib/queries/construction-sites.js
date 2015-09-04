'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _config = require('../config');

exports['default'] = function () {
  var _loop = function (room) {
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Game.rooms[room].find(FIND_CONSTRUCTION_SITES, {
      filter: function filter(site) {
        Memory.rooms[room].structuresNeedingConstruction.push(site.id);
      }
    });
  };

  for (var room in _config.rooms) {
    _loop(room);
  }
};

module.exports = exports['default'];