import { LinksFunction } from '@remix-run/node';
import style from './style.css';

export default function DashboardPage() {
    return (
        <>
            <h2 className="dashboard">DashboardPage</h2>
        </>
    )
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: style }
]