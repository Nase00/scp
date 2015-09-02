import upkeep from './tasks/upkeep';

export let build = (creep) => {
  if (creep.carry.energy == 0) {
    creep.recharge();
  } else {
    creep.upkeep();
  }
};

export let spawn = (spawn) => {
  let currentTime = Date.now();
  let builderName = "Builder" + currentTime;
  spawn.createCreep([CARRY, WORK, WORK, MOVE], builderName, {role: 'builder', born: currentTime});
};
