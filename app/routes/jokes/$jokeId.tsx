import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getJokesBasedId } from "~/model/jokes.server";

export const loader:LoaderFunction= async({params})=>{
    const id = params.id
    const jokes = await getJokesBasedId(id);
    return json ({jokes})
}


export default function JokeRoute() {
    const {joke} = useLoaderData();
    return (
      <div>
        <p>Here's your hilarious joke:</p>
        <p>
         Test
        </p>
      </div>
    );
  }