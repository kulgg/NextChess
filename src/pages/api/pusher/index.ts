import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.PUSHER_CLUSTER,
  useTLS: true,
});

export type GameEvent = {
  sender: "w" | "b";
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, sender }: GameEvent = req.body;

  const response = await pusher.trigger("game", "game-event", {
    message,
    sender,
  });

  res.json({ message: "completed" });
}
