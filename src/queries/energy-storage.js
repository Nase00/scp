import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    // Transmitter link needs to be at absolute beginning of the array
    if (Memory.rooms[room].links.transmitterIds.length) {
      for (let transmitterId in rooms[room].links.transmitterIds) {
        Memory.rooms[room].stores.energyStores.push(transmitterId);
      }
    }

    let spawns = [];
    let extensions = [];
    let links = [];
    let storages = [];

    Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (structure) => {
        if (structure.energy < structure.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(structure.id);
        } else {
          switch (structure.structureType) {
            case 'spawn':
              spawns.push(structure.id);
              break;
            case 'extension':
              extensions.push(structure.id);
              break;
            case 'link':
              links.push(structure.id);
              break;
            case 'storage':
              storages.push(structure.id);
              break;
          }
        }
      }
    });

    Memory.rooms[room].stores.fullEnergyStores.concat(spawns, extensions, storages);

    // Receiver link needs to be at absolute end of the array
    if (rooms[room].links.receiverId.length && Game.getObjectById(rooms[room].links.receiverId).energy > 0) {
      Memory.rooms[room].stores.fullEnergyStores.push(rooms[room].links.receiverId);
    }
  }
};
