// for(var i in Memory.creeps) {
//     if (!Game.creeps[i]) {
//         delete Memory.creeps[i];
//     }
// }

// require('custom-script');
// require('self-sustain');

// Load queries
import stores from './queries/energy-storage';
import sources from './queries/energy-sources';

// Load prototypes
import {
  defend,
  collect,
  recharge,
  upkeep,
  war,
  spawn } from './tasks';

// Load room subroutines
import { W17N4, W17N3 } from './rooms';

export default () => {
  // Clean memory 
  for (let creep in Memory.creeps) {
    if (!Game.creeps[creep]) {
      delete Memory.creeps[creep];
    }
  }

  () => {
    // Execute queries
    stores();
    sources()

    // Execute prototypes
    defend();
    collect();
    recharge();
    upkeep();
    spawn();
    war();

    // Execute room subroutines
    W17N4();
    W17N3();
  }();

  // Execute creep tasks
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    switch (creep.memory.role) {
      case 'harvester':
        creep.collect();
        break;
      // case 'forager':
      //   creep.forage();
      //   break;
      // case 'worker':
      //   if (creep.carry.energy < creep.carryCapacity) {
      //     creep.upkeep();
      //   } else {
      //     creep.recharge();    
      //   }
      //   break;
      // case 'guard':
      //   creep.defend();
      //   break;
      // case 'warrior':
      //   creep.war();
      //   break;
      // default:
      //   console.log('Creep lacks recognized role!');
    }
  }
};
