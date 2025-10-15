interface InputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: any;
  error?: string;
}

export default function Input({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
}: InputProps) {
  const hasError = !!error;
  const hasIcon = Boolean(Icon);

  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 ${
          hasError ? "text-red-600" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        {hasIcon && (
          <Icon
            aria-hidden
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              hasError ? "text-red-500" : "text-gray-400"
            }`}
          />
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${
            hasIcon ? "pl-11" : "pl-3"
          } pr-3 py-2.5 rounded-lg outline-none transition
            border text-gray-900 placeholder:text-gray-400
            focus-visible:outline-none
            ${
              hasError
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            }`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
      </div>

      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
