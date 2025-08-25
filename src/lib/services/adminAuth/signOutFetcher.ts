"use client";

import { APIResult } from "@/lib/types/services";
import axios from "axios";

const signOutFetcher = async (url: string): Promise<APIResult> => {
  const { data } = await axios.post(url);
  return data;
};

export default signOutFetcher;
