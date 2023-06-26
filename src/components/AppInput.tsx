import { component$ } from "@builder.io/qwik";

interface Props {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
}
export default component$<Props>(
  ({ name: key, placeholder, type, errors = [], required = true }) => {
    const error = errors.length > 0;
    return (
      <div>
        <label
          for={key}
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {key}
        </label>
        <input
          type={type || "text"}
          name={key}
          id={key}
          required={required}
          class={[
            "block w-full rounded-lg border",
            {
              "border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500":
                !error,
              "border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500":
                error,
            },
          ]}
          placeholder={placeholder || `Type ${key} here`}
        />
        {errors && (
          <ul class="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
