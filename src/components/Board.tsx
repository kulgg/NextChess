import { Chess } from "chess.js";
import {
  Color,
  Move,
  PieceSymbol,
  Square as SquareType,
} from "chess.js/src/chess";
import { Dispatch, SetStateAction, useState } from "react";
import {
  get_square_by_indeces,
  get_target_move,
  is_square_possible_move_target,
} from "../utils/square";
import Square from "./Square";

export type BoardType = ({
  square: SquareType;
  type: PieceSymbol;
  color: Color;
} | null)[][];

const Board = ({
  game,
  setIsCheck,
  setIsGameOver,
}: {
  game: Chess;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
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
      setIsCheck(game.isCheck());
      setIsGameOver(game.isGameOver());
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
