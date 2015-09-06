export default () => {
  Creep.prototype.forage = () => {
    this.say('F+');

    let fullOfEnergy = this.carry.energy === this.carryCapacity;

    let direction = fullOfEnergy ? 'toOrigin' : 'toDestination';
    let passThroughRoomIndex = 0;

    switch (this.room.name) {
      case this.memory.origin.name:
        if (fullOfEnergy) {
          let energystores = Memory.rooms[this.room.name].stores.energyStores;

          this.moveTo(energyStores[0]);
          this.transferEnergy(energyStores[0]);
        } else {
          this.moveTo(this.memory.origin.exit);
        }
      break;
      case this.memory.destination:
        if (fullOfEnergy) {
          this.moveTo(this.memory.destination.exit);
        } else {
          this.moveTo(this.memory.destination.source);
          this.harvest(this.memory.destination.source);
        }
      break;
      default:
        this.moveTo(this.memory.passThroughRooms[passThroughRoomIndex][direction]);
    }
  }
};
