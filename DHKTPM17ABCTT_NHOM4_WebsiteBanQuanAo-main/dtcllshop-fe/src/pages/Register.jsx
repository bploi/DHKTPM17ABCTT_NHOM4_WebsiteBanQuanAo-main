import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const REGEX = {
    email: /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
    phoneNumber: /^(0[3|5|7|8|9])+([0-9]{8})$/,
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: "MALE",
    dateOfBirth: "",
    username: "",
    password: "",
    password_confirmed: "",
  });

  const [validationStatus, setValidationStatus] = useState({
    fullName: null,
    phoneNumber: null,
    email: null,
    username: null,
    password: null,
    password_confirmed: null,
  });

  const handleValidation = (e) => {
    const { name, value } = e.target;
    let isValid = false;

    if (value.trim() !== "") {
      switch (name) {
        case "fullName":
          isValid = value.trim().length > 0;
          break;
        case "username":
          isValid = value.trim().length >= 3;
          break;
        case "email":
          isValid = REGEX.email.test(value);
          break;
        case "phoneNumber":
          isValid = REGEX.phoneNumber.test(value);
          break;
        case "password":
          isValid = value.length >= 6;
          if (formData.password_confirmed) {
            setValidationStatus((prev) => ({
              ...prev,
              password_confirmed: value === formData.password_confirmed,
            }));
          }
          break;
        case "password_confirmed":
          isValid = formData.password === value;
          break;
        default:
          break;
      }
    }

    setValidationStatus((prev) => ({ ...prev, [name]: isValid }));
  };

  const getBorderClass = (fieldName) => {
    if (validationStatus[fieldName] === true) {
      return "border-emerald-400 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100";
    }
    if (validationStatus[fieldName] === false) {
      return "border-red-300 focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-100";
    }
    return "border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100";
  };

  const renderIcon = (fieldName) => {
    if (validationStatus[fieldName] === true) {
      return (
        <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500" />
      );
    }

    if (validationStatus[fieldName] === false) {
      return (
        <AlertCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />
      );
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      return toast.warning("Vui lòng điền đầy đủ họ và tên");
    }
    if (
      !formData.phoneNumber.trim() ||
      !REGEX.phoneNumber.test(formData.phoneNumber)
    ) {
      return toast.warning(
        "Số điện thoại không hợp lệ. Vui lòng nhập số bắt đầu bằng 03, 05, 07, 08, 09 và gồm 10 chữ số."
      );
    }
    if (!formData.email.trim() || !REGEX.email.test(formData.email)) {
      return toast.warning(
        "Thư điện tử không hợp lệ. Ví dụ đúng: user@example.com"
      );
    }
    if (formData.username.trim().length < 3) {
      return toast.warning("Tên đăng nhập phải có ít nhất 3 ký tự");
    }
    if (formData.password.length < 6) {
      return toast.warning("Mật khẩu phải có ít nhất 6 ký tự");
    }
    if (formData.password !== formData.password_confirmed) {
      return toast.warning("Mật khẩu xác nhận không khớp");
    }

    const accountData = {
      username: formData.username,
      password: formData.password,
      customer: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        gender: formData.gender.toUpperCase(),
        dateOfBirth: formData.dateOfBirth,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Tạo tài khoản thành công", result);
        toast.success("Đăng ký thành công! Chuyển đến trang đăng nhập...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorData = await response.json();
        console.error("Lỗi tạo tài khoản:", errorData);

        if (
          errorData.code === 1001 ||
          errorData.message === "User already exists"
        ) {
          toast.error(
            "Tên đăng nhập hoặc email đã tồn tại. Vui lòng dùng thông tin khác."
          );
        } else {
          toast.error(
            `Đăng ký thất bại: ${errorData.message || "Vui lòng thử lại."}`
          );
        }
      }
    } catch (error) {
      console.error("Lỗi mạng hoặc lỗi không xác định:", error);
      toast.error(
        "Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng và thử lại."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left panel */}
        <div className="flex flex-col border-b border-slate-200 bg-[#f8fbff] p-8 lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              DTCLL SHOP • TẠO TÀI KHOẢN
            </p>

            <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] text-slate-950 sm:text-5xl">
              Tham gia DTCLL
              <span className="block text-blue-600">
                Tạo tài khoản của bạn
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Tạo tài khoản để mua sắm nhanh hơn, quản lý hồ sơ, theo dõi đơn
              hàng và trải nghiệm DTCLL SHOP thuận tiện hơn.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <p className="text-2xl font-bold text-slate-950">Đơn giản</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  Đăng ký
                </p>
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <p className="text-2xl font-bold text-slate-950">Bảo mật</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  Tài khoản
                </p>
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <p className="text-2xl font-bold text-slate-950">Sẵn sàng</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  Mua sắm
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[24px] bg-slate-950 p-8 text-white shadow-[0_18px_44px_rgba(15,23,42,0.22)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
              Tinh thần cốt lõi
            </p>
            <p className="mt-5 text-3xl font-extrabold leading-tight">
              Ít ồn ào.
            </p>
            <p className="mt-1 text-3xl font-extrabold leading-tight text-blue-100">
              Nhiều phong cách.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Đăng ký
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
                Đăng ký tài khoản
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Điền thông tin bên dưới để tạo tài khoản DTCLL SHOP.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="relative md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Họ tên
                  </label>
                  <div
                    className={`relative flex items-center gap-3 rounded-[18px] border bg-slate-50 px-4 py-4 transition focus-within:bg-white ${getBorderClass(
                      "fullName"
                    )}`}
                  >
                    <User className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      className="w-full bg-transparent pr-8 text-base text-slate-950 outline-none placeholder:text-slate-400"
                      placeholder="Nhập họ tên của bạn"
                      required
                    />
                    {renderIcon("fullName")}
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Số điện thoại
                  </label>
                  <div
                    className={`relative flex items-center gap-3 rounded-[18px] border bg-slate-50 px-4 py-4 transition focus-within:bg-white ${getBorderClass(
                      "phoneNumber"
                    )}`}
                  >
                    <Phone className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      className="w-full bg-transparent pr-8 text-base text-slate-950 outline-none placeholder:text-slate-400"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                    {renderIcon("phoneNumber")}
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Thư điện tử
                  </label>
                  <div
                    className={`relative flex items-center gap-3 rounded-[18px] border bg-slate-50 px-4 py-4 transition focus-within:bg-white ${getBorderClass(
                      "email"
                    )}`}
                  >
                    <Mail className="h-5 w-5 text-blue-600" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      className="w-full bg-transparent pr-8 text-base text-slate-950 outline-none placeholder:text-slate-400"
                      placeholder="Nhập thư điện tử"
                      required
                    />
                    {renderIcon("email")}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Giới tính
                  </label>
                  <div className="flex h-[58px] items-center gap-6 rounded-[18px] border border-slate-200 bg-slate-50 px-4">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="MALE"
                        className="h-4 w-4 accent-blue-600"
                        checked={formData.gender === "MALE"}
                        onChange={handleChange}
                        required
                      />
                      <span className="text-sm text-slate-700">Nam</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="FEMALE"
                        className="h-4 w-4 accent-blue-600"
                        checked={formData.gender === "FEMALE"}
                        onChange={handleChange}
                        required
                      />
                      <span className="text-sm text-slate-700">Nữ</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Ngày sinh
                  </label>
                  <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full bg-transparent text-base text-slate-700 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Tên đăng nhập
                  </label>
                  <div
                    className={`relative flex items-center gap-3 rounded-[18px] border bg-slate-50 px-4 py-4 transition focus-within:bg-white ${getBorderClass(
                      "username"
                    )}`}
                  >
                    <User className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      className="w-full bg-transparent pr-8 text-base text-slate-950 outline-none placeholder:text-slate-400"
                      placeholder="Tạo tên đăng nhập"
                      required
                    />
                    {renderIcon("username")}
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Mật khẩu
                  </label>
                  <div
                    className={`relative flex items-center gap-3 rounded-[18px] border bg-slate-50 px-4 py-4 transition focus-within:bg-white ${getBorderClass(
                      "password"
                    )}`}
                  >
                    <Lock className="h-5 w-5 text-blue-600" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      className="w-full bg-transparent pr-8 text-base text-slate-950 outline-none placeholder:text-slate-400"
                      placeholder="Tạo mật khẩu"
                      required
                    />
                    {renderIcon("password")}
                  </div>
                </div>

                <div className="relative md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-slate-900">
                    Xác nhận mật khẩu
                  </label>
                  <div
                    className={`relative flex items-center gap-3 rounded-[18px] border bg-slate-50 px-4 py-4 transition focus-within:bg-white ${getBorderClass(
                      "password_confirmed"
                    )}`}
                  >
                    <Lock className="h-5 w-5 text-blue-600" />
                    <input
                      type="password"
                      name="password_confirmed"
                      value={formData.password_confirmed}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      className="w-full bg-transparent pr-8 text-base text-slate-950 outline-none placeholder:text-slate-400"
                      placeholder="Nhập lại mật khẩu"
                      required
                    />
                    {renderIcon("password_confirmed")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-3">
                <button
                  type="button"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </button>

                <button
                  type="submit"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)] transition hover:bg-blue-700"
                >
                  Đăng ký
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Về trang chủ
                </button>
              </div>
            </form>

            <div className="mt-8 rounded-[18px] border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-slate-950">
                Lưu ý đăng ký
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Vui lòng kiểm tra kỹ thông tin cá nhân trước khi gửi yêu cầu
                đăng ký.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
