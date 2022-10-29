import { Injectable } from '@angular/core';
import { fromEvent, map, switchMap, takeUntil, tap, last, filter } from 'rxjs';
import { PieceService } from '../components/pieces/piece.service';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

  constructor(private pieceService: PieceService) { }

  createDraggableElement(element: HTMLElement, conditionFn: () => boolean = () => true) {
    const mouseDown$ = fromEvent<MouseEvent>(element, 'mousedown');

    const parent = this.getParentWithRelativePositioning(element)
  
    const dragStart$ = mouseDown$.pipe(filter(() => conditionFn()));
    const dragMove$ = dragStart$.pipe(
      switchMap(start =>
        this.mouseMove$.pipe(
          map((moveEvent) => ({
            originalEvent: moveEvent,
            left: moveEvent.x - parent.offsetLeft - this.pieceService.pieceSize / 2,
            bottom: parent.offsetHeight - (moveEvent.y - parent.offsetTop) - this.pieceService.pieceSize / 2
          })),
          takeUntil(this.mouseUp$)
        )
      )
    );

    const dragEnd$ = dragStart$.pipe(
      switchMap(() =>
        this.mouseMove$.pipe(
          takeUntil(this.mouseUp$),
          last(),
        )
      )
    );

    return {dragStart$, dragMove$, dragEnd$} as const
  }

  getParentWithRelativePositioning(element: HTMLElement) {
    let parent: HTMLElement | null = element.parentElement
    while (parent) {
      if (getComputedStyle(parent).getPropertyValue("position") === "relative") {
        break
      }
      parent = parent.parentElement
    }
    return parent || document.documentElement
  }
}
