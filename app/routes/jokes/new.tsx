import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json, useActionData } from "react-router";
import { createJoke } from "~/model/jokes.server";

type ActionData =
  | {
      title: null | string;
      content: null | string;
    }
  | undefined;
const contentValidation = (content: string): string | null => {
  if (content.length < 10) {
    return "Your joke is too short";
  }
  return null;
};

const titleValidation = (title: string): string | null => {
  if (title.length < 3) {
    return "Your joke's name is too short";
  }
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  if (typeof name !== "string" || typeof content !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }
  const AnyError = {
    title: content ? null : "title is reqired",
    content: content ? null : "content is reqired"
  };
  const hasError = Object.values(AnyError).some((el) => el);
  if (hasError) {
    return json<ActionData>(AnyError);
  }
  const fields = { name, content };

  const joke = await createJoke(fields);
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const error = useActionData() as ActionData;
  return (
    <div>
      <p>Add your own hilarious joke</p>

      <form method="post">
        <div>
          <label>
            Name {error?.title ? <em style={{color:"red"}}>{error.title}</em> : null}
            <input type="text" name="name"  />
          </label>
        </div>
        <div>
          <label>
            Content: {error?.content ? <em style={{color:"red"}}>{error.content}</em> : null}
            <textarea name="content"  />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
