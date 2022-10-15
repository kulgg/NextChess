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
  let classString = isDark ? "bg-stone-200" : "bg-lime-700";
  let inlineStyle = {};

  if (piece) {
    classString += " bg-cover";
    inlineStyle = {
      backgroundImage: `url('/assets/${piece.color}${piece.type}.svg')`,
    };
  }

  console.log(classString);

  return <div className={classString} style={inlineStyle}></div>;
};

export default Square;
