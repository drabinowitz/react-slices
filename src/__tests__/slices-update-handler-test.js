jest.dontMock('../slices-update-handler');
jest.dontMock('../slices-keyed-list');
import * as updateHandler from '../slices-update-handler';

describe('slices-update-handler', function() {
  it('should add callbacks', function() {
    func = function(){};
    var key = updateHandler.add(func);
    expect(typeof key === 'string').toEqual(true);
  });

  it('should remove callbacks', function() {
    func = function(){};
    var key = updateHandler.add(func);
    expect(updateHandler.remove(key)).toEqual(true);
  });

  it('should invoke all passed in callbacks', function() {
    var func1 = jest.genMockFunction();
    var func2 = jest.genMockFunction();
    var func3 = jest.genMockFunction();

    updateHandler.add(func1);
    updateHandler.add(func2);
    updateHandler.add(func3);

    updateHandler.change();

    expect(func1).toBeCalled();
    expect(func2).toBeCalled();
    expect(func3).toBeCalled();
  });

  it('should maintain a unique update cursor', function() {
    var changeCursor = updateHandler.getChangeCursor();

    expect(changeCursor).toBeNull();

    var func1 = jest.genMockFunction().mockImplementation(function() {
      expect(changeCursor).not.toBe(updateHandler.getChangeCursor());
      changeCursor = updateHandler.getChangeCursor();
    }.bind(this));

    var func2 = jest.genMockFunction().mockImplementation(function() {
      expect(updateHandler.getChangeCursor()).toBe(changeCursor);
    }.bind(this));

    updateHandler.add(func1);
    updateHandler.add(func2);

    updateHandler.change();
    updateHandler.change();

    expect(func1.mock.calls.length).toBe(2);
    expect(func2.mock.calls.length).toBe(2);

    expect(updateHandler.getChangeCursor()).toBeNull();
  });
});
