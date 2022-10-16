import { Chess } from "chess.js";

const game = new Chess();
game.move("b4");
console.log(game.fen());
