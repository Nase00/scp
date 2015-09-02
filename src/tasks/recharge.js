import {
  energyForRecharging
} from '../config';

export default () => {
  Creep.prototype.recharge = () => {
    let source = energyForRecharging[this.memory.source || energyForRecharging.length - 1];

    creep.moveTo(source);
    source.transferEnergy(creep);
  }
};
