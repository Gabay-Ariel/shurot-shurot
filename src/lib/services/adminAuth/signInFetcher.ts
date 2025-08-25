"use client";

import axios from "axios";
import { APIResult, SignInArg } from "@/lib/types/services";
import { headers } from "@/lib/helpers/services";

const signInFetcher = async (
  url: string,
  { arg }: SignInArg
): Promise<APIResult> => {
  const { data } = await axios.post(url, arg, { headers });
  return data;
};

export default signInFetcher;
