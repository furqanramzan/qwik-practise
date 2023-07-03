import { eq } from "drizzle-orm";
import { component$ } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";
import { drizzle, users } from "~/drizzle";
import type { User } from "~/drizzle";
import { destroy } from "~/utils/s-three";

const userRemove = server$(async (userId: number) => {
  const avatar = (
    await drizzle.select().from(users).where(eq(users.id, userId))
  ).at(0)?.avatar;

  if (avatar) {
    await destroy(avatar);
  }

  await drizzle.delete(users).where(eq(users.id, userId));
  return {
    success: true,
  };
});

export default component$<{ user: User }>(({ user }) => {
  const nav = useNavigate();

  return (
    <tr class="border-b dark:border-gray-700">
      <th
        scope="row"
        class="flex items-center gap-2 whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        <img
          src={user.avatar || ""}
          alt={user.name || ""}
          height={24}
          width={24}
          class="h-6 w-6 rounded-full"
        />
        {user.name}
      </th>
      <td class="px-4 py-3">{user.email}</td>
      <td class="px-4 py-3">
        <button
          onClick$={async () => {
            const data = await userRemove(user.id);
            if (data.success) {
              await nav();
            }
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
