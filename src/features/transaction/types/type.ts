import type { Package } from "../../package/types/type";

export interface Transaction {
  id?: number;
  userId: number;
  packageId: string | number;
  package: Package;
  msisdn: string;
  status: string;
  price: number;
  createdAt: string;
}
