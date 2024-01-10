import { LinksFunction } from "@remix-run/node";
import style from "./style.css";

export default function TopBarComponent({ title }: { title: string }) {
  return <div className="top-bar">
    <h3>{title}</h3>
  </div>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
