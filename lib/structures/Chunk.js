/**
 * A portion of a packet, with a defined length.
 */
class Chunk {
    constructor(name, data = Buffer.alloc(0)) {
        if (name.length !== 4) throw new RangeError("The length of the name is too long, or too short.");
        /**
         * The name of the chunk. Must be 4 characters.
         * @type {string}
         */
        this.name = name;

        /**
         * The data belonging to the chunk. An interchangable buffer.
         * @type {Buffer}
         */
        this.data = data;
    }

    /**
     * The current length of the chunk, excluding the chunk's name.
     */
    get length() {
        return this.data.length;
    }

    /**
     * Gets the current length of the chunk, in stringified hexadecimal.
     */
    get hexlength() {
        return this.length.toString(16).padStart(4, "0");
    }

    /**
     * Whether or not the chunk data is empty or not
     */
    get empty() {
        let arr = 0;
        for (let b of this.data.values())
            if (b !== 0) arr++;

        return arr == 0;
    }

    /**
     * Writes data to the chunk's buffer.
     * @param {string} data The data to write.
     */
    write(data) {
        if (this.empty) this.data = Buffer.alloc(0);
        let databuf;

        if (typeof data == "string") {
            databuf = Buffer.from(data);
        } else if (data instanceof Buffer) {
            databuf = data;
        }

        let buf;
        if (this.length < (this.length + databuf.length)) {
            buf = Buffer.alloc(this.length + databuf.length);
            let offs = 0;
            for (let int of this.data.values()) {
                buf.writeUInt8(int, offs)
                offs++
            }

            for (let int of databuf.values()) {
                buf.writeUInt8(int, offs)
                offs++
            }
        } else {
            buf = this.data;
            for (let int of databuf.values()) {
                buf.writeUInt8(int);
            }
        }

        this.data = buf;
    }

    /**
     * Overwrites the chunks buffer, and creates a new one.
     * @param {string} data The data to overwrite with.
     */
    overwrite(data) {
        // easy
        this.data = Buffer.alloc(0);
        this.write(data);
    }

    /**
     * Gets the proper data of the chunk.
     */
    buffer() {
        return Buffer.from(this.name + this.hexlength + this.data.toString("utf-8"));
    }
}

module.exports = Chunk;