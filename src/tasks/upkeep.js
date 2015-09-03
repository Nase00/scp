import structuresNeedingConstruction from '../queries/construction-sites';
import structuresNeedingRepair from '../queries/damaged-structures';

export default () => {
  Creep.prototype.upkeep = () => {
    let source = this.memory.source || 0;

    if (structuresNeedingRepair(this.room).length) {
      this.moveTo(structuresNeedingRepair[source]);
      this.repair(structuresNeedingRepair[source]);
    } else if (structuresNeedingConstruction(this.room).length) {
      this.moveTo(structuresNeedingConstruction[source]);
      this.build(structuresNeedingConstruction[source]);
    } else {
      this.moveTo(this.source.controller);
      this.upgradeController(this.source.controller);
    }
  }
};
