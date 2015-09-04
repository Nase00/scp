import { rooms } from '../config';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].stores = {
      energyStores: [],
      fullEnergyStores: []
    };
    
    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        let energyStorageTypes = ['extension', 'storage', 'spawn'];
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure);
        } else if (energyStorageTypes.indexOf(structure.structureType) != -1) {
          Memory.rooms[room].stores.fullEnergyStores.push(structure);
        }
      }
    });
  }
};
