import axios from "axios";
import type { Package } from "../types/type";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const getPackages = async (params?: {
  isActive?: boolean;
}): Promise<Package[]> => {
  try {
    const res = await axios.get<Package[]>(`${BASE_URL}/packages`, { params });
    return res.data;
  } catch (error: any) {
    console.error("GET PACKAGES ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal mengambil data PACKAGES."
    );
  }
};

export const createPackage = async (payload: Package): Promise<Package> => {
  try {
    const res = await axios.post<Package>(`${BASE_URL}/packages`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    console.error("CREATE PACKAGE ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal membuat Package baru."
    );
  }
};

export const updatePackage = async (
  id: number | string,
  payload: Partial<Package>
): Promise<Package> => {
  try {
    const res = await axios.put<Package>(
      `${BASE_URL}/packages/${id}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("UPDATE PACKAGE ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal memperbarui Package."
    );
  }
};

export const deletePackage = async (id: number | string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/packages/${id}`);
  } catch (error: any) {
    console.error("DELETE PACKAGE ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal menghapus Package."
    );
  }
};
