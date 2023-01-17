import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getJokesBasedId } from "~/model/jokes.server";

export const loader:LoaderFunction= async({params})=>{
    const {jokeId} = params
    invariant(jokeId , "id is required")
    const jokes = await getJokesBasedId(jokeId);
    return json ({content : jokes?.content , title:jokes?.name})
}


export default function JokeRoute() {
    const {content , title} = useLoaderData();
    return (
      <div>
        <p>Here's your <span style={{color:"gold"}}>{title}</span> joke:</p>
        <p>
         {content}
        </p>
      </div>
    );
  }