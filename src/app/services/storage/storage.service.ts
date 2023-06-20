import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  getStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)!);
  }

  setStorage<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  clear(): void {
    localStorage.clear();
  }
}
