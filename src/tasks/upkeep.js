import {
  rooms,
  wallHealth,
  structuresNeedingRepair,
  structuresNeedingConstruction
} from '../config';

export default () => {
  Creep.prototype.upkeep = () => {
    let source = this.memory.source || 0;

    if (structuresNeedingRepair.length) {
      this.moveTo(structuresNeedingRepair[source]);
      this.repair(structuresNeedingRepair[source]);
    } else if (structuresNeedingConstruction.length) {
      this.moveTo(structuresNeedingConstruction[source]);
      this.build(structuresNeedingConstruction[source]);
    } else {
      this.moveTo(this.source.controller);
      this.upgradeController(this.source.controller);
    }
  }
};
