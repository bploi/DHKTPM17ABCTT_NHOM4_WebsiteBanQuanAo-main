import React, { useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { ArrowRight, Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formAuthentication, setFormAuthentication] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAuthentication((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formAuthentication),
      });

      if (response.ok) {
        const result = await response.json();

        if (result && result.result && result.result.token) {
          const token = result.result.token;
          localStorage.setItem("accessToken", token);

          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);

          const userRole = decodedToken.scope;

          toast.success("Login successful!");

          if (userRole === "ADMIN") {
            navigate("/admin");
          } else if (userRole === "USER") {
            navigate("/");
          } else {
            navigate("/staff/orders");
          }
        } else {
          toast.error("Login failed: Authentication token not received.");
        }
      } else {
        let errorData = { message: "Invalid username or password." };
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.error("Could not parse JSON from error response.");
        }
        console.error("Login error:", errorData);
        toast.error(
            `Login failed: ${errorData.message || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Network or unknown error:", error);
      toast.error(
          "An error occurred. Please check your network connection and try again."
      );
    }
  };

  return (
      <div className="min-h-screen bg-[#f3f3f1] px-4 py-8 text-black sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left panel */}
          <div className="flex flex-col border-b border-black/10 bg-[#f8f8f8] p-8 lg:border-b-0 lg:border-r lg:p-12">
            <div>
              <p className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666]">
                DTCLL SHOP • ACCOUNT ACCESS
              </p>

              <h1 className="mt-8 text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Welcome Back
                <span className="block text-[#666]">Sign in to continue</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#5f6368]">
                Access your account to continue shopping, manage your profile,
                review orders, and explore the latest DTCLL SHOP updates.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-black/10 bg-white p-4">
                  <p className="text-2xl font-bold">Fast</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                    Access
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-4">
                  <p className="text-2xl font-bold">Secure</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                    Login
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-4">
                  <p className="text-2xl font-bold">Clean</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                    Experience
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[32px] bg-black p-8 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Core line
              </p>
              <p className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em]">
                Less noise.
              </p>
              <p className="mt-1 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white/70">
                More style.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-xl">
              <div className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                  Sign in
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                  Account Login
                </h2>
                <p className="mt-3 text-base leading-8 text-[#5f6368]">
                  Enter your account information below to access DTCLL SHOP.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-3 block text-sm font-semibold text-black">
                    Username
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-[#f7f7f7] px-4 py-4 transition focus-within:border-black">
                    <User className="h-5 w-5 text-[#666]" />
                    <input
                        type="text"
                        name="username"
                        className="w-full bg-transparent text-base outline-none placeholder:text-[#9ca3af]"
                        value={formAuthentication.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-black">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-[#f7f7f7] px-4 py-4 transition focus-within:border-black">
                    <Lock className="h-5 w-5 text-[#666]" />
                    <input
                        type="password"
                        name="password"
                        className="w-full bg-transparent text-base outline-none placeholder:text-[#9ca3af]"
                        value={formAuthentication.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                      type="button"
                      className="text-left text-sm font-medium text-[#5f6368] transition hover:text-black"
                      onClick={() => {
                        navigate("/forget_password");
                      }}
                  >
                    Forgot password?
                  </button>

                  <button
                      type="button"
                      className="text-left text-sm font-medium text-[#5f6368] transition hover:text-black"
                      onClick={() => {
                        navigate("/register");
                      }}
                  >
                    Need an account? Sign up
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                      type="submit"
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-[#2d2d2d]"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                      type="button"
                      className="inline-flex h-14 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#f3f3f3]"
                      onClick={() => {
                        navigate("/register");
                      }}
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <div className="mt-8 rounded-[24px] border border-black/10 bg-[#f8f8f8] p-5">
                <p className="text-sm font-semibold text-black">
                  Access note
                </p>
                <p className="mt-2 text-sm leading-7 text-[#5f6368]">
                  Your account access is role-based. After signing in, you will be
                  redirected according to your permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
