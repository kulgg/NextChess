import { PieceSymbol, Color } from "chess.js/src/chess";

const Square = ({
  piece,
  isDark,
}: {
  piece?: {
    type: PieceSymbol;
    color: Color;
  };
  isDark: boolean;
}): JSX.Element => {
  const classString = isDark
    ? "bg-stone-200 bg-knight bg-cover"
    : "bg-lime-700 bg-knight bg-cover";

  return <div className={classString}></div>;
};

export default Square;
