"use client";

import axios from "axios";
import useSWRMutation from "swr/mutation";

const signOutFetcher = async (url: string) => {
  const response = await axios.post(url, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const useSWRSignOut = () => useSWRMutation("/api/auth/signOut", signOutFetcher);

export default useSWRSignOut;
