import { getEnvironment } from "~/environment";
import { StudioWinCount } from "~/models/StudiosWinCount";
import { UseCase } from "~/models/UseCase";

const environment = getEnvironment();

export default class GetStudioWinCount implements UseCase<{ studios: StudioWinCount }> {
  async execute(): Promise<{ studios: StudioWinCount }> {
    try {
      const studiosWinCountResponse = await fetch(
        `${environment.apiMoviesUrl}?projection=studios-with-win-count`
      );
      const studiosWinCount = await studiosWinCountResponse.json();
      return studiosWinCount;
    } catch {
      return { studios: {} } as { studios: StudioWinCount };
    }
  }
}