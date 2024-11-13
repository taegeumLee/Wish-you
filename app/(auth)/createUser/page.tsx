import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SignUpForm from "./components/SignUpForm";

export default function CreateUserPage() {
  return (
    <main className="flex flex-col w-full min-h-screen max-w-md mx-auto px-5 py-8 bg-gray-50 dark:bg-black">
      <div className="mb-8 group">
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 dark:text-gray-300 *:hover:text-blue-400 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8 text-center">Sign Up</h1>

      <SignUpForm />
    </main>
  );
}
