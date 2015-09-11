import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    let roads = [];
    let walls = [];
    let others = [];

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        if (structure.hitsMax <= 1) {
          return;
        }
        switch (structure.structureType) {
          case 'road':
            if (structure.hits < rooms[room].roadHealth) {
              roads.push(structure.id);
            }
            break;
          case 'constructedWall':
            if (structure.hits < rooms[room].wallHealth) {
              walls.push(structure.id);
            }
            break;
          case 'extension':
          case 'storage':
          case 'link':
            if (structure.hits < structure.hitsMax) {
              others.push(structure.id);
            }
            break;
          default:
            // others.push(structure.id);
            break;
        }
      }
    });
    Memory.rooms[room].structuresNeedingRepair = [].concat(roads, walls, others);
  }
};
