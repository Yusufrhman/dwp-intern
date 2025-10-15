import { BadgeCheck, ShoppingCart } from "lucide-react";
import MainButton from "../../../components/buttons/MainButton";
import { formatRupiah } from "../../../utils/formatToRupiah";
import type { Package } from "../types/type";

interface PackageCardProps {
  p: Package;
  onBuy?: (p: Package) => void;
}

export default function PackageCard({ p, onBuy }: PackageCardProps) {
  return (
    <article
      className="border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-full
      hover:border-emerald-500 transition-colors duration-200"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>

        {p != null && p.tags!.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags!.map((tag) => (
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
          {p.description}
        </p>
      </div>

      <div className="mt-6">
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Price
        </div>
        <div className="text-2xl font-semibold text-gray-900">
          {formatRupiah(p.price)}
        </div>
      </div>

      <div className="mt-6">
        <MainButton onClick={() => onBuy?.(p)} icon={ShoppingCart}>
          Buy Now
        </MainButton>
      </div>
    </article>
  );
}
