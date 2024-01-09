import { LinksFunction } from "@remix-run/node";
import style from "./style.css";

export default function TopBarComponent() {
  return <div className="top-bar">
    <h3>Frontend React Test</h3>
  </div>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
