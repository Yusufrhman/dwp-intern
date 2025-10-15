import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "../types/type";
import {
  createTransaction,
  getTransactions,
} from "../services/transactionService";

export const useTransaction = ({
  id,
  userId,
}: {
  id?: number | string;
  userId?: number;
} = {}) => {
  const queryClient = useQueryClient();

  const transactionListQuery = useQuery<Transaction[], Error>({
    queryKey: ["transaction", "list"],
    queryFn: () => getTransactions({ userId }),
    enabled: !id,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Mutation: Create
  const createMutation = useMutation<Transaction, Error, Transaction>({
    mutationFn: createTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["transaction", "list"],
      });
    },
  });

  return {
    transactionListData: transactionListQuery.data || [],
    isLoadingTransactionList: transactionListQuery.isLoading,
    transactionListError: transactionListQuery.error,
    refetchTransactionList: transactionListQuery.refetch,

    // Create
    createTransaction: createMutation.mutate,
    createTransactionAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
};
