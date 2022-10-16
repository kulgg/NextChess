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
        <div
          className="flex cursor-pointer flex-row items-center gap-1"
          onClick={() =>
            navigator.clipboard.writeText(
              `${env.NEXT_PUBLIC_HOST}/game/${gameId}/${
                color === "w" ? "b" : "w"
              }`
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
          <div>Copy Invite Link</div>
        </div>
        <div className="my-5"></div>
        <div className="text-xl">Waiting for other player...</div>
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
