import { LinksFunction } from '@remix-run/node';
import { links as CardLinks } from '~/components/card';
import { Table } from '~/components/table';
import { ProducerData } from '~/models/ProducersIntervalWin';

interface Props {
  producerData: ProducerData;
  subTitle: string;
}

export default function ProducersTable({ producerData, subTitle }: Props) {
  return (
    <>
      <h2>{subTitle}</h2>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Producer</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Interval</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Previous Year</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Following Year</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {Object.values(producerData).map((value, index) => (
              <Table.Cell key={index}>{value}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
}

export const links: LinksFunction = () => [
  ...CardLinks(),
  ...Table.TableLinks(),
];
