import { Chess } from "chess.js";

const chess = new Chess();

chess.move({ from: "a2", to: "a4" });
console.log(chess.ascii());
console.log(chess.board());
