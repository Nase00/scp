"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var structuresNeedingConstruction = function structuresNeedingConstruction(room) {
  return room.find(FIND_CONSTRUCTION_SITES);
};
exports.structuresNeedingConstruction = structuresNeedingConstruction;