import { Move, Square as SquareType } from "chess.js/src/chess";
import {
  get_square_by_indeces,
  is_square_possible_move_target,
} from "./square";

describe("get_square_by_indeces", () => {
  test("should map first square indeces", () => {
    expect(get_square_by_indeces(0, 0)).toEqual("a8");
  });

  test("should map last square indeces", () => {
    expect(get_square_by_indeces(7, 7)).toEqual("h1");
  });
});

describe("is_square_possible_move_target ", () => {
  test("should be target", () => {
    const moves: Move[] = [
      { color: "w", flags: "n", from: "e2", piece: "p", san: "e3", to: "e3" },
      { color: "w", flags: "n", from: "e2", piece: "p", san: "e4", to: "e4" },
    ];
    const square: SquareType = "e3";
    expect(is_square_possible_move_target(moves, square)).toBe(true);
  });
});
