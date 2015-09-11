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