export default () => {
  Creep.prototype.defend = (post) => {
    let targets = this.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      this.moveTo(targets[0]);
      this.rangedAttack(targets[0]);
    } else {
      this.moveTo(this.memory.idlePos || '27, 24')
    }
  }
};
