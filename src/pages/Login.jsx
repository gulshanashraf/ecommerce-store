import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
     "https://product-mvc-production-4b95.up.railway.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      // Save user + JWT token
      login(data.user, data.token);

      alert("Login successful!");

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f3ef] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-[#7C0000]/10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#7C0000]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your Fashion Store account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Username
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-[#7C0000] focus-within:ring-2 focus-within:ring-[#7C0000]/10">

              <User
                size={19}
                className="text-[#7C0000]"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full outline-none text-sm text-gray-800"
              />

            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-[#7C0000] focus-within:ring-2 focus-within:ring-[#7C0000]/10">

              <Lock
                size={19}
                className="text-[#7C0000]"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full outline-none text-sm text-gray-800"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((v) => !v)
                }
                className="text-gray-500 hover:text-[#7C0000]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#7C0000] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#9E1A1A] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* Signup Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-[#7C0000] hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}