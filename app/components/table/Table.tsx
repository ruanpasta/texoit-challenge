import { LinksFunction } from "@remix-run/node";
import style from './Table.css';

interface Props {
  children: JSX.Element | JSX.Element[] | string | number;
}

export function TableRootComponent({ children }: Props) {
  return (
    <table data-testid="table-component" className="table">
      {children}
    </table>
  )
}

export function TableHeaderComponent({ children }: Props) {
  return (
    <thead data-testid="table-header-component">
      {children}
    </thead>
  )
}

export function TableBodyComponent({ children }: Props) {
  return (
    <tbody data-testid="table-body-component">
      {children}
    </tbody>
  )
}

export function TableRowComponent({ children }: Props) {
  return (
    <tr data-testid="table-row-component">
      {children}
    </tr>
  )
}

export function TableColumnHeaderCellComponent({ children }: Props) {
  return (
    <th data-testid="table-column-header-cell-component" className="table__column-header-cell">
      {children}
    </th>
  )
}

export function TableCellComponent({ children }: Props) {
  return (
    <td data-testid="table-cell-component">
      {children}
    </td>
  )
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
