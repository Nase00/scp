import rooms from '../config';

export default () => {
  for (let room in rooms) {
  	Memory.rooms[room].sources = [];

		Game.rooms[room].find(FIND_SOURCES, {
			filter: (source) => {
				Memory.rooms[room].sources.push(source);
			}
		});
  }
};
