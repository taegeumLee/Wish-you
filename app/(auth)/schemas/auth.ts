import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
    .max(16, "비밀번호는 최대 16자 이하여야 합니다"),
});

export const signUpSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
    .max(16, "비밀번호는 최대 16자 이하여야 합니다"),
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
  age: z.number().min(19, "19세 이상만 가입할 수 있습니다"),
  height: z.number().min(140, "키를 올바르게 입력해주세요"),
  description: z.string().optional(),
});

export type SignUpForm = z.infer<typeof signUpSchema>;
export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
