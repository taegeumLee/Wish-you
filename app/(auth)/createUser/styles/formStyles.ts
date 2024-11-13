export const formStyles = {
  input: `w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black transition-colors dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none`,

  inputError: `w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black transition-colors dark:text-white rounded-lg border border-red-500 focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none`,

  button: (isSubmitting: boolean) =>
    `w-full mt-3 px-4 py-2 ${
      isSubmitting ? "bg-blue-400" : "bg-neutral-200"
    } text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200`,

  formContainer: "space-y-4 w-full",
};
