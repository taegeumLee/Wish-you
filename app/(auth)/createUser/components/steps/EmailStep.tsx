import { useFormContext } from "react-hook-form";
import type { SignUpForm } from "../../../schemas/auth";

interface EmailStepProps {
  formData: {
    email: string;
  };
  isChecking: boolean;
  emailError: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerifyEmail: (email: string) => void;
  inputClassName: string;
  inputErrorClassName: string;
  buttonClassName: string;
}

export function EmailStep({
  formData,
  isChecking,
  emailError,
  onEmailChange,
  onVerifyEmail,
  inputClassName,
  inputErrorClassName,
  buttonClassName,
}: EmailStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpForm>();

  return (
    <div className="space-y-4 w-full">
      <div>
        <input
          type="email"
          {...register("email")}
          onChange={onEmailChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (formData.email) {
                onVerifyEmail(formData.email);
              }
            }
          }}
          placeholder="Enter your email"
          className={errors.email ? inputErrorClassName : inputClassName}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => formData.email && onVerifyEmail(formData.email)}
        disabled={isChecking || !formData.email}
        className={buttonClassName}
      >
        {isChecking ? "Checking..." : "Verify Email"}
      </button>
    </div>
  );
}
