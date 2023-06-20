import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalStateService {
  private langSubject = new BehaviorSubject<string>('it');
  lang$ = this.langSubject.asObservable();

  private category = new BehaviorSubject<string>("");
  categ$ = this.category.asObservable();

  setLanguage(lang: string): void {
    this.langSubject.next(lang);
  }

  setCategory(categ: string): void {
    this.category.next(categ);
  }
}
