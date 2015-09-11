import rooms from '../rooms';

export default () => {
  Spawn.prototype.spawn = (creepType) => {
    let creep = rooms[this.room.name].creepSchema[creepType];
    this.createCreep(creep.bodyParts, creep.name, creep.memory);
    Memory.rooms[this.room.name].actualCreepCount[creepType]++;
  }
};
