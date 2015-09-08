export default () => {
  Creep.prototype.collect = () => {
    this.say('C+');

    if (this.carry.energy < this.carryCapacity) {
      if (Memory.rooms[this.room.name].sources.length) {
        let source = Game.getObjectById(Memory.rooms[this.room.name].sources[this.memory.source || 0]);

        this.moveTo(source);
        this.harvest(source);
      } else {
        console.log('No available sources for ' + this.name + 'to harvest.');
      }
    } else {
      let energyStore = Game.getObjectById(Memory.rooms[this.room.name].stores.energyStores[0]);

      this.moveTo(energyStore);
      this.transferEnergy(energyStore);
    }
  }
};
