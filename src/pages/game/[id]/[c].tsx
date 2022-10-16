import axios from "axios";
import { Chess, Color } from "chess.js";
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

const Game: React.FC<Props> = ({ gameId, color }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isCheck, setIsCheck] = useState(game.isCheck());
  const [isGameOver, setIsGameOver] = useState(game.isGameOver());

  useEffect(() => {
    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);

    channel.bind("start", function (data: GameEvent) {
      console.log("Receiving start event");
    });

    channel.bind("join", function (data: GameEvent) {
      console.log("Receiving join event");
      console.log(data);
      const startEvent: GameEvent = {
        message: "",
        gameEvent: "start",
        sender: color,
        gameId: gameId,
      };
      axios.post("/api/pusher", startEvent);
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
    }, 200);

    return () => {
      pusher.unsubscribe(gameId);
      clearTimeout(timeout);
    };
  }, []);

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
