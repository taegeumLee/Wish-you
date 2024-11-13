"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpForm } from "../../schemas/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FORM_STEPS } from "../constants/formConstants";
import { EmailStep } from "./steps/EmailStep";
import { PasswordStep } from "./steps/PasswordStep";
import { ProfileStep } from "./steps/ProfileStep";
import { formVariants } from "../animations/formAnimations";
import { useFormState } from "../hooks/useFormState";

export default function SignUpForm() {
  const { signup } = useAuth();
  const methods = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: 0,
      height: 0,
      description: "",
    },
  });

  const {
    step,
    isChecking,
    emailError,
    showPassword,
    handleStepComplete,
    verifyEmail,
    verifyPassword,
    handleImageChange,
    setShowPassword,
    previewImage,
  } = useFormState();

  const formData = methods.watch();

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signup(data);
    } catch (error) {
      console.error("회원가입 오류:", error);
      if (error instanceof Error) {
        methods.setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full space-y-4"
      >
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
            {step === FORM_STEPS.EMAIL && (
              <EmailStep
                formData={formData}
                isChecking={isChecking}
                emailError={emailError}
                onVerifyEmail={verifyEmail}
                onEmailChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  methods.setValue("email", e.target.value)
                }
                inputClassName="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2"
                inputErrorClassName="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-red-500 focus:ring-0"
                buttonClassName="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200"
              />
            )}
            {step === FORM_STEPS.PASSWORD && (
              <PasswordStep
                formData={formData}
                showPassword={showPassword}
                onVerifyPassword={verifyPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onPasswordChange={(value) =>
                  methods.setValue("password", value)
                }
                onConfirmPasswordChange={(value) =>
                  methods.setValue("confirmPassword", value)
                }
                inputClassName="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2"
                inputErrorClassName="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-red-500 focus:ring-0"
                buttonClassName="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200"
              />
            )}
            {step === FORM_STEPS.PROFILE && (
              <ProfileStep
                formData={formData}
                previewImage={previewImage}
                onImageChange={handleImageChange}
                isSubmitting={methods.formState.isSubmitting}
                inputClassName="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2"
                inputErrorClassName="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-red-500 focus:ring-0"
                buttonClassName="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </form>
    </FormProvider>
  );
}
