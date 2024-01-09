import {
  TableBodyComponent as Body,
  TableCellComponent as Cell,
  TableColumnHeaderCellComponent as ColumnHeaderCell,
  TableHeaderComponent as Header,
  TableRootComponent as Root,
  TableRowComponent as Row,
  links as TableLinks
} from './Table';

const components = {
  Root,
  Header,
  Body,
  Row,
  ColumnHeaderCell,
  Cell
};

export const Table = {
  ...components,
  TableLinks
};
