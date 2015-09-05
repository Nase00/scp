import { rooms, wallHealth } from '../config';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        if (structure.hitsMax >= 1 && structure.hits < wallHealth) {
          Memory.rooms[room].structuresNeedingRepair.push(structure.id);
        }
      }
    });
  }
};
