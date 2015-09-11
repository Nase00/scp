export default () => {
  Creep.prototype.upkeep = () => {
    let structureNeedingRepair = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingRepair[0]);
    let structureNeedingConstruction = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingConstruction[0]);

    if (structureNeedingRepair) {
      this.moveTo(structureNeedingRepair);
      this.repair(structureNeedingRepair);
    } else if (structureNeedingConstruction) {
      this.moveTo(structureNeedingConstruction);
      this.build(structureNeedingConstruction);
    } else {
      this.moveTo(this.room.controller);
      this.upgradeController(this.room.controller);
    }
  }
};
