interface InputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: any;
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
        <Icon
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            hasError ? "text-red-500" : "text-gray-400"
          }`}
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition border ${
            hasError
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          }`}
        />
      </div>

      {hasError && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
