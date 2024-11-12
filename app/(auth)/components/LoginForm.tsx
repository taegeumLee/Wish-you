"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  passwordSchema,
  type EmailForm,
  type PasswordForm,
} from "../schemas/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onEmailSubmit = async (data: EmailForm) => {
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.exists) {
        setShowPassword(true);
        setEmailError(null);
      } else {
        setEmailError("존재하지 않는 이메일입니다");
      }
    } catch (error) {
      setEmailError("오류가 발생했습니다");
    }
  };
  const onPasswordSubmit = async (data: PasswordForm) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailForm.getValues("email"),
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/home");
        router.refresh(); // 전체 앱 상태 새로고침
      } else {
        passwordForm.setError("password", {
          message: result.error || "로그인에 실패했습니다",
        });
      }
    } catch (error) {
      passwordForm.setError("password", {
        message: "로그인 중 오류가 발생했습니다",
      });
    }
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            {...emailForm.register("email")}
            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2"
            placeholder="이메일을 입력하세요"
          />
          {emailForm.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {emailForm.formState.errors.email.message}
            </p>
          )}
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        {!showPassword && (
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400"
          >
            다음
          </button>
        )}
      </form>

      {showPassword && (
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              {...passwordForm.register("password")}
              className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2"
              placeholder="비밀번호를 입력하세요"
            />
            {passwordForm.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {passwordForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400"
          >
            로그인
          </button>
        </form>
      )}
    </div>
  );
}
