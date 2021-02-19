import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'

import Font from 'modulo01-victhor';
import { GeneroService } from './services/genero.service';
import { FontService } from './services/font.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  generos = [];
  inscription: Subscription;

  constructor(
    private genreService: GeneroService,
    private router: Router,
    private fontService: FontService
  ){
    this.inscription = this.getAllGenres();
  }

  ngOnInit(){ }

  ngOnDestroy(){
    this.inscription.unsubscribe();
  }
  getAllGenres(){
    return this.genreService.getAllGenres().subscribe(result =>{
      this.generos = result['genres']
    });
  }

  search(title){
    var route = ['/main']
    if(title)
      route.push(title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(route));
  }

  incrementFontSize(){
    let context = document;
    this.fontService.incrementFontSize(context);
  }

  decrementFontSize(){
    let context = document;
    this.fontService.decrementFontSize(context);
  }

  reset(){
    let context = document;
    this.fontService.reset(context);
  }
}
