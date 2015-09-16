import KeyedList from './slices-keyed-list'

listeners = new KeyedList();

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

changeCursor = null;

export function add (callback) {
  var key = guid();
  listeners.append(key, callback);
  return key;
}

export function remove (key) {
  return listeners.delete(key);
}

export function getChangeCursor() {return changeCursor;}

export function change() {
  changeCursor = {};
  listeners.each(cb => {
    if (cb) {cb()}
  });
  changeCursor = null;
}
