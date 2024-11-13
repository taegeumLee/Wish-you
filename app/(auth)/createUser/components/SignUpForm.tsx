"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpForm } from "../../schemas/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useState, ChangeEvent } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpForm() {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: 0,
    height: 0,
    description: "",
    profileImage: null as File | null,
  });
  const [emailError, setEmailError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: undefined,
      height: undefined,
      description: "",
    },
  });

  const password = watch("password");

  // Email duplication and verification check
  const verifyEmail = async (email: string) => {
    setIsChecking(true);
    setEmailError(null);
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        setEmailError("이미 사용 중인 이메일입니다");
        return;
      }

      setEmailVerified(true);
      reset({
        email: formData.email,
        password: "",
      });
      setStep(2);
    } catch (error) {
      if (error instanceof Error) {
        setEmailVerified(false);
        setEmailError(error.message);
      }
    } finally {
      setIsChecking(false);
    }
  };

  // Verify password and move to next step
  const verifyPassword = () => {
    if (
      password &&
      formData.confirmPassword &&
      password === formData.confirmPassword
    ) {
      reset({
        ...formData,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setStep(3);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        profileImage: e.target.files![0],
      }));
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signup(data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const formVariants = {
    enter: {
      opacity: 0,
      rotateX: 45,
      scale: 0.9,
    },
    center: {
      opacity: 1,
      rotateX: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      rotateX: -45,
      scale: 0.9,
    },
  };

  // input 클래스 변경
  const inputClassName = `w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black transition-colors dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none`;

  // 에러가 있을 때의 input 클래스
  const inputErrorClassName = `w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black transition-colors dark:text-white rounded-lg border border-red-500 focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none`;

  // button 클래스 변경
  const buttonClassName = `w-full mt-3 px-4 py-2 ${
    isSubmitting ? "bg-blue-400" : "bg-neutral-200"
  } text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200`;

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait" custom={step}>
        <motion.div
          key={step}
          variants={formVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.3, ease: "easeInOut" },
          }}
          className="flex min-h-[400px] items-center justify-center w-full"
        >
          {step === 1 && (
            <div className="space-y-4 w-full">
              <div>
                <input
                  type="email"
                  {...register("email")}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (formData.email) {
                        verifyEmail(formData.email);
                      }
                    }
                  }}
                  placeholder="Email"
                  className={
                    errors.email ? inputErrorClassName : inputClassName
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => formData.email && verifyEmail(formData.email)}
                disabled={isChecking || !formData.email}
                className={buttonClassName}
              >
                {isChecking ? "Checking..." : "Verify Email"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      password: value,
                    }));
                    setValue("password", value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const confirmInput = document.querySelector(
                        'input[name="confirmPassword"]'
                      );
                      if (confirmInput) {
                        (confirmInput as HTMLElement).focus();
                      }
                    }
                  }}
                  placeholder="Password"
                  className={
                    errors.password ? inputErrorClassName : inputClassName
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              <input
                type="password"
                {...register("confirmPassword")}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: value,
                  }));
                  setValue("confirmPassword", value);
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    formData.password === formData.confirmPassword
                  ) {
                    e.preventDefault();
                    verifyPassword();
                  }
                }}
                placeholder="Confirm Password"
                className={
                  errors.confirmPassword ? inputErrorClassName : inputClassName
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              {formData.password !== formData.confirmPassword &&
                formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
              <button
                type="button"
                onClick={verifyPassword}
                disabled={
                  !formData.password ||
                  formData.password !== formData.confirmPassword
                }
                className={buttonClassName}
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 w-full">
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className={errors.name ? inputErrorClassName : inputClassName}
              />
              <input
                type="number"
                {...register("age", { valueAsNumber: true })}
                placeholder="Age"
                className={errors.age ? inputErrorClassName : inputClassName}
              />
              <input
                type="number"
                {...register("height", { valueAsNumber: true })}
                placeholder="Height"
                className={errors.height ? inputErrorClassName : inputClassName}
              />
              <textarea
                {...register("description")}
                placeholder="About me"
                className={
                  errors.description ? inputErrorClassName : inputClassName
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={inputClassName}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonClassName}
              >
                {isSubmitting ? "Processing..." : "Sign Up"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full space-y-4"
    >
      {renderStep()}
    </form>
  );
}
