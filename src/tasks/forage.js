export default () => {
  Creep.prototype.forage = () => {
    this.say('F+');

    let fullOfEnergy = this.carry.energy === this.carryCapacity;
    
    switch (this.room.name) {
      case this.memory.origin.name:
        if (fullOfEnergy) {
          let energyStores = Memory.rooms[this.room.name].stores.energyStores;

          this.moveTo(energyStores[0]);
          this.transferEnergy(energyStores[0]);
        } else {
          this.moveTo(this.memory.origin.exit);
        }
        this.memory.passThroughRoomIndex = 0;
      break;
      case this.memory.destination.name:
        if (fullOfEnergy) {
          this.moveTo(this.memory.destination.exit);
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
