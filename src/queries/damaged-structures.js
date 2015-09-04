import { wallHealth } from '../config';

export default (room) => {
  let structuresNeedingRepair = [];
  room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      if (structure.hitsMax > 1 && structure.hits < wallHealth) {
        structuresNeedingRepair.push(i);
      }
    }
  });
  return structuresNeedingRepair;
};
