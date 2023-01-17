import { ActionArgs, ActionFunction, json, LinksFunction, redirect } from "@remix-run/node";
import { Link, useActionData, useSearchParams } from "@remix-run/react";
import { createUser } from "~/model/user.server";

import stylesUrl from "~/styles/login.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

type ActionData =
  | {
      username: null | string;
      password: null | string;
    }
  | undefined;

function validateUsername(username: unknown) {
    if (typeof username !== "string" || username.length < 3) {
      return `Usernames must be at least 3 characters long`;
    }
  }
  
  function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
      return `Passwords must be at least 6 characters long`;
    }
  }
  
  function validateUrl(url: string) {
    let urls = ["/jokes", "/", "https://remix.run"];
    if (urls.includes(url)) {
      return url;
    }
    return "/jokes";
  }

export const action:ActionFunction=async({request} : ActionArgs)=>{
   const form = await request.formData()
   const name = form.get('username')
   const password = form.get('password')
   const AnyMissingDataError = {
    username: name ? null : "name is reqired",
    password: password ? null : "password is reqired",
  };
  if (Object.values(AnyMissingDataError).some((el) => el)) {
    return json<ActionData>(AnyMissingDataError); }
   await createUser({username:name , passwordHash:password})
   return redirect('..')
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const AnyMissingDataError = useActionData() as ActionData;
  return (
    <div className="container">
      <div className="content" data-light="">
        <h1 style={{fontSize:45}}>SignUp 👤</h1>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={
              searchParams.get("redirectTo") ?? undefined
            }
          />
          <fieldset>
            <legend className="sr-only">
              Login or Register?
            </legend>
          </fieldset>
          <div>
            <label htmlFor="username-input">
              Username{" "}
              {AnyMissingDataError?.username ? (
                <em style={{ color: "red" }}>{AnyMissingDataError.username}</em>
              ) : null}
            </label>
            <input type="text" id="username-input" name="username" />
          </div>
          <div>
            <label htmlFor="password-input">
              Password
              {AnyMissingDataError?.password ? (
                <em style={{ color: "red" }}>{AnyMissingDataError.password}</em>
              ) : null}
            </label>
            <input id="password-input" name="password" type="password" />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}