import { useState } from "react";
import { usePackage } from "../hooks/usePackage";
import PackageCard from "../components/PackageCard";
import MainButton from "../../../components/buttons/MainButton";
import { Plus, Package as PackageIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../../../components/modal/Modal";
import type { Package } from "../types/type";
import Input from "../../../components/forms/Input";

export default function AdminPackagePage() {
  const {
    packageListData: packages,
    isLoadingPackageList,
    packageListError,
    createPackageAsync,
    updatePackageAsync,
    deletePackageAsync,
  } = usePackage();

  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Partial<Package>>({
    name: "",
    category: "",
    validDays: 0,
    price: 0,
    description: "",
    isActive: true,
  });

  const handleAdd = () => {
    setSelectedPkg(null);
    setFormData({
      name: "",
      category: "",
      validDays: 0,
      price: 0,
      description: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPkg(pkg);
    setFormData(pkg);
    setShowModal(true);
  };

  const handleDelete = (pkg: Package) => {
    setSelectedPkg(pkg);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedPkg) return;
    try {
      await deletePackageAsync(selectedPkg.id!);
      toast.success("Package deleted!");
      setDeleteModal(false);
      setSelectedPkg(null);
    } catch {
      toast.error("Failed to delete package!");
    }
  };

  const handleSave = async () => {
    if (
      !formData.name?.trim() ||
      !formData.category?.trim() ||
      !formData.validDays ||
      !formData.price ||
      !formData.description?.trim()
    ) {
      toast.error("Please fill in all fields before saving!");
      return;
    }

    try {
      if (selectedPkg) {
        await updatePackageAsync({ id: selectedPkg.id!, payload: formData });
        toast.success("Package updated!");
      } else {
        await createPackageAsync(formData as Package);
        toast.success("Package created!");
      }
      setShowModal(false);
    } catch {
      toast.error("Failed to save package!");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteModal(false);
  };

  if (isLoadingPackageList) return <div>Loading packages...</div>;
  if (packageListError) return <div>Error: {packageListError.message}</div>;

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Package Management
            </h1>
            <p className="text-gray-500">Manage available packages</p>
          </div>
        </div>

        <MainButton icon={Plus} onClick={handleAdd} className="w-fit px-2 mb-4">
          Add Package
        </MainButton>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                p={pkg}
                mode="admin"
                onEdit={handleEdit}
                onDelete={() => handleDelete(pkg)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No packages available
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <PackageIcon className="w-7 h-7 text-emerald-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedPkg ? "Edit Package" : "Add New Package"}
            </h2>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {selectedPkg
                ? "Modify the details of the selected package."
                : "Fill in the details to create a new package."}
            </p>

            <div className="flex flex-col gap-4 w-full text-left">
              <Input
                id="name"
                type="text"
                label="Package Name"
                placeholder="Enter package name"
                value={formData.name || ""}
                onChange={(val) => setFormData((p) => ({ ...p, name: val }))}
              />

              <Input
                id="category"
                type="text"
                label="Category"
                placeholder="Enter category"
                value={formData.category || ""}
                onChange={(val) =>
                  setFormData((p) => ({ ...p, category: val }))
                }
              />

              <div className="flex gap-2">
                <Input
                  id="validDays"
                  type="number"
                  label="Valid Days"
                  placeholder="Enter validity period"
                  value={formData.validDays?.toString() || ""}
                  onChange={(val) =>
                    setFormData((p) => ({ ...p, validDays: Number(val) }))
                  }
                />

                <Input
                  id="price"
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                  value={formData.price?.toString() || ""}
                  onChange={(val) =>
                    setFormData((p) => ({ ...p, price: Number(val) }))
                  }
                />
              </div>

              <Input
                id="description"
                type="text"
                label="Description"
                placeholder="Enter short description"
                value={formData.description || ""}
                onChange={(val) =>
                  setFormData((p) => ({ ...p, description: val }))
                }
              />

              <label className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                <input
                  type="checkbox"
                  checked={formData.isActive || false}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, isActive: e.target.checked }))
                  }
                  className="w-4 h-4 accent-emerald-600"
                />
                <span>Active</span>
              </label>
            </div>

            <div className="flex gap-3 w-full mt-6">
              <MainButton
                onClick={handleCloseModal}
                className="flex-1 bg-red-100 hover:bg-red-200"
              >
                <span className="text-red-500">Cancel</span>
              </MainButton>

              <MainButton
                onClick={handleSave}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {selectedPkg ? "Save Changes" : "Create"}
              </MainButton>
            </div>
          </div>
        </Modal>
      )}

      {deleteModal && selectedPkg && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-200 mb-4">
              <Trash2 className="w-7 h-7 text-red-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-600">
                {selectedPkg.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3 w-full mt-6">
              <MainButton
                onClick={handleCloseModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200"
              >
                <span className="text-gray-800">Cancel</span>
              </MainButton>

              <MainButton
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Delete
              </MainButton>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
