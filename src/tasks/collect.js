export default () => {
  Creep.prototype.collect = () => {
    this.say('C+');

    if (this.carry.energy < this.carryCapacity) {
      if (Memory.rooms[this.room.name].sources.length) {
        let source = Game.getObjectById(Memory.rooms[this.room.name].sources[0]);
        if (source) {
          this.moveTo(source);
          this.harvest(source);
        } else {
          console.log('Something is wrong, source ' + source + ' is not defined.');
        }
      } else {
        console.log('No available sources for ' + this.name + 'to harvest.');
      }
    } else {
      // if (Memory.rooms[this.room.name].stores.energyStores.length) {
        let energyStore = Game.getObjectById(Memory.rooms[this.room.name].stores.energyStores[0]);
        this.moveTo(energyStore);
        this.transferEnergy(energyStore);
      // } else {
      //   this.upkeep();
      // }
    }
  }
};
