import rooms from './rooms';

import { constructionSites, damagedStructures } from './queries';

export default () => {
  for (let room in rooms) {
    // Insert keys if not present
    Memory.rooms[room].structuresNeedingRepair = [];
    Memory.rooms[room].structuresNeedingConstruction = [];
    Memory.rooms[room].sources = [];
    Memory.rooms[room].stores = {
      energyStores: [],
      fullEnergyStores: []
    };

    // Flush values
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Memory.rooms[room].sources.length = 0;
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Static
    Memory.rooms[room].links = rooms[room].links;
    Memory.rooms[room].creepCount = rooms[room].creepCount;
    Memory.rooms[room].spawnIds = rooms[room].spawnIds;
    Memory.rooms[room].creepSchema = rooms[room].creepSchema;

    // Persistent
    Memory.rooms[room].actualCreepCount = _.mapValues(rooms[room].creepCount, () => {
      return 0;
    });
  }
  constructionSites();
  damagedStructures();
};
