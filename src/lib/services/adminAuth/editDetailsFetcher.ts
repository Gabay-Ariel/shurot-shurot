"use client";

import axios from "axios";
import { APIResult, EditAdminDetailsArg } from "@/lib/types/services";
import { headers } from "@/lib/helpers/services";

const editDetailsFetcher = async (
  url: string,
  { arg }: EditAdminDetailsArg
): Promise<APIResult> => {
  const { data } = await axios.put(url, arg, { headers });
  return data;
};

export default editDetailsFetcher;
