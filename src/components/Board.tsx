import { Chess } from "chess.js";
import { Color, Move, Square as SquareType } from "chess.js/src/chess";
import { useState } from "react";
import { BoardType } from "../pages/game/[id]/[c]";
import {
  get_square_by_indeces,
  get_target_move,
  is_square_possible_move_target,
} from "../utils/square";
import Square from "./Square";

const Board = ({
  game,
  color,
  board,
  postMove,
}: {
  game: Chess;
  color: Color;
  board: BoardType;
  postMove: (move: string) => void;
}): JSX.Element => {
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  const [activePiece, setActivePiece] = useState<SquareType | null>(null);

  const handleSquareClick = (square: SquareType, isTarget: boolean) => {
    if (isTarget) {
      setActivePiece(null);
      setPossibleMoves([]);
      const moveSanString = get_target_move(possibleMoves, square);
      postMove(moveSanString);
    } else {
      setActivePiece(square);
      setPossibleMoves(game.moves({ verbose: true, square: square }) as Move[]);
    }
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
              handleClick={() =>
                (isTarget || piece?.color === color) &&
                handleSquareClick(square, isTarget)
              }
              highlighted={isTarget}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
