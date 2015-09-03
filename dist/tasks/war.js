Object.defineProperty(exports, "__esModule", {
  value: true
});

var _this = this;

exports["default"] = function () {
  Creep.prototype.war = function (post) {
    var targets = _this.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      creep.moveTo(targets[0]);
      creep.rangedAttack(targets[0]);
    } else {
      creep.moveTo(_this.memory.idlePos);
    }
  };
};

module.exports = exports["default"];