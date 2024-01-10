import { LinksFunction } from '@remix-run/node';
import { ReactNode } from 'react';
import style from './styles.css';

interface Props {
  children: ReactNode;
  title: string;
}

export default function CardComponent({ children, title }: Props) {
  return <div className="card">
    <h3>{title}</h3>
    {children}
  </div>;
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
