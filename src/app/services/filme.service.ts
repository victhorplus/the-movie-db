import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators' ;

import { Filme } from '../model/filme';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private config = Config;
  constructor(
    private http: HttpClient
  ){}

  getFilmes(page=1): Observable<Filme[]>{
    return this.http.get<Filme[]>(
      this.config.api_url + '/discover/movie',
      {params: {
        api_key: this.config.api_key,
        language: this.config.language,
        sort_by: 'popularity.desc',
        page: ''+page
      }}
    )
  }
}
