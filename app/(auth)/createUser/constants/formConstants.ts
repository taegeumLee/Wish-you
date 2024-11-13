export const FORM_STEPS = {
  EMAIL: 1,
  PASSWORD: 2,
  PROFILE: 3,
} as const;

export const PLACEHOLDER_TEXT = {
  email: "Enter your email",
  password: "Enter your password",
  confirmPassword: "Confirm your password",
  name: "Enter your name",
  age: "Enter your age",
  height: "Enter your height",
  description: "Enter your description",
} as const;

export type FormStep = (typeof FORM_STEPS)[keyof typeof FORM_STEPS];
