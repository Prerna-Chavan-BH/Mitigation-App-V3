import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  private idCounter = 1;

  constructor() { }

  getNextId(): number {
    return this.idCounter++;
  }

  resetIdCounter(): void {
    this.idCounter = 1;
  }

}