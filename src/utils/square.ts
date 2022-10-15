import { Square as SquareType, Move } from "chess.js/src/chess";

const get_square_by_indeces = (
  rowIndex: number,
  colIndex: number
): SquareType => {
  return `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}` as SquareType;
};

const is_square_possible_move_target = (
  moves: Move[],
  square: SquareType
): boolean => {
  for (const x of moves) {
    if (x.to === square) {
      return true;
    }
  }

  return false;
};

const get_target_move = (moves: Move[], square: SquareType): string => {
  for (const x of moves) {
    if (x.to === square) {
      return x.san;
    }
  }

  return "";
};

export {
  get_square_by_indeces,
  is_square_possible_move_target,
  get_target_move,
};
