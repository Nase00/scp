export default () => {
  Creep.prototype.collect = () => {
    this.say('C+');

    let room = this.room.name; //.toString().match(/.\d{2}.\d/)[0];

    if (this.carry.energy < this.carryCapacity) {
      let source = Game.getObjectById(Memory.rooms[room].sources[this.memory.source || 0]);

      this.moveTo(source);
      this.harvest(source);
    } else {
      let energystores = Memory.rooms[room].stores.energyStores;
      
      this.moveTo(energystores[0]);
      this.transferEnergy(energystores[0]);
    }
  }
};
