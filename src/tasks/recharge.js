import getEnergyStores from '../queries/energy-storage';

export default () => {
  Creep.prototype.recharge = () => {
    let source = getEnergyStores(this.room).fullEnergyStores[this.memory.source || energyForRecharging.length - 1];

    creep.moveTo(source);
    source.transferEnergy(creep);
  }
};
