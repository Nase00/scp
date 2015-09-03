export default () => {
  Creep.prototype.collect = () => {
    let source = this.memory.source || 0;
    let room = this.room.name; //.toString().match(/.\d{2}.\d/)[0];
console.log(this.say('Collecting'));
    if (this.carry.energy < this.carryCapacity) {
      let sources = Memory.rooms[room].sources;
      console.log(sources)

      this.moveTo(sources[this.memory.source]);
      this.harvest(sources[this.memory.source]);
    } else {
      let energystores = Memory.rooms[room].stores.energyStores;
      
      this.moveTo(energystores[0]);
      this.transferEnergy(energystores[0]);
    }
  }
};

// RangeError: Maximum call stack size exceeded
//     at arrayFilter (/opt/engine/node_modules/lodash/index.js:1384:13)
//     at Function.filter (/opt/engine/node_modules/lodash/index.js:6309:14)
//     at Creep.getActiveBodyparts (/opt/engine/dist/game/creeps.js:275:14)
//     at Creep.moveTo (/opt/engine/dist/game/creeps.js:88:14)
//     at Creep.harvest (main:376:12)
//     at Creep.harvest (main:377:12)
//     at Creep.harvest (main:377:12)
//     at Creep.harvest (main:377:12)
//     at Creep.harvest (main:377:12)
