'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constructionSites = require('./construction-sites');

var _constructionSites2 = _interopRequireDefault(_constructionSites);

var _damagedStructures = require('./damaged-structures');

var _damagedStructures2 = _interopRequireDefault(_damagedStructures);

exports['default'] = {
  constructionSites: _constructionSites2['default'],
  damagedStructures: _damagedStructures2['default']
};
module.exports = exports['default'];