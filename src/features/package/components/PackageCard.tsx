import { BadgeCheck, Pencil, Trash2, ShoppingCart } from "lucide-react";
import MainButton from "../../../components/buttons/MainButton";
import { formatRupiah } from "../../../utils/formatToRupiah";
import type { Package } from "../types/type";

interface PackageCardProps {
  p: Package;
  mode?: "user" | "admin";
  onBuy?: (p: Package) => void;
  onEdit?: (p: Package) => void;
  onDelete?: (id: string | number) => void;
}

export default function PackageCard({
  p,
  mode = "user",
  onBuy,
  onEdit,
  onDelete,
}: PackageCardProps) {
  return (
    <article
      className="border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-full
      hover:border-emerald-500 transition-colors duration-200"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>

        {p.tags && p.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
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

      <div className="mt-6 flex gap-2">
        {mode === "user" ? (
          <MainButton
            onClick={() => onBuy?.(p)}
            icon={ShoppingCart}
            className="w-full"
          >
            Buy Now
          </MainButton>
        ) : (
          <>
            <MainButton
              onClick={() => onEdit?.(p)}
              icon={Pencil}
              className="flex-1"
            >
              Edit
            </MainButton>
            <MainButton
              onClick={() => onDelete?.(p.id!)}
              className="flex-1 bg-red-100 hover:bg-red-200"
            >
              <span className="text-red-500 flex gap-2"><Trash2/> Delete</span>
            </MainButton>
          </>
        )}
      </div>
    </article>
  );
}
