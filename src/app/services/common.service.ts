import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  // Set Local Storage
  setLocalStorageValue(key: string, value: any) {
    const serValue = JSON.stringify(value);
    localStorage.setItem(key, serValue);
  }

  getLocalStorageValue(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
