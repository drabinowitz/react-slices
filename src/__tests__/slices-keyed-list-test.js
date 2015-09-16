jest.dontMock('../slices-keyed-list');

import KeyedList from '../slices-keyed-list';

describe('keyed-list', function() {
  it('should append entries with keys', function() {
    var keyedList = new KeyedList();

    expect(keyedList.head).toBeNull();
    expect(keyedList.tail).toBeNull();

    keyedList.append('a', 10);

    expect(keyedList.head.value).toBe(10);
    expect(keyedList.head.prevNode).toBeNull();
    expect(keyedList.head.nextNode).toBeNull();

    expect(keyedList.tail.value).toBe(10);
    expect(keyedList.tail.prevNode).toBeNull();
    expect(keyedList.tail.nextNode).toBeNull();

    keyedList.append('b', 20);

    expect(keyedList.head.value).toBe(10);
    expect(keyedList.head.prevNode).toBeNull();
    expect(keyedList.head.nextNode.value).toBe(20);

    expect(keyedList.tail.value).toBe(20);
    expect(keyedList.tail.prevNode.value).toBe(10);
    expect(keyedList.tail.nextNode).toBeNull();
  });

  it('should remove an entry by its key', function() {
    var keyedList = new KeyedList();

    keyedList.append('a', 10);
    keyedList.append('b', 20);

    keyedList.delete('a');

    expect(keyedList.head.value).toBe(20);
    expect(keyedList.head.prevNode).toBeNull();
    expect(keyedList.head.nextNode).toBeNull();

    expect(keyedList.tail.value).toBe(20);
    expect(keyedList.tail.prevNode).toBeNull();
    expect(keyedList.tail.nextNode).toBeNull();

    keyedList.append('c');
    keyedList.delete('c');

    expect(keyedList.head.value).toBe(20);
    expect(keyedList.head.prevNode).toBeNull();
    expect(keyedList.head.nextNode).toBeNull();

    expect(keyedList.tail.value).toBe(20);
    expect(keyedList.tail.prevNode).toBeNull();
    expect(keyedList.tail.nextNode).toBeNull();

    keyedList.delete('b');

    expect(keyedList.head).toBeNull();
    expect(keyedList.tail).toBeNull();
  });

  it('should iterate left to right through the list', function() {
    var mock = jest.genMockFunction();
    var keyedList = new KeyedList();

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

