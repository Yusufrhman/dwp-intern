import axios from "axios";
import type { User } from "../types/type";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const getUser = async (params: {
  phone?: string;
}): Promise<User> => {
  try {
    const res = await axios.get<User[]>(`${BASE_URL}/users`, {
      params: { ...params },
    });
      console.log(res)
    return res.data[0];
  } catch (error: any) {
    console.error("GET USER ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal mengambil data user."
    );
  }
};
