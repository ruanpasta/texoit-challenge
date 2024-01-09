import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import MultipleWinnersCard, {
  links as MultipleWinnersCardLinks,
} from '~/business-components/multiple-winners';
import CardComponent from '~/components/card';
import style from './style.css';

import MovieWinnersByYear from '~/business-components/movie-winners-by-year';
import ProducersTable from '~/business-components/producers-table';
import StudiosCountCard from '~/business-components/studios-win-count';
import { getEnvironment } from '~/environment';
import { MovieByYear } from '~/models/MovieWinnerByYear';
import { ProducerData } from '~/models/ProducersIntervalWin';
import { StudioWinCount } from '~/models/StudiosWinCount';
import { WinnersByYear } from '~/models/WinnersByYear';

const environment = getEnvironment();

const getWinnersByYear = async (): Promise<{ years: WinnersByYear }> => {
  try {
    const winnersByYearResponse = await fetch(
      `${environment.apiMoviesUrl}?projection=years-with-multiple-winners`
    );
    const winnersByYear = await winnersByYearResponse.json();
    return winnersByYear;
  } catch {
    return { years: {} } as { years: WinnersByYear };
  }
};

const getStudioWinCount = async (): Promise<{ studios: StudioWinCount }> => {
  try {
    const studiosWinCountResponse = await fetch(
      `${environment.apiMoviesUrl}?projection=studios-with-win-count`
    );
    const studiosWinCount = await studiosWinCountResponse.json();
    return studiosWinCount;
  } catch {
    return { studios: {} } as { studios: StudioWinCount };
  }
};

interface ProducersData {
  min: ProducerData[];
  max: ProducerData[];
}

const getProducersData = async (): Promise<ProducersData> => {
  try {
    const producersIntervalsResponse = await fetch(
      `${environment.apiMoviesUrl}?projection=max-min-win-interval-for-producers`
    );
    const producersIntervals = await producersIntervalsResponse.json();
    return producersIntervals;
  } catch {
    return { } as ProducersData;
  }
};

interface FindWinnerMovieByYearResponse {
  yearParam: number;
  movieByYear: MovieByYear
}

const findMovieByYear = async (request: Request): Promise<FindWinnerMovieByYearResponse> => {
  try {
    const url = new URL(request.url);
    const yearParam = Number(url.searchParams.get('year'));
    const winnerMovieByYearResponse = await fetch(
      `${environment.apiMoviesUrl}?winner=true&year=${yearParam}`
    );
    const winnerMovieByYear = await winnerMovieByYearResponse.json();
    return {
      yearParam,
      movieByYear: winnerMovieByYear?.length ? winnerMovieByYear[0] : {}
    };
  } catch {
    return { } as FindWinnerMovieByYearResponse;
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const years = await getWinnersByYear();
  const sudios = await getStudioWinCount();
  const producers = await getProducersData();
  const movieByYearResponse = await findMovieByYear(request)


  return json({
    ...years,
    ...sudios,
    ...{ producers },
    ...{ movieByYear: movieByYearResponse.movieByYear },
    yearParam: movieByYearResponse.yearParam
  });
};

export default function DashboardPage() {
  const {
    years: multipleWinnersByYear,
    studios: studiosWinCount,
    producers: producersData,
    movieByYear,
    yearParam
  } = useLoaderData<typeof loader>();
  return (
    <div className="dashboard">
      <div className="dashboard__cards">
        <MultipleWinnersCard
          multipleWinnersByYear={
            multipleWinnersByYear as unknown as WinnersByYear[]
          }
        />
        <StudiosCountCard
          studiosWinCount={studiosWinCount as unknown as StudioWinCount[]}
        />
        <CardComponent title="Producers with longest and shortest interval between wins">
          <ProducersTable
            subTitle="Maximum"
            producerData={producersData?.max[0] || {}}
          />
          <ProducersTable
            subTitle="Minimum"
            producerData={producersData?.min[0] || {}}
          />
        </CardComponent>
        <CardComponent title="List movie winners by year">
          <Form method="get">
            <input type="number" name="year" defaultValue={yearParam} />

            <button type="submit">Search</button>
          </Form>
          <MovieWinnersByYear movieByYear={movieByYear as unknown as MovieByYear} />
        </CardComponent>
      </div>
    </div>
  );
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
  ...MultipleWinnersCardLinks(),
];
