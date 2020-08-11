import { Component } from '@angular/core';

import { FilmeService } from './services/filme.service'
import { Filme } from './model/filme'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filmes: Filme[];

  constructor(
    private filmeService: FilmeService
  ){
    this.getFilmes();
  }
  
  getFilmes(page=1){
    this.filmeService.getFilmes(page).subscribe(result => {
      this.filmes = result['results'];
      console.log(this.filmes)
    })
  }
}
