import { BadgeCheck, ShoppingCart } from "lucide-react";
import MainButton from "../../../components/buttons/MainButton";
import { formatRupiah } from "../../../utils/formatToRupiah";

interface PackageCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  tags?: string[];
  onBuy?: (id: number) => void;
}

export default function PackageCard({
  id,
  name,
  description,
  price,
  tags = [],
  onBuy,
}: PackageCardProps) {
  return (
    <article className="relative bg-white rounded-2xl shadow-xl flex flex-col justify-between h-full p-6">
      <h2 className="text-xl font-semibold text-gray-800 leading-tight">
        {name}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 border border-emerald-100"
          >
            <BadgeCheck className="w-4 h-4" />
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 text-gray-600">{description}</p>

      <div className="mt-6">
        <div className="text-sm text-gray-500">Price</div>
        <div className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          {formatRupiah(price)}
        </div>
      </div>

      <div className="mt-6">
        <MainButton onClick={() => onBuy?.(id)} icon={ShoppingCart}>
          Buy Now
        </MainButton>
      </div>
    </article>
  );
}
