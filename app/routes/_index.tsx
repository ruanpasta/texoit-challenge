import {
  redirect,
  type LinksFunction,
  type MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TEXO IT Challenge" },
    { name: "description", content: "Welcome to my TEXO IT challenge!" },
  ];
};

export const loader = async () => {
  return redirect("/dashboard");
};

export default function Index() {}

export const links: LinksFunction = () => [];
