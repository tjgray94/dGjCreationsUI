import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor() { }

  private badgeCountSubject = new BehaviorSubject<number>(0);
  badgeCount$ = this.badgeCountSubject.asObservable();

  incrementBadgeCount() {
    this.badgeCountSubject.next(this.badgeCountSubject.value + 1);
  }

  resetBadgeCount() {
    this.badgeCountSubject.next(0);
  }
}
