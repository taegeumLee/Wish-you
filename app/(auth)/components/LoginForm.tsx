"use client";

import { useFormState } from "react-dom";
import { login } from "../actions";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email format");

export default function LoginForm() {
  const [state, dispatch] = useFormState(login, null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setIsChecking(true);

    try {
      const emailValidation = emailSchema.safeParse(email);
      setIsEmailValid(emailValidation.success);

      if (emailValidation.success) {
        const response = await fetch("/api/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setIsEmailExists(data.exists);

        if (data.exists) {
          setShowPasswordField(true);
        } else {
          setEmailError("Email does not exist. Please sign up.");
        }
      } else {
        setEmailError("Invalid email format");
      }
    } catch (error) {
      setEmailError("An error occurred while checking email.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <form onSubmit={handleEmailSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2"
            placeholder="Enter your email"
            required
          />
          {isChecking && (
            <p className="text-blue-500 text-sm">Checking email...</p>
          )}
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        {!showPasswordField ? (
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-200"
            disabled={isChecking || !email}
          >
            Next
          </button>
        ) : null}
      </form>
      {showPasswordField ? (
        <form action={dispatch}>
          <input type="hidden" name="email" value={email} />
          <div className="flex flex-col gap-2">
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
            {state?.fieldErrors?.password && (
              <p className="text-red-500 text-sm">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-neutral-200 text-black rounded-lg hover:bg-blue-400"
          >
            Login
          </button>
        </form>
      ) : null}
    </div>
  );
}
