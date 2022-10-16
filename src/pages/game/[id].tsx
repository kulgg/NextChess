import { Chess } from "chess.js";
import { useRouter } from "next/router";
import { useState } from "react";
import Board from "../../components/Board";

const game = new Chess();

interface Props {
  id: string;
}

const Game: React.FC<Props> = ({ id }) => {
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

const GamePage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }

  return <Game id={id} />;
};

export default GamePage;
