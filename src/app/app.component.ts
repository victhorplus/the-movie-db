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
  total_pages: number;
  actual_page: number;

  constructor(
    private filmeService: FilmeService
  ){
    // this.getFilmes();
     this.getFilmesByGenre(18);
    // this.getFilmesByTitle('amor')
  }
  
  getFilmes(page = 1){
    this.filmeService.getFilmes(page).subscribe(result => {
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      this.filmes = result['results'];
    })
  }

  getFilmesByGenre(genre_id, page = 1){
    this.filmeService.getFilmesByGenero(genre_id, page).subscribe(result=>{
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      this.filmes = result['results'];
    })
  }

  /*
  getFilmesByTitle(title, page = 1){
    this.filmeService.getFilmesByTitle(title, page).subscribe(result => {
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      this.filmes = result['results'];
    });
  }
  */
}
