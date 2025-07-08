import { AuthError, User } from "@supabase/supabase-js";

export type SignInArgs = {
  email: string;
  password: string;
};

export type SignInResult = {
  success: boolean;
  user?: User;
  error?: AuthError;
};

export type UpdateAdminArgs =
  | { password: string }
  | { metadata: Record<string, string> };
