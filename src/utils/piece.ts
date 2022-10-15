export enum PieceType {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn,
}

export enum ColorType {
  White,
  Black,
}

export class Piece {
  position: string;
  color: ColorType;
  dead: boolean;

  constructor(position: string, color: ColorType, dead: boolean) {
    this.position = position;
    this.color = color;
    this.dead = dead;
  }

  getMoves(): string[] {
    throw new Error("Not Implemented");
  }
}

export class Pawn extends Piece {}
