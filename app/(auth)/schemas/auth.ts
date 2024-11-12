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

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
