import { nanoid } from "nanoid";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";

export function createGame(router: NextRouter) {
  router.push(`/game/${nanoid()}/${Math.random() <= 0.5 ? "w" : "b"}`);
}

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <button
        className="inline-flex w-52 justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
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
