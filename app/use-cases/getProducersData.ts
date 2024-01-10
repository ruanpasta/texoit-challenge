import { getEnvironment } from "~/environment";
import { ProducersIntervalWin } from "~/models/ProducersIntervalWin";
import { UseCase } from "~/models/UseCase";

const environment = getEnvironment();

export default class GetProducersData implements UseCase<ProducersIntervalWin>  {
  async execute(): Promise<ProducersIntervalWin> {
    try {
      const producersIntervalsResponse = await fetch(
        `${environment.apiMoviesUrl}?projection=max-min-win-interval-for-producers`
      );
      const producersIntervals = await producersIntervalsResponse.json();
      return producersIntervals;
    } catch {
      return {} as ProducersIntervalWin;
    }
  }
}