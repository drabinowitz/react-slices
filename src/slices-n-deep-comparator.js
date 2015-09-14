function compareAtDepth (totalDepth, currentDepth=0, valA, valB) {
  if (valA !== valB) {
    // if at depth dont deep compare
    if (currentDepth === totalDepth) {
      return false;
    }

    // test if object/array
    if ((typeof valA === 'object' && valA !== null) &&
        (typeof valB === 'object' && valB !== null)) {

      // if both are arrays
      if (Array.isArray(valA) && Array.isArray(valB)) {

        // test if array lengths are equal
        if (valA.length !== valB.length) {
          return false;

        } else {
          // compare each index at next depth
          for (var i = 0; i < valA.length; i++) {
            if (!compareAtDepth(totalDepth, currentDepth+1, valA[i], valB[i])) {
              return false;
            }
          }
        }

      // if both are objects
      } else if (!Array.isArray(valA) && !Array.isArray(valB)) {
        valAkeys = valA.keys();
        valBkeys = valB.keys();

        // if object keys lengths are equal
        if (valAkeys.length !== valBkeys.length) {
          return false;

        } else {
          // compare each key at next depth
          for (var i = 0; i < valAKeys.length; i++) {
            let valAi = valA[valAkeys[i]];

            // ignore key order
            let valBi = valB[valAkeys[i]];

            if (!compareAtDepth(totalDepth, currentDepth+1, valAi, valBi)) {
              return false;
            }
          }
        }

      // one value is an array the other is an object
      } else {
        return false
      }

    // at least one value is not an array or an object
    } else {
      return false;
    }
  }
  return true;
}

export default function nDepthComparator (depth) {
  return compareAtDepth.bind(null, depth, 0);
}
