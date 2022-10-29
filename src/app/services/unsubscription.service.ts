import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class UnsubscriptionService {

  isDead$ = new Subject<void>()

  constructor() { }

  subscribe = <T>(observable: Observable<T>) => {
    return observable.pipe(
      takeUntil(this.isDead$)
    )
  }

  onDestroy() {
    this.isDead$.next()
  }
}
