import { Chess } from "chess.js";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Board from "../components/Board";

const game = new Chess();

const Home: NextPage = () => {
  const [isCheck, setIsCheck] = useState(game.isCheck());
  const [isGameOver, setIsGameOver] = useState(game.isGameOver());

  return (
    <div className="">
      <Head>
        <title>NextChess</title>
        <meta name="description" content="Online Chess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-1 py-2 sm:px-3">
        <h1 className="text-2xl font-semibold">
          <a href="/">NextChess</a>
        </h1>
      </header>
      <main className="container py-2 ">
        <div className="my-4 h-6 text-xl">
          {isGameOver ? "Check Mate" : isCheck ? "Check" : ""}
        </div>
        <Board
          game={game}
          setIsCheck={setIsCheck}
          setIsGameOver={setIsGameOver}
        />
      </main>
    </div>
  );
};

export default Home;
