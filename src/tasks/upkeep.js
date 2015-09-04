export default () => {
  Creep.prototype.upkeep = () => {
    let structureNeedingRepair = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingRepair[this.memory.source || 0]);
    let structureNeedingConstruction = Game.getObjectById(Memory.rooms[this.room.name].structuresNeedingConstruction[this.memory.source || 0]);

    if (structureNeedingRepair) {
      this.moveTo(structuresNeedingRepair);
      this.repair(structuresNeedingRepair);
    } else if (structureNeedingConstruction) {
      this.moveTo(structureNeedingConstruction);
      this.build(structureNeedingConstruction);
    } else {
      this.moveTo(this.room.controller);
      this.upgradeController(this.room.controller);
    }
  }
};
