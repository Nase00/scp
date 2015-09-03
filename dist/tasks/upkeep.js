Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queriesConstructionSites = require('../queries/construction-sites');

var _queriesConstructionSites2 = _interopRequireDefault(_queriesConstructionSites);

var _queriesDamagedStructures = require('../queries/damaged-structures');

var _queriesDamagedStructures2 = _interopRequireDefault(_queriesDamagedStructures);

exports['default'] = function () {
  Creep.prototype.upkeep = function () {
    var source = _this.memory.source || 0;

    if ((0, _queriesDamagedStructures2['default'])(_this.room).length) {
      _this.moveTo(_queriesDamagedStructures2['default'][source]);
      _this.repair(_queriesDamagedStructures2['default'][source]);
    } else if ((0, _queriesConstructionSites2['default'])(_this.room).length) {
      _this.moveTo(_queriesConstructionSites2['default'][source]);
      _this.build(_queriesConstructionSites2['default'][source]);
    } else {
      _this.moveTo(_this.source.controller);
      _this.upgradeController(_this.source.controller);
    }
  };
};

module.exports = exports['default'];