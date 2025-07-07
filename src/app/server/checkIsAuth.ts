import supabaseServerClient from "@/lib/clients/supabaseServerClient";

export const checkIsAuth = async (): Promise<boolean> => {
  const supabaseClient = await supabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (!!user && !error) return true;
  return false;
};
