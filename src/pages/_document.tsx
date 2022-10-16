import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>NextChess</title>
        <meta name="description" content="Online Chess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-800 text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
