export interface Filme{
    id: number;
    title: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    backdrop_path: string;
    popularity?: string;
}