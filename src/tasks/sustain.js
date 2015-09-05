export default (room, creepCount) => {
  for (let creepType in Memory.rooms[room].creepCount) {
    if (creepType < creepCount[creepType]) {
      Game.rooms[room].spawn(creepType);
    }
  }
};
