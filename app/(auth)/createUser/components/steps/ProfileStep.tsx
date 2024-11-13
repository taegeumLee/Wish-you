import { useFormContext } from "react-hook-form";
import type { SignUpForm } from "../../../schemas/auth";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

interface ProfileStepProps {
  formData: SignUpForm;
  previewImage: string | null;
  isSubmitting: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName: string;
  inputErrorClassName: string;
  buttonClassName: string;
}

export function ProfileStep({
  formData,
  previewImage,
  isSubmitting,
  onImageChange,
  inputClassName,
  inputErrorClassName,
  buttonClassName,
}: ProfileStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpForm>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4 w-full">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Profile preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <PlusIcon className="w-8 h-8 mx-auto text-gray-400" />
              <span className="text-sm text-gray-500">Add Profile Photo</span>
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        {...register("name")}
        placeholder="Enter your name"
        className={errors.name ? inputErrorClassName : inputClassName}
      />
      <input
        type="number"
        {...register("age", { valueAsNumber: true })}
        placeholder="Enter your age"
        className={errors.age ? inputErrorClassName : inputClassName}
      />
      <input
        type="number"
        {...register("height", { valueAsNumber: true })}
        placeholder="Enter your height"
        className={errors.height ? inputErrorClassName : inputClassName}
      />
      <textarea
        {...register("description")}
        placeholder="Enter your description"
        className={errors.description ? inputErrorClassName : inputClassName}
      />
      <button type="submit" disabled={isSubmitting} className={buttonClassName}>
        {isSubmitting ? "Processing..." : "Sign Up"}
      </button>
      {errors.root && (
        <p className="text-red-500 text-sm text-center mt-2">
          {errors.root.message}
        </p>
      )}
    </div>
  );
}
