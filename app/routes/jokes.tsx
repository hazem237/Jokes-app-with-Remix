import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { getJokes } from "~/model/jokes.server";

import stylesUrl from "~/styles/jokes.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader:LoaderFunction= async()=>{
    const jokes = await getJokes();
    return json ({jokes})
}

export default function JokesRoute() {
    const {jokes} = useLoaderData();
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix Jokes"
              aria-label="Remix Jokes"
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
             {jokes.map((j)=> (
                 <ul>
                 <li>
                   <Link to={j.id}>{j.name}</Link>
                 </li>
               </ul>
             ))}
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}