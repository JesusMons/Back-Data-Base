// menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuVisibleSubject = new BehaviorSubject<boolean>(true);
  menuVisible$ = this.menuVisibleSubject.asObservable();

  toggleMenu() {
    this.menuVisibleSubject.next(!this.menuVisibleSubject.value); // Alternar el valor
  }
}
