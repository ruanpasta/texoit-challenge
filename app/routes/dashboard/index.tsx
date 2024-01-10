import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import MultipleWinnersCard, {
  links as MultipleWinnersCardLinks,
} from '~/business-components/multiple-winners';
import CardComponent, { links as CardLinks } from '~/components/card';
import style from './style.css';

import MovieWinnersByYear from '~/business-components/movie-winners-by-year';
import ProducersTable from '~/business-components/producers-table';
import StudiosCountCard from '~/business-components/studios-win-count';
import { MovieByYear } from '~/models/MovieWinnerByYear';
import { ProducerData } from '~/models/ProducersIntervalWin';
import { StudioWinCount } from '~/models/StudiosWinCount';
import { WinnersByYear } from '~/models/WinnersByYear';
import { DashboardState, dashboardState } from '~/store/dashboard';
import FindMovieByYear from '~/use-cases/findMovieByYear';
import GetProducersData from '~/use-cases/getProducersData';
import GetStudioWinCount from '~/use-cases/getStudioWinCount';
import GetWinnerByYear from '~/use-cases/getWinnersByYear';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const getMovieByYear = async () => {
    const movieByYearResponse = await new FindMovieByYear().execute(request);
    return {
      movieByYear: movieByYearResponse.movieByYear,
      yearParam: movieByYearResponse.yearParam,
    };
  };

  const getDashboardData = async () => {
    const years = await new GetWinnerByYear().execute();
    const studios = await new GetStudioWinCount().execute();
    const producers = await new GetProducersData().execute();
    return { ...years, ...studios, producers };
  };

  const movieByYearData = await getMovieByYear();
  const dashboardData = dashboardState.value.years
    ? { ...dashboardState.value, ...movieByYearData }
    :  {...await getDashboardData(), ...movieByYearData };

  dashboardState.value = { ...dashboardData } as DashboardState;

  return json(dashboardData);
};

export default function DashboardPage() {
  const {
    years: multipleWinnersByYear,
    studios: studiosWinCount,
    producers: producersData,
    movieByYear,
    yearParam,
  } = useLoaderData<typeof loader>();
  return (
    <main className="dashboard">
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
            producerData={
              producersData?.max[0] || ({} as unknown as ProducerData)
            }
          />
          <ProducersTable
            subTitle="Minimum"
            producerData={
              producersData?.min[0] || ({} as unknown as ProducerData)
            }
          />
        </CardComponent>
        <CardComponent title="List movie winners by year">
          <Form method="get">
            <input
              type="number"
              name="year"
              defaultValue={yearParam}
              placeholder="Search by year"
            />

            <button type="submit">Search</button>
          </Form>
          <MovieWinnersByYear
            movieByYear={movieByYear as unknown as MovieByYear}
          />
        </CardComponent>
      </div>
    </main>
  );
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
  ...CardLinks(),
  ...MultipleWinnersCardLinks(),
];
