import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    for (let creepType in rooms[room].creepCount) {
      console.log('creepType', creepType)
      if (creepType < rooms[room].creepCount[creepType]) {
        let idleSpawn;
        let spawns = [];
        for (let spawnId in Memory.rooms[room].spawnIds) {
          spawns.push(Game.getObjectById());
        };
        console.log(spawns)
        console.log('Spawning ' + creepType + ' in room ' + rooms[room].name);
        idleSpawn.spawn(creepType);
      }
    }
  }
};
