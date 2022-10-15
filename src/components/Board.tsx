import { url } from "inspector";
import React from "react";

const Board = (): JSX.Element => {
  const game = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  return (
    <div className="chessboard grid grid-cols-8">
      {game.map((x, i) => {
        const alternatingRow = Math.floor(i / 8) % 2;
        return i % 2 == alternatingRow ? (
          <div className="bg-stone-200"></div>
        ) : (
          <div className="bg-lime-700"></div>
        );
      })}
    </div>
  );
};

export default Board;
