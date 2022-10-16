import Head from "next/head";
import Link from "next/link";

export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className="">
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
    </div>
  );
}
