import rooms from '../rooms';

export default () => {
  Spawn.prototype.spawn = (creepType) => {
    creep = rooms[this.room].creepSchema[creepType];
    console.log(creep)
    this.createCreep(creep.bodyParts, creep.name, creep.memory);
    Memory.rooms[this.room].creepCount[creepType]++;
  }
};
