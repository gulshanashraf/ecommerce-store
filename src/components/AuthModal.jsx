
import { useState } from "react";
import {
  X,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function AuthModal({
  mode,
  onClose,
  onSwitch,
}) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  // Railway Backend URL
  const API_URL =
    "https://product-mvc-production-4b95.up.railway.app";

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const cleanUsername = username.trim();

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!cleanUsername || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (isSignup && !confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // ===================================================
      // SIGNUP
      // ===================================================

      if (isSignup) {
        const signupResponse = await fetch(
          `${API_URL}/user/createuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: cleanUsername,
              password: password,
            }),
          }
        );

        const signupData = await signupResponse.json();

        // =================================================
        // SIGNUP ERROR
        // =================================================

        if (!signupResponse.ok) {
          // Username already exists
          if (signupResponse.status === 409) {
            setError(
              "Your account already exists. Please login."
            );
            return;
          }

          // Other actual server error
          if (signupResponse.status === 500) {
            setError(
              "Unable to create account. Please try again."
            );
            return;
          }

          setError(
            signupData.error ||
              "Unable to create account. Please try again."
          );

          return;
        }

        // =================================================
        // SIGNUP SUCCESS → AUTOMATIC LOGIN
        // =================================================

        const loginResponse = await fetch(
          `${API_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: cleanUsername,
              password: password,
            }),
          }
        );

        const loginData = await loginResponse.json();

        // =================================================
        // AUTO LOGIN ERROR
        // =================================================

        if (!loginResponse.ok || !loginData.token) {
          if (loginResponse.status === 404) {
            setError(
              "Your account does not exist. Please sign up first."
            );
          } else if (loginResponse.status === 401) {
            setError("Your password is wrong.");
          } else if (loginResponse.status === 500) {
            setError(
              "Account created, but login failed. Please login manually."
            );
          } else {
            setError(
              "Account created, but login failed. Please login manually."
            );
          }

          return;
        }

        // =================================================
        // SAVE USER
        // =================================================

        login(
          {
            username: cleanUsername,
          },
          loginData.token
        );

        // =================================================
        // CLOSE MODAL
        // =================================================

        onClose();

        // =================================================
        // CLEAR FIELDS
        // =================================================

        setUsername("");
        setPassword("");
        setConfirmPassword("");

        return;
      }

      // ===================================================
      // LOGIN
      // ===================================================

      const loginResponse = await fetch(
        `${API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: cleanUsername,
            password: password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      // =================================================
      // LOGIN ERROR
      // =================================================

      if (!loginResponse.ok) {
        // Username does not exist
        if (loginResponse.status === 404) {
          setError(
            "Your name is wrong. Please sign up first."
          );
          return;
        }

        // Username exists but password is wrong
        if (loginResponse.status === 401) {
          setError("Your password is wrong.");
          return;
        }

        // Missing fields
        if (loginResponse.status === 400) {
          setError(
            "Please enter your username and password."
          );
          return;
        }

        // Actual server error
        if (loginResponse.status === 500) {
          setError(
            "Server error. Please try again."
          );
          return;
        }

        setError(
          loginData.error ||
            "Login failed. Please try again."
        );

        return;
      }

      // =================================================
      // TOKEN CHECK
      // =================================================

      if (!loginData.token) {
        setError(
          "Login failed. Token was not received."
        );
        return;
      }

      // =================================================
      // SAVE LOGIN
      // =================================================

      login(
        {
          username: cleanUsername,
        },
        loginData.token
      );

      // =================================================
      // CLOSE MODAL
      // =================================================

      onClose();

      // =================================================
      // CLEAR FIELDS
      // =================================================

      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Authentication Error:", err);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SWITCH MODE
  // =====================================================

  const handleSwitch = (newMode) => {
    setError("");

    setUsername("");
    setPassword("");
    setConfirmPassword("");

    setShowPassword(false);
    setShowConfirmPassword(false);

    onSwitch(newMode);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-[#7C0000]/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-[#7C0000] hover:text-white"
        >
          <X size={19} />
        </button>

        {/* TITLE */}

        <div className="mb-7 text-center pr-7">
          <h2 className="text-3xl font-bold text-[#7C0000]">
            {isSignup
              ? "Create Account"
              : "Welcome Back"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {isSignup
              ? "Create your Fashion Store account"
              : "Login to your Fashion Store account"}
          </p>
        </div>

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            <div>{error}</div>

            {/* SIGNUP → LOGIN */}

            {isSignup &&
              error.includes("already exists") && (
                <button
                  type="button"
                  onClick={() => handleSwitch("login")}
                  className="mt-2 font-bold underline"
                >
                  Login
                </button>
              )}

            {/* LOGIN → SIGNUP */}

            {!isSignup &&
              error.includes("sign up first") && (
                <button
                  type="button"
                  onClick={() => handleSwitch("signup")}
                  className="mt-2 font-bold underline"
                >
                  Sign Up
                </button>
              )}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* USERNAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Username
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 transition focus-within:border-[#7C0000] focus-within:ring-2 focus-within:ring-[#7C0000]/10">
              <User
                size={19}
                className="shrink-0 text-[#7C0000]"
              />

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full bg-transparent text-sm text-gray-800 outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 transition focus-within:border-[#7C0000] focus-within:ring-2 focus-within:ring-[#7C0000]/10">
              <Lock
                size={19}
                className="shrink-0 text-[#7C0000]"
              />

              <input
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete={
                  isSignup
                    ? "new-password"
                    : "current-password"
                }
                className="w-full bg-transparent text-sm text-gray-800 outline-none"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
                className="text-gray-500 transition hover:text-[#7C0000]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          {isSignup && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 transition focus-within:border-[#7C0000] focus-within:ring-2 focus-within:ring-[#7C0000]/10">
                <Lock
                  size={19}
                  className="shrink-0 text-[#7C0000]"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="w-full bg-transparent text-sm text-gray-800 outline-none"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  className="text-gray-500 transition hover:text-[#7C0000]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#7C0000] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#9E1A1A] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isSignup
                ? "Creating Account..."
                : "Logging In..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* SWITCH LOGIN / SIGNUP */}

        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  handleSwitch("login")
                }
                className="font-bold text-[#7C0000] hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  handleSwitch("signup")
                }
                className="font-bold text-[#7C0000] hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
