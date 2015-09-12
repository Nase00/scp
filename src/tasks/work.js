export default () => {
  Creep.prototype.work = () => {
    let fullEnergyStores = Memory.rooms[this.room.name].stores.fullEnergyStores;
    if (this.carry.energy === 0 && fullEnergyStores.length) {
      this.recharge();
    } else if (this.carry.energy === this.carryCapacity || (this.carry.energy > 0 && fullEnergyStores.length)) {
      this.upkeep();
    } else {
      let source = Game.getObjectById(Memory.rooms[this.room.name].sources[this.memory.source || 0]);
      this.moveTo(source);
      this.harvest(source);
    }
  }
};
