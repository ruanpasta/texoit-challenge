import { LinksFunction } from '@remix-run/node';
import style from './styles.css';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  title: string;
}

export default function CardComponent({ children, title }: Props) {
  return <div className="card">
    <h3>{title}</h3>
    {children}
  </div>;
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
