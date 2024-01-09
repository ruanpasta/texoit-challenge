import { LinksFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import style from './MenuItem.css';

export default function RootComponent({ label, to }: { label: string, to: string  }) {
  return (
    <li className="menu__item">
      <NavLink to={to}>{ label }</NavLink>
    </li>
  )
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];