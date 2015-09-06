import rooms from '../rooms';

export default () => {
  for (let room in rooms) {
    Memory.rooms[room].sources.length = 0;
    Game.rooms[room].find(FIND_SOURCES, {
      filter: (source) => {
        Memory.rooms[room].sources.push(source.id);
      }
    });
  }
};
