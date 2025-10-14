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
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    await login(phone, password);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
            <p className="text-gray-500">Access your internet services</p>
          </div>

          <div className="space-y-6">
            <Input
              id="phone"
              type="tel"
              label="Phone Number"
              placeholder="08xxxxxxxxxxx"
              value={phone}
              onChange={setPhone}
              icon={Phone}
              error={error || undefined}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              icon={Lock}
              // Password belum digunakan, tapi tetap ditampilkan
            />

            <MainButton
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              icon={ArrowRight}
            >
              Sign In
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}
