// Secondary room

import { sustain } from '../tasks';

const room = 'W17N3';

const unitCount = {
  harvesters: 3,
  foragers: 0,
  builders: 3,
  guards: 0,
  warriors: 0
};

export default () => {
	sustain(room, unitCount);
};
