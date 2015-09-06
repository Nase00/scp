import rooms from '../rooms';

export default (room) => {
  for (let room in rooms) {
    for (let creepType in rooms[room].creepCount) {
      if (creepType < rooms[room].creepCount[creepType]) {
        let idleSpawn;
        let spawns = Game.getObjectById(Memory.rooms[room].spawns, {
          filter: (spawn) => {
            if (spawn.spawning) {
              idleSpawn = spawn;
              return;
            }
          }
        });
        console.log('Spawning ' + creepType + ' in room ' + rooms[room].name);
        idleSpawn.spawn(creepType);
      }
    }
  }
};
