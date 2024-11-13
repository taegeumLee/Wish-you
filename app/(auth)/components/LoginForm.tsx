"use client";

import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

// 이메일 유효성 검사를 위한 zod 스키마 정의
const emailSchema = z.string().email("Invalid email format");

export default function LoginForm() {
  // AuthContext에서 login 함수 가져오기
  const { login } = useAuth();

  // 이메일 관련 상태 관리
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // 비밀번호 필드 표시 여부와 입력값 상태 관리
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // 비밀번호 입력 필드에 대한 ref
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // 비밀번호 표시 여부를 위한 상태 추가
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 필드가 표시될 때 자동으로 포커스
  useEffect(() => {
    if (showPasswordField && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [showPasswordField]);

  // 이메일 제출 처리 함수
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setIsChecking(true);

    try {
      // 이메일 유효성 검사
      const emailValidation = emailSchema.safeParse(email);
      setIsEmailValid(emailValidation.success);

      if (!emailValidation.success) {
        setEmailError("Invalid email format");
        setIsChecking(false);
        return;
      }

      // 이메일 존재 여부 확인 API 호출
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setIsEmailExists(data.exists);

      // 이메일이 존재하면 비밀번호 필드 표시
      if (data.exists) {
        setShowPasswordField(true);
      } else {
        setEmailError("Email does not exist. Please sign up.");
      }
    } catch (error) {
      setEmailError("An error occurred while checking email.");
    } finally {
      setIsChecking(false);
    }
  };

  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setPasswordError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 이메일 입력 폼 */}
      <form onSubmit={handleEmailSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black transition-colors dark:text-white rounded-lg border ${
              emailError
                ? "border-red-500 focus:ring-0"
                : "border-gray-200 dark:border-gray-700  focus:ring-2"
            } placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none`}
            placeholder="Enter your email"
            required
          />
          {isChecking && (
            <p className="text-blue-500 text-sm">Checking email...</p>
          )}
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        {!showPasswordField && (
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200"
            disabled={isChecking || !email}
          >
            Next
          </button>
        )}
      </form>

      {/* 비밀번호 입력 폼 */}
      {showPasswordField && (
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border transition-colors ${
                  passwordError
                    ? "border-red-500 focus:ring-0"
                    : "border-gray-200 dark:border-gray-700 focus:ring-2"
                } placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <button
              type="submit"
              className={`w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200`}
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
