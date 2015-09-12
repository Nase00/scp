import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    for (let creepType in rooms[room].creepCount) {
      // console.log(creepType, Memory.rooms[room].actualCreepCount[creepType], rooms[room].creepCount[creepType])
      if (Memory.rooms[room].actualCreepCount[creepType] < rooms[room].creepCount[creepType]) {
        let idleSpawns = [];
        for (let spawnId in Memory.rooms[room].spawnIds) {
          let spawn = Game.getObjectById(Memory.rooms[room].spawnIds[spawnId]);
          if (spawn && !spawn.spawning) {
            idleSpawns.push(spawn);
          }
        };

        if (idleSpawns.length) {
          console.log('Spawning ' + creepType + ' in room ' + rooms[room].name);
          idleSpawns[0].spawn(creepType);
          return;
        }
        // } else {
        //   console.log('Waiting for available spawner in ' + rooms[room].name + ' to spawn ' + creepType);
        // }
      }
    }
  }
};
