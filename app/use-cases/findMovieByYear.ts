import { getEnvironment } from '~/environment';
import { MovieByYear } from '~/models/MovieWinnerByYear';
import { UseCase } from '~/models/UseCase';

const environment = getEnvironment();

interface FindWinnerMovieByYearResponse {
  yearParam: number;
  movieByYear: MovieByYear;
}

export default class FindMovieByYear implements UseCase<FindWinnerMovieByYearResponse>  {
  async execute(request: Request): Promise<FindWinnerMovieByYearResponse> {
    try {
      const url = new URL(request.url);
      const yearParam = Number(url.searchParams.get('year'));
      const winnerMovieByYearResponse = await fetch(
        `${environment.apiMoviesUrl}?winner=true&year=${yearParam}`
      );
      const winnerMovieByYear = await winnerMovieByYearResponse.json();
      return {
        yearParam,
        movieByYear: winnerMovieByYear?.length ? winnerMovieByYear[0] : {},
      };
    } catch {
      return {} as FindWinnerMovieByYearResponse;
    }
  }
}
