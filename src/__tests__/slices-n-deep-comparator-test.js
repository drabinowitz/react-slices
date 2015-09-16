jest.dontMock('../slices-n-deep-comparator');
import nDepthComparator from '../slices-n-deep-comparator';

describe('slices-n-deep-comparator', function() {
  describe('with depth 0 specified', function() {
    it('should shallow compare', function() {
      var depth0Comparator = nDepthComparator(0);

      expect(depth0Comparator(0, 0)).toBe(true)
      expect(depth0Comparator(10.3, 0)).toBe(false)
      expect(depth0Comparator(10.3, 10.3)).toBe(true)

      expect(depth0Comparator('asdfs0-', 'asdfs0-')).toBe(true);
      expect(depth0Comparator('aSdfs', 'asdfs')).toBe(false);
      expect(depth0Comparator('aSdfs', 'aSdfs')).toBe(true);

      var arr = [];
      expect(depth0Comparator(arr, arr)).toBe(true);

      expect(depth0Comparator([], [])).toBe(false);
      expect(depth0Comparator([], [1])).toBe(false);
      expect(depth0Comparator([1], [1])).toBe(false);

      var obj = {};
      expect(depth0Comparator(obj, obj)).toBe(true);

      expect(depth0Comparator({}, {})).toBe(false);
      expect(depth0Comparator({}, {a: 1})).toBe(false);
      expect(depth0Comparator({a: 1}, {a: 1})).toBe(false);
    });
  });

  describe('with depth n specified', function() {
    it('should compare to depth 1', function() {
      var depth1Comparator = nDepthComparator(1);

      expect(depth1Comparator(0, 0)).toBe(true)
      expect(depth1Comparator(10.3, 0)).toBe(false)
      expect(depth1Comparator(10.3, 10.3)).toBe(true)

      expect(depth1Comparator('asdfs0-', 'asdfs0-')).toBe(true);
      expect(depth1Comparator('aSdfs', 'asdfs')).toBe(false);
      expect(depth1Comparator('aSdfs', 'aSdfs')).toBe(true);

      expect(depth1Comparator([], [])).toBe(true);
      expect(depth1Comparator([], [1])).toBe(false);
      expect(depth1Comparator([1], [1])).toBe(true);
      expect(depth1Comparator([1, 2], [1])).toBe(false);
      expect(depth1Comparator([1, 2], [2, 1])).toBe(false);
      expect(depth1Comparator([1, 2], [1, 2])).toBe(true);

      expect(depth1Comparator([[]], [[]])).toBe(false);
      expect(depth1Comparator([[]], [[1]])).toBe(false);
      expect(depth1Comparator([[1]], [[1]])).toBe(false);
      expect(depth1Comparator([1, [1]], [[1]])).toBe(false);
      expect(depth1Comparator([1, [1]], [1, [1]])).toBe(false);

      expect(depth1Comparator({}, {})).toBe(true);
      expect(depth1Comparator({}, {a: 1})).toBe(false);
      expect(depth1Comparator({a: 1}, {a: 1})).toBe(true);
      expect(depth1Comparator({a: 1, b: 1}, {a: 1})).toBe(false);
      expect(depth1Comparator({a: 1, b: 1}, {a: 1, c: 1})).toBe(false);
      expect(depth1Comparator({a: 1, b: 1}, {b: 1, a: 1})).toBe(true);

      expect(depth1Comparator({a: {}}, {a: {}})).toBe(false);
      expect(depth1Comparator({a: {}}, {a: {a: 1}})).toBe(false);
      expect(depth1Comparator({a: {a: 1}}, {a: {a: 1}})).toBe(false);
      expect(depth1Comparator({b: 1, a: {a: 1}}, {a: {a: 1}})).toBe(false);
      expect(depth1Comparator({b: 1, a: {a: 1}}, {b: 1, a: {a: 1}}))
        .toBe(false);
    });

    it('should compare to depth 2', function() {
      var depth2Comparator = nDepthComparator(2);

      expect(depth2Comparator(0, 0)).toBe(true)
      expect(depth2Comparator(10.3, 0)).toBe(false)
      expect(depth2Comparator(10.3, 10.3)).toBe(true)

      expect(depth2Comparator('asdfs0-', 'asdfs0-')).toBe(true);
      expect(depth2Comparator('aSdfs', 'asdfs')).toBe(false);
      expect(depth2Comparator('aSdfs', 'aSdfs')).toBe(true);

      expect(depth2Comparator([], [])).toBe(true);
      expect(depth2Comparator([], [1])).toBe(false);
      expect(depth2Comparator([1], [1])).toBe(true);
      expect(depth2Comparator([1, 2], [1])).toBe(false);
      expect(depth2Comparator([1, 2], [2, 1])).toBe(false);
      expect(depth2Comparator([1, 2], [1, 2])).toBe(true);

      expect(depth2Comparator([[]], [[]])).toBe(true);
      expect(depth2Comparator([[]], [[1]])).toBe(false);
      expect(depth2Comparator([[1]], [[1]])).toBe(true);
      expect(depth2Comparator([1, [1]], [[1]])).toBe(false);
      expect(depth2Comparator([1, [1]], [1, [1]])).toBe(true);

      expect(depth2Comparator([1, [1, []]], [1, [1, []]])).toBe(false);

      expect(depth2Comparator({}, {})).toBe(true);
      expect(depth2Comparator({}, {a: 1})).toBe(false);
      expect(depth2Comparator({a: 1}, {a: 1})).toBe(true);
      expect(depth2Comparator({a: 1, b: 1}, {a: 1})).toBe(false);
      expect(depth2Comparator({a: 1, b: 1}, {a: 1, c: 1})).toBe(false);
      expect(depth2Comparator({a: 1, b: 1}, {b: 1, a: 1})).toBe(true);

      expect(depth2Comparator({a: {}}, {a: {}})).toBe(true);
      expect(depth2Comparator({a: {}}, {a: {a: 1}})).toBe(false);
      expect(depth2Comparator({a: {a: 1}}, {a: {a: 1}})).toBe(true);
      expect(depth2Comparator({b: 1, a: {a: 1}}, {a: {a: 1}})).toBe(false);
      expect(depth2Comparator({b: 1, a: {a: 1}}, {b: 1, a: {a: 1}}))
        .toBe(true);

      expect(depth2Comparator({b: 1, a: {a: {}}}, {b: 1, a: {a: {}}}))
        .toBe(false);
    });
  });
});
