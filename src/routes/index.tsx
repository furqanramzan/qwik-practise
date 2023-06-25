import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { drizzle, users } from "~/drizzle";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export const userList = routeLoader$(() => {
  return drizzle.select().from(users);
});

export default component$(() => {
  const users = userList();

  return (
    <>
      <section class="bg-gray-50 p-3 dark:bg-gray-900 sm:p-5">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
              <div class="w-full md:w-1/2">
                <h1 class="text-xl font-bold">Users</h1>
              </div>
              <div class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <Link
                  href="/create"
                  class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add user
                </Link>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.value.length > 0 ? (
                    users.value.map((user) => (
                      <tr key={user.id} class="border-b dark:border-gray-700">
                        <th
                          scope="row"
                          class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                        >
                          {user.name}
                        </th>
                        <td class="px-4 py-3">{user.email}</td>
                      </tr>
                    ))
                  ) : (
                    <th
                      scope="row"
                      class="whitespace-nowrap px-4 py-3 text-center font-medium text-gray-900 dark:text-white"
                      colSpan={2}
                    >
                      No user found
                    </th>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "User | List",
  meta: [
    {
      name: "description",
      content: "See the list of the users.",
    },
  ],
};
