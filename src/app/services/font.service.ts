import { Injectable } from '@angular/core';

import Font from 'modulo01-victhor';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  fontSize = 0;

  constructor() { }

  incrementFontSize(context){
    this.fontSize++;
    Font.changeFontSize(this.fontSize, context);
  }

  decrementFontSize(context){
    this.fontSize--;
    Font.changeFontSize(this.fontSize, context);
  }

  reset(context){
    Font.resetFontSize(context);
    this.fontSize = 0;
  }

}
