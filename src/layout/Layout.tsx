import Head from "next/head";
import Link from "next/link";

export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Head>
        <title>NextChess</title>
        <meta name="description" content="Online Chess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="px-1 py-2 sm:px-3">
        <h1 className="text-2xl font-semibold">
          <Link href="/">NextChess</Link>
        </h1>
      </header>
      <main className="container py-2">{children}</main>
      <footer className="text-md font-cabin px-3 py-2">
        by{" "}
        <a className="text-blue-400 hover:text-blue-300" href="https://kul.gg">
          kul.gg
        </a>
      </footer>
    </div>
  );
}
