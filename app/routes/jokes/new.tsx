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
  const AnyMissingDataError = {
    title: content ? null : "name is reqired",
    content: content ? null : "content is reqired",
  };
  const AnyDataError = {
    title: content.length < 3 ? null : "joke's name is too short",
    content: content.length < 10 ? null : "Your joke is too short",
  };

  if (Object.values(AnyMissingDataError).some((el) => el)) {
    return json<ActionData>(AnyMissingDataError);
  }
  if (Object.values(AnyDataError).some((el) => el)) {
    return json<ActionData>(AnyDataError);
  }
  const fields = { name, content };

  const joke = await createJoke(fields);
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const AnyMissingDataError = useActionData() as ActionData;
  return (
    <div>
      <p>Add your own hilarious joke</p>

      <form method="post">
        <div>
          <label>
            Name{" "}
            {AnyMissingDataError?.title ? (
              <em style={{ color: "red" }}>{AnyMissingDataError.title}</em>
            ) : null}
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content:{" "}
            {AnyMissingDataError?.content ? (
              <em style={{ color: "red" }}>{AnyMissingDataError.content}</em>
            ) : null}
            <textarea name="content" />
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
