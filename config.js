var units = {
    harvesters: 13,
    scouts: 10,
    explorers: 13,
    builders: 11,
    managers: 0,
    guards: 3,
    warriors: 3,
    dHarvesters: 8,
    dBuilders: 6
};

var spawn = Game.spawns.Spawn1;

var rooms = {
    room1: '[room W17N4]',
    room2: '[room W18N4]'
};

var energyStores = [];
var availableEnergy = [];
Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: function(i) {
        if (i.energy < i.energyCapacity) {
            energyStores.push(i);
        }
        if (i.energy > 0 && i.structureType == 'extension' || i.structureType == 'spawn') {
            availableEnergy.push(i);
        }
    }
});

receiverLink1 = Game.getObjectById('55ebd31b30de2f106e550700');
if (receiverLink1.energy !== receiverLink1.energyCapacity) {
    energyStores.push(receiverlink1);
}

receiverLink2 = Game.getObjectById('55e4d627002b197809962d40');
if (receiverLink2.energy !== receiverLink2.energyCapacity) {
    energyStores.push(receiverlink2);
}

energyStores.push(Game.getObjectById('55e1682311c512f963112729'));

if (Game.structures['55e1682311c512f963112729'].store.energy > 0) {
    availableEnergy.push(Game.structures['55e1682311c512f963112729']);
}

module.exports = {
    units: units,
    spawn: spawn,
    rooms: rooms,
    energyStores: energyStores,
    availableEnergy: availableEnergy
};
