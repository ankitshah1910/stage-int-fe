export interface ResponseData<T> {
  data: T[];
  totalPages: number;
  page: number;
  total: number;
}

export interface Movie {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  releaseDate: Date;
  director: string;
  actors: string[];
  posterUrl: string;
}

export interface TVShow {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  posterUrl: string;
  language: string;
  rating: number;
  isAvailable: boolean;
}
