export default () => {
  Creep.prototype.work = () => {
    if (this.carry.energy === 0) {
      this.recharge();
    } else {
      this.upkeep();
    }
  }
};
