import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    for (let creepType in rooms[room].creepCount) {
      console.log(Memory.rooms[room].actualCreepCount[creepType], rooms[room].creepCount[creepType])
      if (Memory.rooms[room].actualCreepCount[creepType] < rooms[room].creepCount[creepType]) {
        let idleSpawns = [];
        for (let spawnId in Memory.rooms[room].spawnIds) {
          let spawn = Game.getObjectById(spawnId);
          if (!spawn.spawning) {
            idleSpawns.push(spawn);
          }
        };

        console.log('Spawning ' + creepType + ' in room ' + rooms[room].name);
        idleSpawn[0].spawn(creepType);
      }
    }
  }
};
