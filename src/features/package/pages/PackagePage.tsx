import { usePackage } from "../hooks/usePackage";
import PackageCard from "../components/PackageCard"; // sesuaikan path

export default function PackagePage() {
  const {
    packageListData: packages,
    isLoadingPackageList,
    packageListError,
  } = usePackage({
    params: { isActive: true },
  });

  if (isLoadingPackageList) return <div>Loading packages...</div>;
  if (packageListError) return <div>Error: {packageListError.message}</div>;

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Available Packages
          </h1>
          <p className="text-gray-500">Choose your best internet package</p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 h-full">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              name={pkg.name}
              description={pkg.description}
              price={pkg.price}
              tags={pkg.tags}
              onBuy={(id) => console.log("Buy package:", id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
