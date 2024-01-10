import { LinksFunction } from "@remix-run/node";
import { ReactNode } from "react";
import style from './MenuRoot.css';

export default function MenuRootComponent({ children }: { children: ReactNode }) {
  return (
    <nav data-testid="menu">
      <ul>
        {children}
      </ul>
    </nav>
  )
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
