import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Package, PackageParams } from "../types/type";
import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
} from "../services/packageService";

export const usePackage = ({
  id,
  params,
}: {
  id?: number | string;
  params?: PackageParams;
} = {}) => {
  const queryClient = useQueryClient();

  const packageListQuery = useQuery<Package[], Error>({
    queryKey: ["packages", "list", params],
    queryFn: () => getPackages(params!),
    enabled: !id,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const createMutation = useMutation<Package, Error, Package>({
    mutationFn: createPackage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["packages", "list"] });
    },
  });

  const updateMutation = useMutation<
    Package,
    Error,
    { id: number | string; payload: Partial<Package> }
  >({
    mutationFn: ({ id, payload }) => updatePackage(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["packages", "list"] });
    },
  });

  const deleteMutation = useMutation<void, Error, number | string>({
    mutationFn: deletePackage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["packages", "list"] });
    },
  });

  return {
    packageListData: packageListQuery.data || [],
    isLoadingPackageList: packageListQuery.isLoading,
    packageListError: packageListQuery.error,
    refetchPackageList: packageListQuery.refetch,

    createPackage: createMutation.mutate,
    createPackageAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updatePackage: updateMutation.mutate,
    updatePackageAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    deletePackage: deleteMutation.mutate,
    deletePackageAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};
