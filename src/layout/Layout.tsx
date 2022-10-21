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
      <footer className="px-3 py-2 font-semibold">
        by{" "}
        <a href="https://kul.gg" className="text-blue-300 hover:text-blue-400">
          kul.gg
        </a>
      </footer>
    </div>
  );
}
