import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteJoke, getJokesBasedId } from "~/model/jokes.server";

export const loader:LoaderFunction= async({params})=>{
    const {jokeId} = params
    invariant(jokeId , "id is required")
    const jokes = await getJokesBasedId(jokeId);
    return json ({content : jokes?.content , title:jokes?.name})
}
export const action:ActionFunction=async({params})=>{
  const {jokeId} = params
  await deleteJoke(jokeId)
  return redirect('..');
}


export default function JokeRoute() {
    const {content , title} = useLoaderData();
    return (
      <div>
        <p>Here's your <span style={{color:"gold"}}>{title}</span> joke:</p>
        <p>
         {content}
        </p>
        <form method="post">
          <button type="submit" className="button">Delete</button>
        </form>
      </div>
    );
  }