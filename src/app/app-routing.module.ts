import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component'
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component'

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MovieListComponent },
  { path: 'main/:title', component: MovieListComponent},
  { path: 'genre/:id', component: MovieGenreComponent},
  { path: 'movie/:id', component: MovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
