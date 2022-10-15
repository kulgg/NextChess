import React, { useState } from "react";
import Square from "./Square";
import { Chess } from "chess.js";
import {
  PieceSymbol,
  Square as SquareType,
  Color,
  Move,
} from "chess.js/src/chess";
import {
  get_square_by_indeces,
  get_target_move,
  is_square_possible_move_target,
} from "../utils/square";

const game = new Chess();

export type BoardType = ({
  square: SquareType;
  type: PieceSymbol;
  color: Color;
} | null)[][];

const Board = (): JSX.Element => {
  const [board, setBoard] = useState<BoardType>(game.board());
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [activePiece, setActivePiece] = useState<SquareType | null>(null);

  if (game.isGameOver()) console.log("game over");
  if (game.isCheck()) console.log("check");
  if (game.isCheckmate()) console.log("checkmate");

  const handleSquareClick = (square: SquareType, isTarget: boolean) => {
    if (isTarget) {
      setActivePiece(null);
      setPossibleMoves([]);
      game.move(get_target_move(possibleMoves, square));
      setBoard(game.board());
      return;
    }

    setActivePiece(square);
    setPossibleMoves(game.moves({ verbose: true, square: square }) as Move[]);
  };

  return (
    <div className="chessboard grid grid-cols-8">
      {board.map((row, rowNumber) => {
        return row.map((piece, colNumber) => {
          const alternatingRow = rowNumber % 2;
          const square = get_square_by_indeces(rowNumber, colNumber);
          const isTarget = is_square_possible_move_target(
            possibleMoves,
            square
          );

          return (
            <Square
              isDark={colNumber % 2 == alternatingRow}
              piece={piece}
              key={square}
              handleClick={() => handleSquareClick(square, isTarget)}
              highlighted={isTarget}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
