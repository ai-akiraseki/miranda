/**
 * Utilities for binary operations, mostly for switching things to decimal.
 * This isn't exactly binary, but who cares.
 */
class BinaryUtil {
    /**
     * Chunks a string by size, usually for splitting hexadecimal strings.
     * @param {string} string The string to split.
     * @param {number} size The length to split by.
     * @returns {Array<string>} The array of split strings.
     */
    static chunk(string, size = 2) {
        return string.match(new RegExp(`.{1,${size}}`, "g"))
    }

    /**
     * Turns hexadecimal into decimal.
     * @param {string} str The hexadecimal string.
     * @returns {Array<number>} The array of decimal values.
     */
    static hex(str) {
        str = BinaryUtil.chunk(str);
        let dec = [];

        str.forEach(h => dec.push(parseInt(h, 16)));
        return dec;
    }

    /** 
     * Turns a string into decimal.
     * @param {string} str The string.
     * @returns {Array<number>} The array of decimal values.
     */
    static decimal(str) {
        return [...str].map(char => char.charCodeAt(0));
    }
}

module.exports = BinaryUtil;