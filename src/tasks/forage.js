export default () => {
  Creep.prototype.forage = () => {
    let fullOfEnergy = this.carry.energy === this.carryCapacity;

    switch (this.room.name) {
      case this.memory.origin.name:
        if (fullOfEnergy) {
          let energyStores = Memory.rooms[this.room.name].stores.energyStores;
          let energyStore = Game.getObjectById(energyStores[0]);
          this.moveTo(energyStore);
          this.transferEnergy(energyStore);
        } else {
          this.moveTo(this.memory.origin.exit.x, this.memory.origin.exit.y);
        }
        this.memory.passThroughRoomIndex = 0;
      break;
      case this.memory.destination.name:
        if (fullOfEnergy) {
          this.moveTo(this.memory.destination.exit.x, this.memory.destination.exit.y);
        } else {
          let source = Game.getObjectById(this.memory.destination.sourceId);
          this.moveTo(source);
          this.harvest(source);
        }
        this.memory.passThroughRoomIndex = 0;
      break;
      default:
        let direction = fullOfEnergy ? 'toOrigin' : 'toDestination';
        this.moveTo(this.memory.passThroughRooms[this.memory.passThroughRoomIndex][direction]);
        direct === 'toOrigin' ? this.memory.passThroughRoomIndex-- : this.memory.passThroughRoomIndex++;
    }
  }
};
