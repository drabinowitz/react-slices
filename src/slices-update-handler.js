listeners = [];

changeCursor = null;

// index increments before return
index = -1;

export function add (callback) {
  listeners.push(callback);
  index++;
  return index;
}

export function remove (index) {
  listeners[index] = null;
  if (listeners.length > 500) {
    listeners = listeners.filter(cb => cb)
  }
}

export function getChangeCursor() {return changeCursor;}

export function change() {
  changeCursor = {};
  listeners.forEach(cb => if (cb) {cb()});
  changeCursor = null;
}
