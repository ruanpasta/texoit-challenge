import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import CardComponent, { links as CardLinks } from '~/components/card';
import { Table } from '~/components/table';
import { getEnvironment } from '~/environment';
import { Movie } from '~/models/Movie';
import style from './style.css';


interface FindWinnerMovieResponse {
  yearParam: number;
  winnerParam: string | null;
  movies: Movie[];
}

const environment = getEnvironment();

const findMovie = async (
  request: Request
): Promise<FindWinnerMovieResponse> => {
  try {
    const url = new URL(request.url);
    const yearParam = Number(url.searchParams.get('year'));
    const winnerParam = url.searchParams.get('winner');

    const queryParams = {
      page: 1,
      size: 99,
      year: yearParam,
      winner: winnerParam,
    };

    const filteredParams = Object.entries(queryParams)
      .filter(([, value]) => !!value)
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
    };
  } catch {
    return {} as FindWinnerMovieResponse;
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log(request.url);
  const moviesResponse = await findMovie(request);

  return json({
    yearParam: moviesResponse.yearParam,
    winnerParam: moviesResponse.winnerParam,
    movies: moviesResponse.movies,
  });
};

export default function DashboardPage() {
  const { yearParam, winnerParam, movies } = useLoaderData<typeof loader>();
  const columns = ['ID', 'Year', 'Title', 'Winner?'];

  const yearColumn = (columnName: string) => (
    <Table.ColumnHeaderCell className="list__column-input" key={columnName}>
      {columnName}
      <input
        type="number"
        name="year"
        placeholder="Filter by year"
        defaultValue={yearParam}
      />
    </Table.ColumnHeaderCell>
  );

  const winnerColumn = (columnName: string) => (
    <Table.ColumnHeaderCell className="list__column-input" key={columnName}>
      {columnName}
      <select defaultValue={String(winnerParam)} name="winner">
        <option value="">Yes/No</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </Table.ColumnHeaderCell>
  );

  const getColumn = (columnName: string) => {
    if (columnName === 'Year') return yearColumn(columnName);
    if (columnName === 'Winner?') return winnerColumn(columnName);
    return (
      <Table.ColumnHeaderCell key={columnName}>
        {columnName}
      </Table.ColumnHeaderCell>
    );
  };

  return (
    <main className="list">
      <CardComponent title="List Movies">
        <Form method="get">
          <Table.Root>
            <Table.Header>
              <Table.Row>{columns.map(column => getColumn(column))}</Table.Row>
            </Table.Header>
            <Table.Body>
              {movies.map(({ id, year, title, winner }) => (
                <Table.Row key={id}>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>{year}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{winner ? 'Yes' : 'No'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Form>
      </CardComponent>
    </main>
  );
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
  ...CardLinks(),
  ...Table.TableLinks(),
];
