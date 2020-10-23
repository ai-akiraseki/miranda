const BinaryUtil = require("../util/BinaryUtil");
const Chunk = require("./Chunk");

/**
 * A basic binary creation, for handling easy transactions between two binaries.
 */
class Packet {
    constructor(packet = {}) {
        /**
         * The individual chunks belonging to the packet.
         * @type {Array<Chunk>}
         */
        this.chunks = packet.chunks || [];
    }

    /**
     * Gets the overall length of the packet.
     */
    get length() {
        return this.chunks.reduce(p, p2 => p.length + p2.length);
    }

    /**
     * 
     * @param {string} name The name of the chunk.
     * @param {string|buffer} data The data to write to the chunk.
     * @param {boolean} [overwrite=false] Whether or not to overwrite over all the data in the chunk.
     */
    write(name, data, overwrite = false) {
        let chunk = this.chunks.find(s => s.name == name);

        if (!chunk) {
            let buf = Buffer.alloc(data.length);
            let chunk = new Chunk(name, buf);
            chunk.write(data);

            this.chunks.push(chunk);
        } else !overwrite ? chunk.write(data) : chunk.overwrite(data); // funny
    }

    /**
     * Constructs the Packet into a proper byte buffer.
     */
    construct() {
        let bufs = [];
        for (let chunk of this.chunks) {
            bufs.push(chunk.buffer());
        }

        return Buffer.concat(bufs);
    }

    /**
     * Parsed some recieved data into chunks.
     * @param {Buffer} bytes 
     */
    static parse(bytes) {
        let chunks = [];
        let nameIndex = 0;
        let lenIndex = 4;

        for (let i = 0; i < bytes.length; i++) {
            let name = bytes.slice(nameIndex, nameIndex + 4).toString();
            let length = bytes.slice(lenIndex, lenIndex + 4).toString();
            
            if (name == "")
                break; // end

            let len = BinaryUtil.hex(length).reduce((s, s2) => s + s2);
            let end = lenIndex + 4 + len;

            let data = bytes.slice(lenIndex + 4, end);

            // start all over again
            nameIndex = end;
            lenIndex = end + 4;
            chunks.push(new Chunk(name, data))
        }

        return new Packet({
            chunks
        })
    }
}

module.exports = Packet;