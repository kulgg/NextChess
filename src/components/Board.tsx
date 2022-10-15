import { url } from "inspector";
import React from "react";
import Square from "./Square";

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
          <Square isDark={false} />
        ) : (
          <Square isDark={true} />
        );
      })}
    </div>
  );
};

export default Board;
