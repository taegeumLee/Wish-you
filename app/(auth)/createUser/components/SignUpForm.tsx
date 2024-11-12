"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpForm } from "../../schemas/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpForm() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signup(data);
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="이메일"
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="비밀번호"
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          {...register("name")}
          placeholder="이름"
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="나이"
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("height", { valueAsNumber: true })}
          placeholder="키"
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700"
        />
        {errors.height && (
          <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("description")}
          placeholder="자기소개"
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? "처리중..." : "회원가입"}
      </button>
    </form>
  );
}
