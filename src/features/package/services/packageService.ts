import axios from "axios";
import type { Package } from "../types/type";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const getPackages = async (params: {
  isActive?: boolean;
}): Promise<Package[]> => {
  try {
    const res = await axios.get<Package[]>(`${BASE_URL}/packages`, {
      params: { ...params },
    });
    return res.data;
  } catch (error: any) {
    console.error("GET PACKAGES ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal mengambil data PACKAGES."
    );
  }
};
