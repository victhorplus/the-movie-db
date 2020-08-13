export interface Filme{
    id: number;
    title: string;
    overview: string;
    genre_obj?;
    genre_ids?: number[];
    poster_path: string;
    backdrop_path: string;
    popularity?: string;
    release_date?: string;
}