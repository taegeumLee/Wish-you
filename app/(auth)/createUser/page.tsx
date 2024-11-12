import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SignUpForm from "./components/SignUpForm";

export default function CreateUserPage() {
  return (
    <main className="flex flex-col w-full min-h-screen max-w-md mx-auto px-5 py-8 bg-gray-50 dark:bg-black">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          <span>돌아가기</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8 text-center">회원가입</h1>

      <SignUpForm />
    </main>
  );
}
