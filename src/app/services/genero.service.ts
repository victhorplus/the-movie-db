import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Config } from '../config'

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  config = Config;

  constructor(
    private http: HttpClient,
  ){}
  
  getAllGenres(){
    return this.http.get(
      this.config.api_url + '/genre/movie/list',
      {
        params: {
          api_key: this.config.api_key,
          language: this.config.language
        }
      }
    )
  }

}
