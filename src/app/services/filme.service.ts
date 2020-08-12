import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators' ;

import { Filme } from '../models/filme';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private config = Config;
  constructor(
    private http: HttpClient
  ){}

  getFilmes(page): Observable<Filme[]>{
    return this.http.get<Filme[]>(
      this.config.api_url + '/discover/movie',
      {
        params: {
          api_key: this.config.api_key,
          language: this.config.language,
          sort_by: 'popularity.desc',
          page: page
        },
      }
    )
  }

  getFilmesByGenero(genre_id, page){
    return this.http.get(
      this.config.api_url+'/discover/movie',
      {
        params: {
          api_key: this.config.api_key,
          language: this.config.language,
          sort_by: 'popularity.desc',
          page: page,
          with_genres: genre_id
        },
      }
    )
  }
  
  getFilmesByTitle(title, page){
    return this.http.get(
      this.config.api_url + '/search/movie',
      {
        params: {
          api_key: this.config.api_key,
          language: this.config.language,
          page: page,
          query: title
        },
      }
    )
  }

  getFilmeById(id){
    return this.http.get(
      this.config.api_url + '/movie/'+id,
      {
        params: {
          api_key: this.config.api_key,
          language: this.config.language
        }
      }
    )
  }
  
}
