class Node extends object {
  constructor(value, prevNode=null, nextNode=null) {
    this.value = value;
    this.prevNode = prevNode;
    this.nextNode = nextNode;
  }
}

class List extends Object {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    if(!this.head) {
      node = new Node(value);
      this.head = node;
    } else if(!this.tail) {
      node = new Node(value, this.head);
      this.head.nextNode = node;
    } else {
      node = new Node(value, this.tail);
      this.tail.nextNode = node;
    }
    this.tail = node;
    return node;
  }

  each(callback) {
    let i = 0;
    for (var node = this.head; node !== null; node = node.nextNode){
      callback(node, i);
      i++;
    }
  }
}

class KeyedList extends List {
  constructor() {
    super()
    this._keys = {}
  }

  append(key, value) {
    if (this._keys.hasOwnProperty(key)) {throw new Error('duplicate key')}
    var node = super(value);
    this._keys[key] = node;
  }

  delete(key) {
    if (!this._keys.hasOwnProperty(key)) {throw new Error('key not found')}
  }
}

export default KeyedList;
