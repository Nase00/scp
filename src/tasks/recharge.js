import getEnergyStores from '../queries/energy-storage';

export default () => {
  Creep.prototype.recharge = () => {
    let fullEnergyStores = Memory.rooms[this.room.name].stores.fullEnergyStores;
    if (fullEnergyStores.length) {
      let source = Game.getObjectById(fullEnergyStores[fullEnergyStores.length - 1]);

      if (source) {
        this.moveTo(source);
        source.transferEnergy(this);
      }
    }
  }
};
