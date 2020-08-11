import { Component } from '@angular/core';

import { FilmeService } from './services/filme.service';
import { GeneroService } from './services/genero.service';
import { Filme } from './models/filme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filmes: Filme[] = [];
  generos = [];
  total_pages: number;
  actual_page: number;

  constructor(
    private filmeService: FilmeService,
    private genreService: GeneroService
  ){
    // this.getFilmes();
    // this.getFilmesByGenre(18);
    // this.getFilmesByTitle('amor');
    // this.getFilmeById(2);
    this.getAllGenres()
  }
  
  getFilmes(page = 1){
    this.filmeService.getFilmes(page).subscribe(result => {
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      this.filmes = result['results'];
    });
  }

  getFilmesByGenre(genre_id, page = 1){
    this.filmeService.getFilmesByGenero(genre_id, page).subscribe(result=>{
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      this.filmes = result['results'];
    });
  }


  getFilmesByTitle(title, page = 1){
    this.filmeService.getFilmesByTitle(title, page).subscribe(result => {
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      this.filmes = result['results'];
    });
  }
  
  getFilmeById(id){
    this.filmeService.getFilmeById(id).subscribe(result=>{
      let filme: Filme = {
        id: result['id'],
        title: result['title'],
        overview: result['overview'],
        genre_ids: [],
        poster_path: result['poster_path'],
        backdrop_path: result['backdrop_path'],
        popularity: result['popularity']
      }
      for(let genre of result['genres']){
        filme.genre_ids.push(genre['id'])
      }
      this.filmes.push(filme)
    });
  }

  getAllGenres(){
    this.genreService.getAllGenres().subscribe(result =>{
      this.generos = result['genres']
    });
  }
}
