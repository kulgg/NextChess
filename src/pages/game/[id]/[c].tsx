import axios from "axios";
import { Chess, Color, PieceSymbol, Square as SquareType } from "chess.js";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import Board from "../../../components/Board";
import { env } from "../../../env/client.mjs";
import { GameEvent } from "../../api/pusher";

const game = new Chess();

interface Props {
  gameId: string;
  color: Color;
}

export type BoardType = ({
  square: SquareType;
  type: PieceSymbol;
  color: Color;
} | null)[][];

const Game: React.FC<Props> = ({ gameId, color }) => {
  const [board, setBoard] = useState<BoardType>(game.board());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isCheck, setIsCheck] = useState(game.isCheck());
  const [isGameOver, setIsGameOver] = useState(game.isGameOver());

  function postMove(move: string) {
    const moveEvent: GameEvent = {
      message: move,
      gameEvent: "move",
      sender: color,
      gameId: gameId,
    };
    axios.post("/api/pusher", moveEvent);
  }

  useEffect(() => {
    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);

    channel.bind("start", function (data: GameEvent) {
      setIsGameStarted(true);
      game.load(data.message);
      setBoard(game.board());
    });

    channel.bind("join", function (data: GameEvent) {
      if (data.sender !== color) {
        const startEvent: GameEvent = {
          message: game.fen(),
          gameEvent: "start",
          sender: color,
          gameId: gameId,
        };
        axios.post("/api/pusher", startEvent);
      }
    });

    channel.bind("move", function (data: GameEvent) {
      console.log(data, "move");
      if (data.sender !== color) {
        game.move(data.message);
        setBoard(game.board());
        setIsCheck(game.isCheck());
        setIsGameOver(game.isGameOver());
      }
    });

    const joinEvent: GameEvent = {
      message: "",
      gameEvent: "join",
      sender: color,
      gameId: gameId,
    };
    const timeout = setTimeout(() => {
      axios
        .post("/api/pusher", joinEvent)
        .then((x) => console.log(x, "request"));
    }, 500);

    return () => {
      pusher.unsubscribe(gameId);
      clearTimeout(timeout);
    };
  }, []);

  if (!isGameStarted) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-lg">
        Waiting for other player...
      </div>
    );
  }

  return (
    <div>
      <div className="my-4 h-6 text-xl">
        {isGameOver ? "Check Mate" : isCheck ? "Check" : ""}
      </div>
      <Board
        game={game}
        setIsCheck={setIsCheck}
        setIsGameOver={setIsGameOver}
        color={color}
        board={board}
        setBoard={setBoard}
        postMove={postMove}
      />
    </div>
  );
};

const GamePage = () => {
  const { query } = useRouter();
  const { id, c } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }

  if (!c || typeof c !== "string" || (c != "w" && c != "b")) {
    return <div>No ID</div>;
  }

  return <Game gameId={id} color={c} />;
};

export default GamePage;
