import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  name="test name "
  constructor() { }

  getName(){
    return this.name;
  }
}
