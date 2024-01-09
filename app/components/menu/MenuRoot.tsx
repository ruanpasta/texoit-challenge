import { LinksFunction } from "@remix-run/node";
import style from './MenuRoot.css';

export default function RootComponent({ children }: { children: JSX.Element[] | string }) {
  return (
    <nav data-testid="menu">
      <ul>
        {children}
      </ul>
    </nav>
  )
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
