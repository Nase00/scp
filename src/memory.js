import rooms from './rooms';

export default () => {
  for (let room in rooms) {
    // Flush
    Memory.rooms[room].structuresNeedingRepair.length = 0;
    Memory.rooms[room].structuresNeedingConstruction.length = 0;
    Memory.rooms[room].sources.length = 0;
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Static
    Memory.rooms[room].links = rooms[room].links;
    Memory.rooms[room].creepCount = rooms[room].creepCount;

    // Persistent
    Memory.rooms[room].actualCreepCount = {};
  }
};
