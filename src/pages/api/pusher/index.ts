import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";
import Pusher from "pusher";
import { Color } from "chess.js/src/chess.js";

const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.PUSHER_CLUSTER,
  useTLS: true,
});

export type GameEvent = {
  gameId: string;
  gameEvent: "join" | "start" | "move";
  sender: Color;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, sender, gameId, gameEvent }: GameEvent = req.body;

  const response = await pusher.trigger(gameId, gameEvent, {
    gameId,
    gameEvent,
    message,
    sender,
  });

  res.json({ message: "completed" });
}
