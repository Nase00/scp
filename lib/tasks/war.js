'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  Creep.prototype.war = function () {
    var targets = undefined.room.find(FIND_HOSTILE_CREEPS);

    if (targets.length) {
      undefined.moveTo(Game.getObjectById('55f3999b08744ee2099ce6d4'));
      undefined.rangedAttack(Game.getObjectById('55f3999b08744ee2099ce6d4'));
    } else {
      if (undefined.room.name !== 'W17N4') {
        undefined.moveTo(49, 39);
      } else {
        if (targets.length) {
          undefined.rangedAttack(targets[0]);
        }
        //
        // if (this.memory.source) {
        //   // Block east entrance
        undefined.moveTo(43, 11);
        // } else {
        //   // Block south entrance
        //   this.moveTo(32, 47);
        // }

        // this.moveTo(this.room.controller);
        // this.attack(this.room.controller);
        // this.claimController(this.room.controller);
      }
    }
  };
};

module.exports = exports['default'];