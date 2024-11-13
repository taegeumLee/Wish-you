import { useFormContext } from "react-hook-form";
import type { SignUpForm } from "../../../schemas/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface PasswordStepProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onVerifyPassword: () => void;
  inputClassName: string;
  inputErrorClassName: string;
  buttonClassName: string;
}

export function PasswordStep({
  formData,
  showPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onVerifyPassword,
  inputClassName,
  inputErrorClassName,
  buttonClassName,
}: PasswordStepProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SignUpForm>();

  return (
    <div className="space-y-4 w-full">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          onChange={(e) => {
            const value = e.target.value;
            onPasswordChange(value);
            setValue("password", value);
          }}
          placeholder="Enter your password"
          className={errors.password ? inputErrorClassName : inputClassName}
        />
        <button
          type="button"
          onClick={onTogglePassword}
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
          onConfirmPasswordChange(value);
          setValue("confirmPassword", value);
        }}
        placeholder="Confirm your password"
        className={
          errors.confirmPassword ? inputErrorClassName : inputClassName
        }
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
      {formData.password !== formData.confirmPassword &&
        formData.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
        )}
      <button
        type="button"
        onClick={onVerifyPassword}
        disabled={
          !formData.password || formData.password !== formData.confirmPassword
        }
        className={buttonClassName}
      >
        Next
      </button>
    </div>
  );
}
