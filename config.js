var units = {
    harvesters: 11,
    scouts: 2,
    builders: 11,
    managers: 1,
    guards: 9,
    warriors: 0
};

var spawn = Game.spawns.Spawn1;

var energyStores = [];
Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: function(i) {
        if (i.energy < i.energyCapacity) {
            energyStores.push(i);
        }
    }
});

module.exports = {
    units: units,
    spawn: spawn,
    energyStores: energyStores
};
