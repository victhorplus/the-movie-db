import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmeService } from '../services/filme.service';
import { GeneroService } from '../services/genero.service';
import { Filme } from '../models/filme';
import { Config } from '../config';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() filmes: Filme[] = [];
  generos = {};
  total_pages: number;
  actual_page: number;
  config = Config;
  search_title;

  constructor(
    private filmeService: FilmeService,
    private generoService: GeneroService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getParams();
    if(this.search_title!=undefined){
      this.getFilmesByTitle(this.search_title);
    }else{
      this.getFilmes();
    }
  }


  getParams(){
    return this.route.params.subscribe(params=>{
      this.search_title = params['title'];
    });
  }
  getFilmes(page = 1){
    return this.filmeService.getFilmes(page).subscribe(async result => {
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];
      
      // Laço para adicionar genre_obj dos filmes e adicionar url base das imagens
      var filmes = result['results'];
      for(let filme of filmes){
        this.getGenreByFilme(filme)

        // adicionando url base da api para images
        if(filme.poster_path == undefined || filme.poster_path == null){
          filme.poster_path = 'assets/img_404.png';
        }else{
          filme.poster_path = this.config.api_url_image + '/w200' + filme.poster_path;
        }
      }
      this.filmes = filmes;
    });
  }


  getFilmesByTitle(title, page = 1){
    if(title==""){
      return this.getFilmes();
    }
    return this.filmeService.getFilmesByTitle(title, page).subscribe(result => {
      this.total_pages = result['total_pages'];
      this.actual_page = result['page'];

      var filmes = result['results'];
      for(let filme of filmes){
        this.getGenreByFilme(filme)

        // adicionando url base da api para images
        if(filme.poster_path == undefined || filme.poster_path == null){
          filme.poster_path = 'assets/img_404.png';
        }else{
          filme.poster_path = this.config.api_url_image + '/w200' + filme.poster_path;
        }
      }
      this.filmes = filmes;

    });
  }

  getGenreByFilme(filme: Filme){
      var genre_ids = [];
      for(let genre_id of filme.genre_ids){
        this.generoService.getGenreById(genre_id).subscribe(result => {
          genre_ids.push(result)
        });
      }
      filme.genre_obj = genre_ids;
  }

}
