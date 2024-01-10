import { LinksFunction } from '@remix-run/node';
import { ReactNode } from 'react';
import style from './Table.css';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function TableRootComponent({ children, ...restProps }: Props) {
  return (
    <table data-testid="table-component" className="table" {...restProps}>
      {children}
    </table>
  );
}

export function TableHeaderComponent({ children, ...restProps }: Props) {
  return (
    <thead data-testid="table-header-component" {...restProps}>
      {children}
    </thead>
  );
}

export function TableBodyComponent({ children, ...restProps }: Props) {
  return (
    <tbody data-testid="table-body-component" {...restProps}>
      {children}
    </tbody>
  );
}

export function TableRowComponent({ children, ...restProps }: Props) {
  return (
    <tr data-testid="table-row-component" {...restProps}>
      {children}
    </tr>
  );
}

export function TableColumnHeaderCellComponent({
  children,
  ...restProps
}: Props) {
  return (
    <th
      data-testid="table-column-header-cell-component"
      className="table__column-header-cell"
      {...restProps}>
      {children}
    </th>
  );
}

export function TableCellComponent({ children, ...restProps }: Props) {
  return (
    <td data-testid="table-cell-component" {...restProps}>
      {children}
    </td>
  );
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
