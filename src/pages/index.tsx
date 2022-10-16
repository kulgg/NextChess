import { SyntheticEvent, useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { GameEvent } from "./api/pusher";
import { NextPage } from "next";
import { env } from "../env/client.mjs";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <button
        className="rounded-2xl border border-gray-300 py-1 px-2 text-xl"
        onClick={() => {
          router.push(`/game/${nanoid()}/${Math.random() <= 0.5 ? "w" : "b"}`);
        }}
      >
        Create Game
      </button>
    </div>
  );
};

export default Home;
