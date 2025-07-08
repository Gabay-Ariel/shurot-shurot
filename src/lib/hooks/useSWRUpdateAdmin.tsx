import axios from "axios";
import useSWRMutation from "swr/mutation";
import { UpdateAdminArgs } from "../types/auth";

const updateAdminFetcher = async (
  url: string,
  { arg }: { arg: UpdateAdminArgs }
) => {
  const response = await axios.put(url, arg, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const useSWRUpdateAdmin = () =>
  useSWRMutation("/api/auth/updateAdmin", updateAdminFetcher);

export default useSWRUpdateAdmin;
