export interface Package {
  id?: string | number;
  name: string;
  category: string;
  validDays: number;
  price: number;
  description: string;
  isActive: boolean;
  tags?: string[];
}

export interface PackageParams {
  isActive?: boolean;
}
