import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].stores.energyStores.length = 0;
    Memory.rooms[room].stores.fullEnergyStores.length = 0;

    // Transmitter link needs to be at absolute beginning of the array
    if (rooms[room].links.transmitters.length) {
      for (transmitter in rooms[room].links.transmitters) {
        Memory.rooms[room].stores.fullEnergyStores.push(transmitter);
      }
    }

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        let energyStorageTypes = ['extension', 'spawn'];
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure.id);
        } else if (energyStorageTypes.indexOf(structure.structureType) !== -1) {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
        // Storage needs to be near the end of the array
        if (structure.structureType === 'storage') {
          Memory.rooms[room].stores.fullEnergyStores.push(structure.id);
        }
      }
    });

    // Receiver link needs to be at absolute end of the array
    if (rooms[room].links.receiverId.length) {
      Memory.rooms[room].stores.fullEnergyStores.push(rooms[room].links.receiverId);
    }
  }
};
