import { LinksFunction } from "@remix-run/node";
import style from "./style.css";

export default function NavbarComponent() {
  return <nav className="navbar">
    <h3>Frontend React Test</h3>
  </nav>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
