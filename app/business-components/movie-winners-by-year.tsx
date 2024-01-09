import { LinksFunction } from '@remix-run/node';
import { links as CardLinks } from '~/components/card';
import { Table } from '~/components/table';
import { MovieByYear } from '~/models/MovieWinnerByYear';

interface Props {
  movieByYear: MovieByYear;
}

export default function MovieWinnersByYear({ movieByYear }: Props) {
  const { id, year, title } = movieByYear || {};
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{id}</Table.Cell>
          <Table.Cell>{year}</Table.Cell>
          <Table.Cell>{title}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...Table.TableLinks(),
];
