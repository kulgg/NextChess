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
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
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
