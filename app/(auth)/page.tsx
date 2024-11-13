import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./components/LoginForm";

export default function Page() {
  return (
    <main className="flex flex-col justify-between w-full min-h-screen max-w-md mx-auto px-5 py-8 bg-gray-50 dark:bg-black">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          MinsTaegram
        </h1>
      </div>

      <div className="w-full space-y-6">
        <div className="flex flex-col gap-3 w-full">
          <Link href="/googleLogin" className="w-full">
            <button className="flex items-center justify-center w-full px-4 gap-1 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 border border-gray-200 dark:border-gray-700">
              <FcGoogle className="w-4 h-4" />
              Continue with Google
            </button>
          </Link>
        </div>

        <div className="relative h-1 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-200 dark:border-gray-700" />
          <span className="relative bg-gray-50 dark:bg-black px-2 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
        </div>

        <LoginForm />

        <div className="flex justify-center items-center gap-2">
          <span>Don't have an account?</span>
          <Link href="/createUser">
            <div className="flex items-center gap-1 group text-gray-700 dark:text-white hover:text-blue-500 transition-colors duration-200">
              <span>Sign up</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
