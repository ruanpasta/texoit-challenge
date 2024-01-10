import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { Menu } from './components/menu';
import TopBarComponent, {
  links as TopBarComponentLinks,
} from './components/top-bar';
import globalStyles from './styles/global.styles.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  ...[{ rel: 'stylesheet', href: globalStyles }],
  ...TopBarComponentLinks(),
  ...Menu.RootLinks(),
  ...Menu.ItemLinks(),
];

export default function App() {
  const menus = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'List', to: '/list' },
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="light">
        <TopBarComponent title='Frontend React Test' />

        <div className="root__content">
          <Menu.Root>
            {menus.map(menu => (
              <Menu.Item key={menu.to} label={menu.label} to={menu.to} />
            ))}
          </Menu.Root>

          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
