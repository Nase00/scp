var units = {
    harvesters: 6,
    scouts: 8,
    explorers: 18,
    builders: 11,
    managers: 0,
    guards: 3,
    warriors: 3,
    dHarvesters: 3
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
energyStores.push(Game.structures['55e1682311c512f963112729']);
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
