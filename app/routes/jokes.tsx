import { Outlet } from "@remix-run/react";

export default function jokesRoutes() {
    return (
        <div>
            <h1>Hello 😜</h1>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}