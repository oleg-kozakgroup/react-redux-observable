import { interval } from 'rxjs';

export class Emitter {
  constructor(property, min = 100, max = 200) {
    this.property = property;
    this.callbacks = [];
    this.min = min;
    this.max = max;
  }
  on(ev, callback) {
    this.callbacks.push(callback);
    if (!this[ev]) {
      this[ev] = interval(getRandomNumber(this.min, this.max));
    }
    this[ev].subscribe(() => callback({ [this.property]: getRandomNumber(0, 100) }));
  }

  removeListener(callback){
    this.callbacks.splice(this.callbacks.indexOf(callback), 1);
  }
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
