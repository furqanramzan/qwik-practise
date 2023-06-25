import { eq } from "drizzle-orm";
import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { drizzle, users } from "~/drizzle";
import type { User } from "~/drizzle";

const userRemove = server$(async (userId: number) => {
  await drizzle.delete(users).where(eq(users.id, userId));
  return {
    success: true,
  };
});

export default component$<{ user: User }>(({ user }) => {
  return (
    <tr class="border-b dark:border-gray-700">
      <th
        scope="row"
        class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {user.name}
      </th>
      <td class="px-4 py-3">{user.email}</td>
      <td class="px-4 py-3">
        <button
          onClick$={async () => {
            await userRemove(user.id);
          }}
          type="button"
          class="rounded-lg bg-red-700 p-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Remove
        </button>
      </td>
    </tr>
  );
});
