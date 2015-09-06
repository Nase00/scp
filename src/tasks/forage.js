export default () => {
  Creep.prototype.forage = () => {
    this.say('F+');

    switch (this.room.name) {
      case this.memory.origin.name:
      if (this.carry.energy === this.carryCapacity) {
        let energystores = Memory.rooms[this.room.name].stores.energyStores;

        this.moveTo(energyStores[0]);
        this.transferEnergy(energyStores[0]);
      } else {
        this.moveTo(this.memory.origin.exit);
      }
      break;
      case this.memory.destination:
      if (this.memory.destination.name === this.room.name) {
        this.moveTo(this.memory.destination.source);
        this.harvest(this.memory.destination.source);
      } else {
        this.moveTo(this.memory.destination.exit);
      }
      break;
    }
  }
};
