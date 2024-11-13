import { useState } from "react";
import { FORM_STEPS, type FormStep } from "../constants/formConstants";

export function useFormState() {
  const [step, setStep] = useState<FormStep>(FORM_STEPS.EMAIL);
  const [isChecking, setIsChecking] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleStepComplete = () => {
    setStep((prev) => {
      if (prev === FORM_STEPS.EMAIL) return FORM_STEPS.PASSWORD;
      if (prev === FORM_STEPS.PASSWORD) return FORM_STEPS.PROFILE;
      return prev;
    });
  };

  const verifyEmail = async (email: string) => {
    setIsChecking(true);
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.exists) {
        setEmailError("이미 존재하는 이메일입니다");
      } else {
        handleStepComplete();
      }
    } catch (error) {
      setEmailError("이메일 확인 중 오류가 발생했습니다");
    } finally {
      setIsChecking(false);
    }
  };

  const verifyPassword = () => {
    handleStepComplete();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
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
  };
}
