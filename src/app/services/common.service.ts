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
}
