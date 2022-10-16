import { Chess } from "chess.js";
import type { NextPage } from "next";
import { useState } from "react";
import Board from "../components/Board";
import Layout from "../layout/Layout";

const game = new Chess();

const Home: NextPage = () => {
  const [isCheck, setIsCheck] = useState(game.isCheck());
  const [isGameOver, setIsGameOver] = useState(game.isGameOver());

  return (
    <div>
      <div className="my-4 h-6 text-xl">
        {isGameOver ? "Check Mate" : isCheck ? "Check" : ""}
      </div>
      <Board
        game={game}
        setIsCheck={setIsCheck}
        setIsGameOver={setIsGameOver}
      />
    </div>
  );
};

export default Home;
