import { creepTypeConstants } from '../config';

export default () => {
  Spawn.prototype.spawn = (creepType) => {
    this.createCreep(creepTypeConstants[creepType]);
    Memory.rooms[this.room].creepCount[unitType]++;
  }
};
