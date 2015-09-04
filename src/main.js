// for(var i in Memory.creeps) {
//     if (!Game.creeps[i]) {
//         delete Memory.creeps[i];
//     }
// }

// require('custom-script');
// require('self-sustain');

// Load memory primer
import memory from './memory';

// Load queries
import stores from './queries/energy-storage';
import sources from './queries/energy-sources';

// Load prototypes
import {
  defend,
  collect,
  work,
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
    // Prime memory
    memory();

    // Execute queries
    stores();
    sources()

    // Execute prototypes
    defend();
    collect();
    work();
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
      case 'builder':
        creep.work();
        break;
      // case 'guard':
      //   creep.defend();
      //   break;
      // case 'warrior':
      //   creep.war();
      //   break;
      default:
        let roleAlert = '${creep} with role ${creep.memory.role} has no task!';
        console.log(roleAlert);
    }
  }
};
