import axios from "axios";
import type { Transaction } from "../types/type";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const getTransactions = async (params: {
  userId?: number;
}): Promise<Transaction[]> => {
  try {
    const res = await axios.get<Transaction[]>(`${BASE_URL}/transactions`, {
      params: {
        ...params,
      },
    });

    const sorted = res.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted;
  } catch (error: any) {
    console.error("GET TRANSACTIONS ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal mengambil data TRANSACTIONS."
    );
  }
};

export const createTransaction = async (
  payload: Transaction
): Promise<Transaction> => {
  try {
    const res = await axios.post<Transaction>(
      `${BASE_URL}/transactions`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("CREATE TRANSACTION ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal membuat Transaksi baru."
    );
  }
};
