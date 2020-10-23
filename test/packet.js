const Packet = require("../lib/structures/Packet");

let packet = new Packet()

packet.write("MHn1", "String1");
packet.write("MHn2", "String12");
packet.write("MHn3", "String123");

console.log("Packet:")
console.log(packet);
console.log("")
console.log("Constructed Packet:")
console.log(packet.construct())
console.log("")
console.log("Parsed Packet:")
console.log(Packet.parse(packet.construct()))