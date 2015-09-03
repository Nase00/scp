import getEnergyStores from '../queries/energy-storage';
import getEnergySources from '../queries/energy-sources';

export default () => {
  Creep.prototype.harvest = () => {
    let source = this.memory.source || 0;
    let sources = getEnergySources(this.room);

    if (this.carry.energy < this.carryCapacity) {
      this.moveTo(sources[this.memory.source]);
      this.harvest(sources[this.memory.source]);
    } else {
      let energystores = getEnergyStores(this.room).energyStores;
      this.moveTo(energystores[0]);
      this.transferEnergy(energystores[0]);
    }
  }
};
