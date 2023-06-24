import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <section class="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div class="mx-auto px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Hi 👋
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            Can't wait to see what you build with qwik!
            <br />
            Happy coding.
          </p>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
