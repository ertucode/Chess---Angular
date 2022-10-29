import { Vector2 } from "./math/vector2";
import { ValueOf } from "./typescript.utils"

export const PIECE = {
    KING: "king",
    QUEEN: "queen",
    ROOK: "rook",
    BISHOP: "bishop",
    KNIGHT: "knight",
    PAWN: "pawn"
} as const

export const SIDE = {
    WHITE: "white",
    BLACK: "black"
} as const

export type PieceType = ValueOf<typeof PIECE>;
export type Side = ValueOf<typeof SIDE>;

export type PieceSrc = `assets/pieces/${PieceType}_${Side}.png`

type HOR_LOC = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type VER_LOC = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type LOCATION = `${HOR_LOC}${VER_LOC}`

export interface PieceInput {
    type: PieceType,
    side: Side,
    loc: Vector2
}