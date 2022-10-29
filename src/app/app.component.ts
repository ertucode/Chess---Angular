import { Component } from '@angular/core';
import { PIECE, PieceInput, SIDE } from './api';
import { PieceService } from './components/pieces/piece.service';
import { Vector2 } from './math/vector2';
import { getInitialPiecePlacement } from './static/initialPlacement';
import { ValueOf } from './typescript.utils';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pieces = getInitialPiecePlacement()

  constructor(public pieceService: PieceService) {

  }

}
