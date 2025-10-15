import { useEffect, useState } from "react";
import { Lock, ArrowRight, Phone } from "lucide-react";
import Input from "../../../components/forms/Input";
import MainButton from "../../../components/buttons/MainButton";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, loading, error, user } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
        return;
      }
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    await login(phone, password);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !loading) handleSubmit();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md" onKeyDown={onKeyDown}>
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
            <p className="text-sm text-gray-500 mt-1">
              Access your internet services
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <Input
              id="phone"
              type="tel"
              label="Phone Number"
              placeholder="08xxxxxxxxxxx"
              value={phone}
              onChange={setPhone}
              icon={Phone}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              icon={Lock}
            />

            <MainButton
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              icon={ArrowRight}
              className="w-full"
            >
              Sign In
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}
