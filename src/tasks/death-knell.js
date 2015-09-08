export default () => {
  Creep.prototype.deathKnell = () => {
    console.log(this.name + ' is about to expire.')
    Memory.rooms[this.memory.origin.name].actualCreepCount[creepType]--;
  }
};
