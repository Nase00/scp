import { unitTypeConstants } from '../config';

export default () => {
  Spawn.prototype.spawn = (unitType) => {
    this.createCreep(
      unitTypeConstants.bodyParts[unitType],
      unitTypeConstants.name[unitType],
      unitTypeConstants.memory[unitType]
    );
    Memory.rooms[this.room].unitCount[unitType] += 1;
  }
};
