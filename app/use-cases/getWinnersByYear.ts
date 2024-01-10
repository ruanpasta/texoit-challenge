import { getEnvironment } from '~/environment';
import { UseCase } from '~/models/UseCase';
import { WinnersByYear } from '~/models/WinnersByYear';

const environment = getEnvironment();

export default class GetWinnerByYear implements UseCase<{ years: WinnersByYear }> {
  async execute(): Promise<{ years: WinnersByYear }> {
    try {
      const winnersByYearResponse = await fetch(
        `${environment.apiMoviesUrl}?projection=years-with-multiple-winners`
      );
      const winnersByYear = await winnersByYearResponse.json();
      return winnersByYear;
    } catch {
      return { years: {} } as { years: WinnersByYear };
    }
  }
}
