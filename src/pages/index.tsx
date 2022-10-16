import { nanoid } from "nanoid";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";

export function createGame(router: NextRouter) {
  router.push(`/game/${nanoid()}/${Math.random() <= 0.5 ? "w" : "b"}`);
}

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <button
        className="rounded-2xl border border-gray-300 py-1 px-2 text-xl"
        onClick={() =>
          router.push(`/game/${nanoid()}/${Math.random() <= 0.5 ? "w" : "b"}`)
        }
      >
        Create Game
      </button>
    </div>
  );
};

export default Home;
