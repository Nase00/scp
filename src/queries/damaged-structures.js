import { rooms, wallHealth, roadHealth } from '../config';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    let stores = [];
    let roads = [];
    let walls = [];
    let others = [];

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        switch (structure.structureType) {
          case 'road':
            if (structure.hits < roadHealth) {
              walls.push(structure.id);
            }
          break;
          case 'constructedWall':
            if (structure.hits < wallHealth) {
              walls.push(structure.id);
            }
          break;
          case 'extension':
          case 'storage':
          case 'link':
            if (structure.hits < structure.hitsMax) {
              walls.push(structure.id);
            }
          break;
          default:
            others.push(structure.id);
        }
      }
    });

    Memory.rooms[room].structuresNeedingRepair = stores.concat(roads, walls, others);
  }
};
