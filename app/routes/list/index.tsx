import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import CardComponent, { links as CardLinks } from '~/components/card';
import PaginatorComponent, {
  links as PaginatorLinks,
} from '~/components/paginator';
import { Table } from '~/components/table';
import FindMovie from '~/use-cases/findMovie';
import style from './style.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const moviesResponse = await new FindMovie().execute(request);

  return json({
    ...moviesResponse,
  });
};

export default function DashboardPage() {
  const { yearParam, winnerParam, movies, totalElements } =
    useLoaderData<typeof loader>();
  const columns = ['ID', 'Year', 'Title', 'Winner?'];
  const PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const submit = useSubmit();

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
      <select
        defaultValue={String(winnerParam)}
        name="winner">
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
        <Form method="get" onChange={(event) => submit(event.currentTarget)}>
          <Table.Root>
            <Table.Header>
              <Table.Row>{columns.map(column => getColumn(column))}</Table.Row>
            </Table.Header>
            <Table.Body>
              {movies?.map(({ id, year, title, winner }) => (
                <Table.Row key={id}>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>{year}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{winner ? 'Yes' : 'No'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <input
            name="page"
            value={currentPage}
            readOnly
            style={{ display: 'none' }}
          />
          <div className="table-footer">
            <PaginatorComponent
              totalPages={totalElements}
              rows={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </Form>
      </CardComponent>
    </main>
  );
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: style },
  ...CardLinks(),
  ...PaginatorLinks(),
  ...Table.TableLinks(),
];
