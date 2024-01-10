import { getEnvironment } from '~/environment';
import { Movie } from '~/models/Movie';
import { UseCase } from '~/models/UseCase';

const environment = getEnvironment();

interface FindWinnerMovieResponse {
  yearParam: number;
  winnerParam: string | null;
  movies: Movie[];
  totalElements: number;
}

export default class FindMovie implements UseCase<FindWinnerMovieResponse> {
  async execute(request: Request): Promise<FindWinnerMovieResponse> {
    try {
      const url = new URL(request.url);
      const yearParam = Number(url.searchParams.get('year'));
      const winnerParam = url.searchParams.get('winner');
      const pageParam = Number(url.searchParams.get('page')) - 1;

      const queryParams = {
        page: pageParam >= 0 ? pageParam : 0,
        size: 15,
        year: yearParam,
        winner: winnerParam,
      };

      const filteredParams = Object.entries(queryParams)
        .filter(([key, value]) => !!value || key === 'page')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const movieResponse = await fetch(
        `${environment.apiMoviesUrl}?${filteredParams}`
      );
      const movieData = (await movieResponse.json()) || [];
      return {
        yearParam,
        winnerParam,
        movies: movieData.content,
        totalElements: movieData.totalElements,
      };
    } catch {
      return {} as FindWinnerMovieResponse;
    }
  }
}
