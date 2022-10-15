import { PieceSymbol, Color } from "chess.js/src/chess";

export type PieceType = {
  type: PieceSymbol;
  color: Color;
} | null;

const Square = ({
  piece,
  isDark,
  handleClick,
  highlighted,
}: {
  piece: PieceType;
  isDark: boolean;
  handleClick: () => void;
  highlighted: boolean;
}): JSX.Element => {
  let classString = isDark ? "bg-stone-200" : "bg-lime-700";
  let inlineStyle = {};

  if (piece) {
    classString += " bg-cover";
    inlineStyle = {
      backgroundImage: `url('/assets/${piece.color}${piece.type}.svg')`,
    };
  }

  classString += highlighted ? " opacity-60" : "";

  return (
    <div
      className={classString}
      style={inlineStyle}
      onClick={handleClick}
    ></div>
  );
};

export default Square;
