import { useAuth } from "../../auth/contexts/AuthContext";
import TransactionItem from "../components/TransactionItem";
import { useTransaction } from "../hooks/useTransaction";

export default function TransactionPage() {
  const { user } = useAuth();
  const {
    transactionListData: transactions,
    isLoadingTransactionList,
    transactionListError,
  } = useTransaction({
    userId: user?.id,
  });

  if (isLoadingTransactionList) return <div>Loading packages...</div>;
  if (transactionListError)
    return <div>Error: {transactionListError.message}</div>;

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Transaction History
          </h1>
          <p className="text-gray-500">View all your package purchases</p>
        </div>
        <div className="max-w-4xl mx-auto">
          {transactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </div>
      </div>
    </main>
  );
}
