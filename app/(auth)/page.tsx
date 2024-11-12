import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

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
          <Link href="/appleLogin" className="w-full">
            <button className="flex items-center justify-center w-full px-4 gap-2 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-black hover:text-white transition-colors duration-200 border border-gray-200 dark:border-gray-700">
              <FaApple className="w-4 h-4" />
              Continue with Apple
            </button>
          </Link>
          <Link href="/naverLogin" className="w-full">
            <button className="flex items-center justify-center w-full px-4 gap-2 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-green-400 hover:text-white transition-colors duration-200 border border-gray-200 dark:border-gray-700">
              <SiNaver className="w-4 h-4" />
              Continue with Naver
            </button>
          </Link>
          <Link href="/kakaoLogin" className="w-full">
            <button className="flex items-center justify-center w-full px-4 gap-2 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-yellow-400 hover:text-white transition-colors duration-200 border border-gray-200 dark:border-gray-700">
              <RiKakaoTalkFill className="w-4 h-4" />
              Continue with Kakao
            </button>
          </Link>
        </div>
        {/* 구분선 컨테이너 */}
        <div className="relative h-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-8">
          <Link href="/login">
            <div className="flex items-center gap-2 group text-gray-700 dark:text-white hover:text-blue-500 transition-colors duration-200">
              <span>Log In</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link href="/createUser">
            <div className="flex items-center gap-2 group text-gray-700 dark:text-white hover:text-blue-500 transition-colors duration-200">
              <span>Sign up</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
