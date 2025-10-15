interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: any;
  className?: string;
}

export default function MainButton({
  onClick,
  disabled = false,
  isLoading = false,
  children,
  icon: Icon,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` flex items-center justify-center gap-2 py-2.5 rounded-lg cursor-pointer
        font-medium text-white bg-emerald-600 
        hover:bg-emerald-700 active:bg-emerald-800
        transition-colors duration-200
        disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
