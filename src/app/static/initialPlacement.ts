import { PIECE, PieceInput, SIDE } from "../api";
import { POSITION_1D, Vector2 } from "../math/vector2";

const GRID_SIZE = 8;

const SIDE_LOCS = {
    white: {
        first: 1,
        second: 2
    },
    black: {
        first: 8,
        second: 7
    }
} as const

const PIECES_AND_PLACES = [
    {type: PIECE.ROOK, places: [1, 8]},
    {type: PIECE.KNIGHT, places: [2, 7]},
    {type: PIECE.BISHOP, places: [3, 6]},
] as const


export const getInitialPiecePlacement = () => {
    const pieces: PieceInput[] = [] 
    for (const side of Object.values(SIDE)) {
        for (let i = 0; i < GRID_SIZE; i++) {
            pieces.push({type: PIECE.PAWN, side, loc: new Vector2((i + 1) as POSITION_1D, SIDE_LOCS[side].second)})
        }

        for (const piece of PIECES_AND_PLACES) {
            for (const place of piece.places) {
                pieces.push({type: piece.type, side, loc: new Vector2(place, SIDE_LOCS[side].first)})
            }
        }
    }

    pieces.push({type: PIECE.QUEEN, side: SIDE.WHITE, loc: new Vector2(4, 1)})
    pieces.push({type: PIECE.KING, side: SIDE.WHITE, loc: new Vector2(5, 1)})
    pieces.push({type: PIECE.QUEEN, side: SIDE.BLACK, loc: new Vector2(5, 8)})
    pieces.push({type: PIECE.KING, side: SIDE.BLACK, loc: new Vector2(4, 8)})

    return pieces
}