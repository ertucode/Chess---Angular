import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, startWith, tap, map } from 'rxjs';
import { LOCATION, PieceSrc, PieceType, Side } from 'src/app/api';
import { POSITION_1D, Vector2 } from 'src/app/math/vector2';
import { DragService } from 'src/app/services/drag.service';
import { UnsubscriptionService } from 'src/app/services/unsubscription.service';
import { PieceService } from '../piece.service';

type PieceClass = "moving" | "stationary"

@Component({
  selector: 'chess-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
  providers: [UnsubscriptionService]
})
export class PieceComponent implements OnInit {

  @Input() src!: PieceSrc
  @Input() side!: Side
  @Input() type!: PieceType

  _loc!: Vector2
  _activeLoc!: Vector2

  dragStart$!: ReturnType<typeof this.dragService.createDraggableElement>["dragStart$"]
  dragMove$!: ReturnType<typeof this.dragService.createDraggableElement>["dragMove$"]
  dragEnd$!: ReturnType<typeof this.dragService.createDraggableElement>["dragEnd$"]

  pieceClass$!: Observable<PieceClass>

  @Input()
  set loc(value: Vector2) {
    this.x = value.x
    this.y = value.y
    this._loc = value
    this.activeLoc = value
  }

  set activeLoc(value: Vector2) {
    this.pieceImg.nativeElement.style.setProperty("--active-loc-x", this.pieceService.calcActiveLoc(value.x))
    this.pieceImg.nativeElement.style.setProperty("--active-loc-y", this.pieceService.calcActiveLoc(value.y))
    this._activeLoc = value
  }

  set x(value: POSITION_1D) {
    this.pieceImg.nativeElement.style.setProperty("--loc-x", String(value))
  }

  set y(value: POSITION_1D) {
    this.pieceImg.nativeElement.style.setProperty("--loc-y", String(value))
  }

  @ViewChild("pieceImg", {static: true}) pieceImg!: ElementRef<HTMLImageElement>;

  constructor(private pieceService: PieceService, private dragService: DragService, private unsubService: UnsubscriptionService) {
    
  }

  ngOnInit(): void {

    ({
      dragStart$: this.dragStart$,
      dragMove$: this.dragMove$,
      dragEnd$: this.dragEnd$,
    } = 
    this.dragService.createDraggableElement(this.pieceImg.nativeElement))

    this.pieceClass$ = merge(this.dragStart$.pipe(map(() => "moving" as const)), this.dragEnd$.pipe(map(() => "stationary" as const)))

    /**
     * dragStart
     *  set moving class
     *  
     * dragMove
     *  set activeLoc
     * 
     * dragEnd
     *  check currentLoc,
     *    if okay set loc
     *    if not set active loc to loc
     * 
     */
  }

  setPieceActive() {

  }

  getPieceActiveLoc() {

  }
}
