export default () => {
  Creep.prototype.work = () => {
    if (this.carry.energy < this.carryCapacity) {
      this.recharge();    
    } else {
      this.upkeep();
    }
  }
};
