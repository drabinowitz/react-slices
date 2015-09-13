jest.dontMock('../keyed-list');

describe('keyed-list', function() {
  beforeEach(function() {
    this.KeyedList = require('../keyed-list');
  });

  it('should append entries with keys', function() {
    var keyedList = new this.KeyedList();

    expect(keyedList.head).toBe(null);
    expect(keyedList.tail).toBe(null);

    keyedList.append('a', 10);

    expect(keyedList.head.value).toBe(10);
    expect(keyedList.head.prevNode).toBe(null);
    expect(keyedList.head.nextNode).toBe(null);

    expect(keyedList.tail.value).toBe(10);
    expect(keyedList.tail.prevNode).toBe(null);
    expect(keyedList.tail.nextNode).toBe(null);

    keyedList.append('b', 20);

    expect(keyedList.head.value).toBe(10);
    expect(keyedList.head.prevNode).toBe(null);
    expect(keyedList.head.nextNode.value).toBe(20);

    expect(keyedList.tail.value).toBe(20);
    expect(keyedList.tail.prevNode.value).toBe(10);
    expect(keyedList.tail.nextNode).toBe(null);
  });

  it('should remove an entry by its key', function() {
    var keyedList = new this.KeyedList();

    keyedList.append('a', 10);
    keyedList.append('b', 20);

    keyedList.delete('a');

    expect(keyedList.head.value).toBe(20);
    expect(keyedList.head.prevNode).toBe(null);
    expect(keyedList.head.nextNode).toBe(null);

    expect(keyedList.tail.value).toBe(20);
    expect(keyedList.tail.prevNode).toBe(null);
    expect(keyedList.tail.nextNode).toBe(null);

    keyedList.append('c');
    keyedList.delete('c');

    expect(keyedList.head.value).toBe(20);
    expect(keyedList.head.prevNode).toBe(null);
    expect(keyedList.head.nextNode).toBe(null);

    expect(keyedList.tail.value).toBe(20);
    expect(keyedList.tail.prevNode).toBe(null);
    expect(keyedList.tail.nextNode).toBe(null);

    keyedList.delete('b');

    expect(keyedList.head).toBe(null);
    expect(keyedList.tail).toBe(null);
  });

  it('should iterate left to right through the list', function() {
    var mock = jest.genMockFunction();
    var keyedList = new this.KeyedList();

    keyedList.append('a', 10);
    keyedList.append('b', 20);
    keyedList.append('c', 30);

    keyedList.each(mock);

    expect(mock.mock.calls).toEqual([
      [10, 0, keyedList],
      [20, 1, keyedList],
      [30, 2, keyedList]
    ]);
  });
});

