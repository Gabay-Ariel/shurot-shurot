import { AuthError, User } from "@supabase/supabase-js";

export type APIResult = {
  success: boolean;
  user?: User;
  error?: AuthError;
};

export type SignInArg = {
  arg: { email: string; password: string };
};
