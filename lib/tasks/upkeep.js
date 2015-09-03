// TODO: Refactor to read from Memory.

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
    var source = undefined.memory.source || 0;

    if ((0, _queriesDamagedStructures2['default'])(undefined.room).length) {
      undefined.moveTo(_queriesDamagedStructures2['default'][source]);
      undefined.repair(_queriesDamagedStructures2['default'][source]);
    } else if ((0, _queriesConstructionSites2['default'])(undefined.room).length) {
      undefined.moveTo(_queriesConstructionSites2['default'][source]);
      undefined.build(_queriesConstructionSites2['default'][source]);
    } else {
      undefined.moveTo(undefined.source.controller);
      undefined.upgradeController(undefined.source.controller);
    }
  };
};

module.exports = exports['default'];