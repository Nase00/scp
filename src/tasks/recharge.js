import getEnergyStores from '../queries/energy-storage';

export default () => {
  Creep.prototype.recharge = () => {
    let fullEnergyStores = Memory.rooms[this.room.name].stores.fullEnergyStores;
    if (fullEnergyStores.length) {
      let source = Game.getObjectById(fullEnergyStores[this.memory.source || fullEnergyStores.length - 1]);

      this.moveTo(source);
      source.transferEnergy(this);
    } else {
      console.log('No available energy for ' + this.name + 'to recharge with');
    }
  }
};
