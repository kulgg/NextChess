import React from "react";
import Piece from "./Piece";

const Square = ({
  piece,
  isDark,
}: {
  piece?: JSX.Element;
  isDark: boolean;
}): JSX.Element => {
  const classString = isDark ? "bg-stone-200" : "bg-lime-700";

  return <div className={classString}>{piece}</div>;
};

export default Square;
