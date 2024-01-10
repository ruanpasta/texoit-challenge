import { LinksFunction } from '@remix-run/node';
import CardComponent from '~/components/card';
import { Table } from '~/components/table';
import { WinnersByYear } from '~/models/WinnersByYear';

interface Props {
  multipleWinnersByYear: WinnersByYear[];
}

export default function MultipleWinnersCard({ multipleWinnersByYear = [] }: Props) {
  return (
    <CardComponent title="List year with multiple winners">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Win Count</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {multipleWinnersByYear?.map(
            ({ year, winnerCount }: WinnersByYear) => (
              <Table.Row key={year}>
                <Table.Cell>{year}</Table.Cell>
                <Table.Cell>{winnerCount}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
    </CardComponent>
  );
}

export const links: LinksFunction = () => [
  ...Table.TableLinks(),
];
