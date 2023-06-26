import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  useNavigate,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { drizzle, users } from "~/drizzle";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import AppInput from "~/components/AppInput";

export const userCreate = routeAction$(
  async (data) => {
    await drizzle.insert(users).values(data);
    return {
      success: true,
    };
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
  })
);

export default component$(() => {
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
              if (action.value?.success) {
                nav("/");
              }
            }}
          >
            <div class="grid gap-4">
              <AppInput name="name" errors={action.value?.fieldErrors?.name} />
              <AppInput
                name="email"
                type="email"
                errors={action.value?.fieldErrors?.email}
              />
              <div class="flex w-full flex-col">
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
