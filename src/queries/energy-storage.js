import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    // Transmitter link needs to be at absolute beginning of the array
    if (Memory.rooms[room].links.transmitterIds.length) {
      for (let transmitterId in rooms[room].links.transmitterIds) {
        let transmitter = Game.getObjectById(rooms[room].links.transmitterIds[transmitterId]);
        if (transmitter.energy !== transmitter.energyCapacity) {
          Memory.rooms[room].stores.energyStores.push(rooms[room].links.transmitterIds[transmitterId]);
        }
      }
    }

    let spawns = [];
    let extensions = [];
    let links = [];
    let storages = [];

    if (Game.rooms[room]) {
      Game.rooms[room].find(FIND_STRUCTURES, {
        filter: (structure) => {
          if (structure.energyCapacity > 0 && structure.energy < structure.energyCapacity) {
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
    } else {
      console.log('GAME OBJECT FORGOT ABOUT A ROOM!'); // Bug?
    }

    Memory.rooms[room].stores.fullEnergyStores = spawns.concat(extensions, storages);

    // Receiver link needs to be at absolute end of the array
    if (rooms[room].links.receiverId.length && Game.getObjectById(rooms[room].links.receiverId).energy > 0) {
      Memory.rooms[room].stores.fullEnergyStores.push(rooms[room].links.receiverId);
    }
  }
};
