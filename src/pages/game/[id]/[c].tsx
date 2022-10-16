import axios from "axios";
import { Chess, Color, PieceSymbol, Square as SquareType } from "chess.js";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import Board from "../../../components/Board";
import GameFinishedModal from "../../../components/GameFinishedModal";
import WaitForPlayer from "../../../components/WaitForPlayer";
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

  function updateGameState() {
    setBoard(game.board());
    setIsCheck(game.isCheck());
    setIsGameOver(game.isGameOver());
  }

  useEffect(() => {
    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);

    channel.bind("start", function (data: GameEvent) {
      setIsGameStarted(true);
      game.load(data.message);
      updateGameState();
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
      game.move(data.message);
      updateGameState();
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
      <WaitForPlayer
        inviteUrl={`${env.NEXT_PUBLIC_HOST}/game/${gameId}/${
          color === "w" ? "b" : "w"
        }`}
      />
    );
  }

  let gameResult = "";
  if (isGameOver) {
    if (game.isDraw()) {
      gameResult = "Draw";
    } else {
      gameResult = game.turn() === "w" ? "Black won" : "White won";
    }
  }

  return (
    <div>
      {isGameOver && <GameFinishedModal result={gameResult} />}
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
