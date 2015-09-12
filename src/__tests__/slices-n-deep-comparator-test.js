jest.dontMock('../slices-n-deep-comparator');

describe('slices-n-deep-comparator', function() {
  beforeEach(function() {
    this.nDepthComparator = require('../slices-n-deep-comparator');
  });

  context('with no depth specified', function() {
    it('should compare one level deep', function() {
    });
  });

  context('with depth 0 specified', function() {
    it('should shallow compare', function() {
    });
  });

  context('with depth n specified', function() {
    it('should compare to the specified depth', function() {
    });
  });

  context('with depth Infinity specified', function() {
    it('should deep compare', function() {
    });
  });
});
