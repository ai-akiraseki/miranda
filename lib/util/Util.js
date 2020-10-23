/**
 * Generic utilities.
 */
class Util {
    /**
     * Merges two arrays together.
     * @param {Array} arr The first array.
     * @param {Array<*>} arr2 The array to merge.
     * @returns {Array<number>} The new array.
     */
    static merge(arr, arr2) {
        arr = [...arr, ...arr2];
        return arr;
    }
}

module.exports = Util;