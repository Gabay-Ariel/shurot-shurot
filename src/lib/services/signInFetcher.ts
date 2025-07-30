"use client";

import axios from "axios";
import { APIResult, SignInArg } from "../types/services";
import { headers } from "../helpers/services";

const signInFetcher = async (
  key: string,
  { arg }: SignInArg
): Promise<APIResult> => {
  const { data } = await axios.post(key, arg, { headers });
  return data;
};

export default signInFetcher;
