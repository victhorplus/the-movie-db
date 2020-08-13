import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { GeneroService } from '../services/genero.service';
import { FilmeService } from '../services/filme.service';
import { Subscription } from 'rxjs';
import { Filme } from '../models/filme';
import { Config } from '../config'

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.css']
})
export class MovieGenreComponent implements OnInit {
  filmes: Filme[];
  genre_id;
  genre_obj;
  inscription: Subscription; 
  total_pages: number;
  actual_page: number;
  config = Config;

  constructor(
    private route: ActivatedRoute,
    private generoService: GeneroService,
    private filmeService: FilmeService
  ){
    this.inscription = this.route.params.subscribe(params =>{
      this.genre_id = params['id'];
      this.getFilmesByGenre(this.genre_id);
      this.getGenreById(this.genre_id);
    });
    
  }

  ngOnInit(): void {  }

  ngOnDestroy(){
    this.inscription.unsubscribe();
  }

  getFilmesByGenre(genre_id, page = 1){
    this.filmeService.getFilmesByGenero(genre_id, page).subscribe(result=>{
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];

      // Laço para adicionar genre_obj dos filmes e adicionar url base das imagens
      var filmes = result['results'];
      for(let filme of filmes){
        filme.genre_obj = this.getGenreByFilme(filme)

        // adicionando url base da api para images
        filme.poster_path = this.config.api_url_image + '/w200' + filme.poster_path;
        this.filmes = filmes;
      }
    });
  }

  async getGenreByFilme(filme: Filme){
    var genre_ids = [];
    for(let genre_id of filme.genre_ids){
      this.generoService.getGenreById(genre_id).subscribe(result => {
        genre_ids.push(result)
      });
    }
    filme.genre_obj = await genre_ids;
}

getGenreById(id){
  this.generoService.getGenreById(id).subscribe(result => {
    this.genre_obj = result;
  })
}

}
