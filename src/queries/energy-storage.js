import { rooms } from '../config';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        let energyStorageTypes = ['extension', 'spawn'];
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure.id);
        } else if (energyStorageTypes.indexOf(structure.structureType) !== -1) {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
        // Storage needs to be at end of array  
        if (structure.structureType === 'storage') {
          Memory.rooms[room].stores.fullEnergyStores.push(storage.id);
        }
      }
    });
  }
};
