jest.dontMock('../slices-update-handler');
jest.dontMock('../slices-keyed-list');

describe('slices-update-handler', function() {
  beforeEach(function() {
    this.updateHandler = require('../slices-update-handler');
  });

  it('should add callbacks', function() {
    func = function(){};
    var key = this.updateHandler.add(func);
    expect(typeof key === 'string').toEqual(true);
  });

  it('should remove callbacks', function() {
    func = function(){};
    var key = this.updateHandler.add(func);
    expect(this.updateHandler.remove(key)).toEqual(true);
  });

  it('should invoke all passed in callbacks', function() {
    var func1 = jest.genMockFunction();
    var func2 = jest.genMockFunction();
    var func3 = jest.genMockFunction();

    this.updateHandler.add(func1);
    this.updateHandler.add(func2);
    this.updateHandler.add(func3);

    this.updateHandler.change();

    expect(func1).toBeCalled();
    expect(func2).toBeCalled();
    expect(func3).toBeCalled();
  });

  it('should maintain a unique update cursor', function() {
    var changeCursor = this.updateHandler.getChangeCursor();

    expect(changeCursor).toBeNull();

    var func1 = jest.genMockFunction().mockImplementation(function() {
      expect(changeCursor).not.toBe(this.updateHandler.getChangeCursor());
      changeCursor = this.updateHandler.getChangeCursor();
    }.bind(this));

    var func2 = jest.genMockFunction().mockImplementation(function() {
      expect(this.updateHandler.getChangeCursor()).toBe(changeCursor);
    }.bind(this));

    this.updateHandler.add(func1);
    this.updateHandler.add(func2);

    this.updateHandler.change();
    this.updateHandler.change();

    expect(func1.mock.calls.length).toBe(2);
    expect(func2.mock.calls.length).toBe(2);

    expect(this.updateHandler.getChangeCursor()).toBeNull();
  });
});
