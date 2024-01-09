import { LinksFunction } from '@remix-run/node';
import CardComponent, { links as CardLinks } from '~/components/card';
import { Table } from '~/components/table';
import { StudioWinCount } from '~/models/StudiosWinCount';

interface Props {
  studiosWinCount: StudioWinCount[];
}

export default function StudiosCountCard({ studiosWinCount = [] }: Props) {
  const topThreeWinnerStudios = studiosWinCount.filter((_, index) => index < 3);
  return (
    <CardComponent title="Top 3 studios with winners">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Win Count</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {topThreeWinnerStudios?.map(
            ({ name, winCount }: StudioWinCount) => (
              <Table.Row key={name}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{winCount}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
    </CardComponent>
  );
}

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...Table.TableLinks(),
];
