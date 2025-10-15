import { BadgeCheck, Calendar, CheckCircle, CreditCard } from "lucide-react";
import { formatRupiah } from "../../../utils/formatToRupiah";
import { formatDate } from "../../../utils/formatDate";
import type { Transaction } from "../types/type";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <article className="border border-gray-200 rounded-xl p-5 mb-4 hover:border-emerald-500 transition-colors duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-lg font-semibold text-gray-800 flex-1">
          {transaction.package.name}
        </h2>
        <span
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full 
          border border-emerald-200 text-emerald-700 bg-emerald-50 whitespace-nowrap flex-shrink-0"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          {transaction.status}
        </span>
      </div>

      {transaction?.package?.tags!.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {transaction.package.tags!.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full 
              border border-emerald-200 text-emerald-700 bg-emerald-50"
            >
              <BadgeCheck className="w-3.5 h-3.5" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
        {transaction.package.description}
      </p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>{transaction.msisdn}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(transaction.createdAt)}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 flex items-end justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Transaction ID
          </div>
          <div className="text-sm font-medium text-gray-700">
            #{transaction.id}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Amount Paid
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatRupiah(transaction.price)}
          </div>
        </div>
      </div>
    </article>
  );
}
