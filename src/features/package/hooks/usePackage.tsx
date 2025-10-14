import { useQuery } from "@tanstack/react-query";
import type { Package, PackageParams } from "../types/type";
import { getPackages } from "../services/packageService";

export const usePackage = ({
  id,
  params,
}: {
  id?: number | string;
  params?: PackageParams;
} = {}) => {
  const packageListQuery = useQuery<Package[], Error>({
    queryKey: ["packages", "list", params],
    queryFn: () => getPackages(params!),
    enabled: !id,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    packageListData: packageListQuery.data || [],
    isLoadingPackageList: packageListQuery.isLoading,
    packageListError: packageListQuery.error,
    refetchPackageList: packageListQuery.refetch,
  };
};
