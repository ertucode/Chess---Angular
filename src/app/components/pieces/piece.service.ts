import { Injectable } from '@angular/core';
import { PieceInput, PieceSrc } from 'src/app/api';
import { POSITION_1D } from 'src/app/math/vector2';

type ValWithPx = `${number}px`

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  pieceSize: number;
  cellSize: number;

  private bodyElement = document.querySelector("body") as HTMLBodyElement

  constructor() {
    this.pieceSize = this.removePx((getComputedStyle(this.bodyElement).getPropertyValue("--piece-size") as ValWithPx))
    this.cellSize = this.removePx((getComputedStyle(this.bodyElement).getPropertyValue("--cell-size") as ValWithPx))
  }

  get gridSize() {
    return 8 * this.cellSize
  }

  getPieceSrc(piece: PieceInput): PieceSrc {
    return `assets/pieces/${piece.type}_${piece.side}.png`
  }

  calcActiveLoc(loc: POSITION_1D): ValWithPx {
    return `${this.cellSize * (loc - 0.5) - this.pieceSize / 2}px`
  }

  removePx(val: ValWithPx) {
    const div = document.createElement("div")
    this.bodyElement.appendChild(div)
    div.style.width = val
    
    const width = getComputedStyle(div).getPropertyValue("width")
    div.remove()

    return parseInt(width.slice(0, -2))
  }

  
}
