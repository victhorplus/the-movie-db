import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'

import { GeneroService } from './services/genero.service';

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
    private router: Router
  ){
    this.inscription = this.getAllGenres();
  }

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

}
