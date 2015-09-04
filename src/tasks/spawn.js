import { unitTypeConstants } from '../config';

export default () => {
  Spawn.prototype.spawn = (unitType) => {
    this.createCreep(unitTypeConstants[unitType]);
    Memory.rooms[this.room].unitCount[unitType]++;
  }
};
