import { AuthError, User } from "@supabase/supabase-js";

<<<<<<<< HEAD:src/lib/types/services.ts
export type APIResult = {
========
export type SignInArgs = {
  email: string;
  password: string;
};

export type SignInResult = {
>>>>>>>> 99a2a27e77c283bb6318f407ffdab3435f4e381a:src/lib/types/auth.ts
  success: boolean;
  user?: User;
  error?: AuthError;
};

<<<<<<<< HEAD:src/lib/types/services.ts
export type SignInArg = {
  arg: { email: string; password: string };
};
========
export type UpdateAdminArgs =
  | { password: string }
  | { metadata: Record<string, string> };
>>>>>>>> 99a2a27e77c283bb6318f407ffdab3435f4e381a:src/lib/types/auth.ts
