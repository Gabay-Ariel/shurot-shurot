"use client";

import axios from "axios";
import useSWRMutation from "swr/mutation";
import { SignInArgs, SignInResult } from "../types/auth";

const signInFetcher = async (
  url: string,
  { arg }: { arg: SignInArgs }
): Promise<SignInResult> => {
  const response = await axios.post(url, arg, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const useSWRSignIn = () => useSWRMutation("/api/auth/signIn", signInFetcher);

export default useSWRSignIn;
