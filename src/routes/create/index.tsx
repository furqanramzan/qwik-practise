import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, useNavigate } from "@builder.io/qwik-city";
import { drizzle, users } from "~/drizzle";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export const userCreate = routeAction$(async (data) => {
  await drizzle.insert(users).values(data);
  return {
    success: true,
  };
});

export default component$(() => {
  const name = useSignal("");
  const email = useSignal("");
  const nav = useNavigate();
  const action = userCreate();

  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-2xl px-4 py-8 lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new user
          </h2>
          <Form
            action={action}
            onSubmitCompleted$={async () => {
              nav("/");
            }}
          >
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  bind:value={name}
                  type="text"
                  name="name"
                  id="name"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Type name"
                  required
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  bind:value={email}
                  type="text"
                  name="email"
                  id="email"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Type email"
                  required
                />
              </div>
              <div class="flex gap-x-5">
                <button
                  type="submit"
                  class="mt-4 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 sm:mt-6"
                >
                  Add user
                </button>
                <Link
                  href="/"
                  class="mt-4 inline-flex items-center rounded-lg bg-secondary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-200 dark:focus:ring-secondary-900 sm:mt-6"
                >
                  Go back
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "User | Create",
  meta: [
    {
      name: "description",
      content: "Create a new user in the database.",
    },
  ],
};
