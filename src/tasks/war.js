export default () => {
  Creep.prototype.war = () => {
    let targets = this.room.find(FIND_HOSTILE_CREEPS);

    if (targets.length) {
      this.moveTo(Game.getObjectById('55f3999b08744ee2099ce6d4'));
      this.rangedAttack(Game.getObjectById('55f3999b08744ee2099ce6d4'));
    } else {
      if (this.room.name !== 'W17N4') {
        this.moveTo(49, 39);
      } else {
        if (targets.length) {
          this.rangedAttack(targets[0]);
        }
        //
        // if (this.memory.source) {
        //   // Block east entrance
          this.moveTo(43, 11);
        // } else {
        //   // Block south entrance
        //   this.moveTo(32, 47);
        // }

        // this.moveTo(this.room.controller);
        // this.attack(this.room.controller);
        // this.claimController(this.room.controller);
      }
    }
  }
};
