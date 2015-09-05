import { rooms } from '../config';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Game.rooms[room].find(FIND_CONSTRUCTION_SITES, {
      filter: (site) => {
        Memory.rooms[room].structuresNeedingConstruction.push(site.id);
      }
    });
  }
};
