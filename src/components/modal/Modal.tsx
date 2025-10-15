import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Modal({
  children,
  onClose,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-[45]"
      />

      <dialog
        open
        ref={dialogRef}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          flex items-center justify-center rounded-2xl px-8 py-6 w-[90%] max-w-md z-50 shadow-xl
          bg-white text-gray-900 transition-all duration-300 ${className}`}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
