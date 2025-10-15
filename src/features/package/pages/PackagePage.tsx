import { useState } from "react";
import { usePackage } from "../hooks/usePackage";
import PackageCard from "../components/PackageCard";
import MainButton from "../../../components/buttons/MainButton";
import { ShoppingCart, BadgeCheck } from "lucide-react";
import { formatRupiah } from "../../../utils/formatToRupiah";
import type { Package } from "../types/type";
import Modal from "../../../components/modal/Modal";
import { useTransaction } from "../../transaction/hooks/useTransaction";
import { useAuth } from "../../auth/contexts/AuthContext";
import type { Transaction } from "../../transaction/types/type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PackagePage() {
  const { user } = useAuth();

  const {
    packageListData: packages,
    isLoadingPackageList,
    packageListError,
  } = usePackage({
    params: { isActive: true },
  });

  const navigate = useNavigate();

  const { createTransactionAsync, isCreating } = useTransaction();

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  if (isLoadingPackageList) return <div>Loading packages...</div>;
  if (packageListError) return <div>Error: {packageListError.message}</div>;

  const handleBuy = (pkg: Package) => setSelectedPackage(pkg);
  const handleCloseModal = () => {
    setSelectedPackage(null);
  };

  const handleConfirmBuy = async () => {
    if (!selectedPackage) return;

    try {
      const payload: Transaction = {
        userId: user!.id,
        packageId: selectedPackage!.id!,
        package: selectedPackage!,
        msisdn: user!.phone!,
        status: "SUCCESS",
        price: selectedPackage!.price,
        createdAt: new Date().toISOString(),
      };

      await createTransactionAsync(payload);
      toast.success("Transaction Success!");
      setSelectedPackage(null);
      navigate("/dashboard/transaction");
    } catch (err: any) {
      toast.error(
        "Transaction Failed: " + (err?.message || "Please try again.")
      );
    }
  };

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Available Packages
          </h1>
          <p className="text-gray-500">Choose your best internet package</p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 h-full">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} p={pkg} onBuy={handleBuy} />
          ))}
        </div>
      </div>

      {selectedPackage && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto ">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <ShoppingCart className="w-7 h-7 text-emerald-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Confirm Your Purchase
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You’re about to buy{" "}
              <span className="font-medium text-emerald-600">
                {selectedPackage.name}
              </span>{" "}
              for{" "}
              <span className="font-semibold block text-lg text-gray-900">
                {formatRupiah(selectedPackage.price)}
              </span>
              .
            </p>

            {selectedPackage.tags && selectedPackage.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {selectedPackage.tags.map((tag) => (
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

            <div className="flex gap-3 w-full mt-2">
              <MainButton
                onClick={handleCloseModal}
                disabled={isCreating}
                className="flex-1 bg-red-100 hover:bg-red-200"
              >
                <span className="text-red-500">Cancel</span>
              </MainButton>

              <MainButton
                onClick={handleConfirmBuy}
                disabled={isCreating}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {isCreating ? "Processing..." : "Confirm"}
              </MainButton>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
