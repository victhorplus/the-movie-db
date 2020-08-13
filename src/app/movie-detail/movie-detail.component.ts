import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmeService } from '../services/filme.service';
import { Filme } from '../models/filme';
import { Config } from '../config';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  filme: Filme;
  config = Config;

  constructor(
    private filmeService: FilmeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.getFilmeById(params['id'])
    });
  }

  getFilmeById(id){
    this.filmeService.getFilmeById(id).subscribe(result=>{
      this.filme = {
        id: id,
        title: result['original_title'],
        overview: result['overview'],
        genre_obj: result['genres'],
        poster_path: result['poster_path'],
        backdrop_path: result['backdrop_path'],
        popularity: result['popularity'],
        release_date: result['release_date']
      }

      // adicionando url base da api para imagens
      if(this.filme.poster_path == undefined || this.filme.poster_path == null){
        this.filme.poster_path = 'assets/img_404.png';
      }else{
        this.filme.poster_path = this.config.api_url_image + '/w300' + this.filme.poster_path;
      }
      if(this.filme.backdrop_path == undefined || this.filme.backdrop_path == null){
        this.filme.backdrop_path = 'assets/img_404.png';
      }else{
        this.filme.backdrop_path = this.config.api_url_image + '/original' + this.filme.backdrop_path;
      }
    })
  }

}
