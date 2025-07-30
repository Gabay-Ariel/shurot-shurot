"use client";

import axios from "axios";
import { APIResult } from "../types/services";

const signOutFetcher = async (url: string): Promise<APIResult> => {
  const { data } = await axios.post(url);
  return data;
};

export default signOutFetcher;
