import { Head } from "next/document";

export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className="">
      <header className="px-1 py-2 sm:px-3">
        <h1 className="text-2xl font-semibold">
          <a href="/">NextChess</a>
        </h1>
      </header>
      <main className="container py-2">{children}</main>
    </div>
  );
}
