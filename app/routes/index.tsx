import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span><span>😜</span>
        </h1>
        <nav>
          <ul style={{ marginTop: 50 }}>
            <li>
              {" "}
              <Link to={"login"} className="button">
                Login
              </Link>
            </li>
            <li>
              <Link to={"signup"} className="button">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="btn-container"></div>
    </div>
  );
}
