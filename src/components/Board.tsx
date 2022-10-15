import { url } from "inspector";
import React, { useState } from "react";
import Square from "./Square";
import { Chess } from "chess.js";
import { PieceSymbol, Square as SquareType, Color } from "chess.js/src/chess";
import Piece from "./Piece";

const game = new Chess();

export type BoardType = ({
  square: SquareType;
  type: PieceSymbol;
  color: Color;
} | null)[][];

const Board = (): JSX.Element => {
  const [board, setBoard] = useState<BoardType>(game.board());

  return (
    <div className="chessboard grid grid-cols-8">
      {board.map((row, rowNumber) => {
        return row.map((piece, i) => {
          const alternatingRow = rowNumber % 2;

          return piece ? (
            <Square
              isDark={i % 2 == alternatingRow}
              piece={{ type: piece.type, color: piece.color }}
            />
          ) : (
            <Square isDark={i % 2 == alternatingRow} />
          );
        });
      })}
    </div>
  );
};

export default Board;
