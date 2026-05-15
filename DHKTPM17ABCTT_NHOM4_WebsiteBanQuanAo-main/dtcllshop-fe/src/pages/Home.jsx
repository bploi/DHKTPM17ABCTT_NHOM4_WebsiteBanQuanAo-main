import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  TrendingUp,
  Award,
  Truck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
} from "lucide-react";
import "../css/Home.css";
import ChatBot from "../components/ChatBot";
import Contact from "../components/Contact";

const Home = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bestseller");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("login", checkAuth);
    window.addEventListener("logout", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("login", checkAuth);
      window.removeEventListener("logout", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        if (response.ok) {
          const data = await response.json();
          const productList = data.result || [];
          setProducts(productList);
        }
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const banners = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () =>
      setCurrentBanner((prev) => (prev + 1) % banners.length);

  const prevBanner = () =>
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  const getBestSellers = () => {
    return [...products]
        .filter((p) => p.quantity > 0)
        .sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0))
        .slice(0, 6);
  };

  const getNewArrivals = () => {
    return [...products]
        .filter((p) => p.quantity > 0)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const goToProduct = (id) => navigate(`/product/${id}`);

  const showcaseProducts =
      activeTab === "bestseller" ? getBestSellers() : getNewArrivals();

  const featureItems = [
    {
      icon: ShoppingBag,
      title: "Món đồ tối giản",
      desc: "Các sản phẩm đơn giản, dễ phối và phù hợp phong cách hằng ngày.",
    },
    {
      icon: TrendingUp,
      title: "Định hướng hiện đại",
      desc: "Phom dáng gọn gàng lấy cảm hứng từ xu hướng thời trang trẻ.",
    },
    {
      icon: Award,
      title: "Chất lượng chỉn chu",
      desc: "Hoàn thiện gọn gàng, chất liệu dễ mặc và thoải mái.",
    },
  ];

  return (
      <div className="min-h-[80vh] bg-[#f3f3f1] text-black">
        {/* HERO - BỐ CỤC MỚI */}
        <section className="border-b border-black/10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
            {/* Left content */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                DTCLL SHOP • MÙA MỚI
              </div>

              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Phong cách
                <span className="block text-[#5a5a5a]">Khác biệt</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#5f6368] sm:text-lg">
                Khám phá trải nghiệm mua sắm tinh gọn và cá tính hơn với sản
                phẩm được chọn lọc, phong cách hiện đại và nhận diện tối giản.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                    onClick={() => navigate("/product")}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-white transition hover:bg-[#2b2b2b]"
                >
                  Khám phá bộ sưu tập
                </button>

                <button
                    onClick={() => navigate("/about")}
                    className="inline-flex h-14 items-center justify-center rounded-full border border-black/15 bg-white px-8 text-sm font-semibold text-black transition hover:bg-[#ececec]"
                >
                  Xem câu chuyện thương hiệu
                </button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                <div className="rounded-[24px] border border-black/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold">{products.length}+</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                    Sản phẩm
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold">Nhanh chóng</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                    Giao hàng
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold">Mới</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                    Ra mắt
                  </p>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <img
                    src={banners[currentBanner]}
                    alt={`Ảnh bìa ${currentBanner + 1}`}
                    className="h-[520px] w-full object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.50),rgba(0,0,0,0.10))]" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                      DTCLL BỘ SƯU TẬP
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Hiện đại, gọn gàng và giàu cá tính.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                        onClick={prevBanner}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextBanner}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBanner(index)}
                        className={`h-2.5 rounded-full transition-all ${
                            index === currentBanner
                                ? "w-8 bg-black"
                                : "w-2.5 bg-black/30 hover:bg-black/50"
                        }`}
                    />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE STRIP - KHÁC KIỂU CŨ */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4 flex-col sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                  Vì sao DTCLL khác biệt
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                  Gọn hơn, sắc hơn, mới hơn
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#6b7280]">
                Trang chủ được trình bày theo tinh thần thời trang hiện đại,
                tập trung vào sản phẩm, hình ảnh và trải nghiệm mua sắm.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {featureItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                        {item.desc}
                      </p>
                    </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRODUCTS - LAYOUT MỚI */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                  Sản phẩm chọn lọc
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                  Sản phẩm nổi bật
                </h2>
              </div>

              <div className="inline-flex w-fit rounded-full border border-black/10 bg-white p-1.5 shadow-sm">
                <button
                    onClick={() => setActiveTab("bestseller")}
                    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                        activeTab === "bestseller"
                            ? "bg-black text-white"
                            : "text-[#4b5563] hover:bg-[#f3f3f3]"
                    }`}
                >
                  Bán chạy
                </button>
                <button
                    onClick={() => setActiveTab("newarrival")}
                    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                        activeTab === "newarrival"
                            ? "bg-black text-white"
                            : "text-[#4b5563] hover:bg-[#f3f3f3]"
                    }`}
                >
                  Hàng mới
                </button>
              </div>
            </div>

            {loading ? (
                <div className="py-16 text-center">
                  <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent" />
                </div>
            ) : showcaseProducts.length === 0 ? (
                <div className="rounded-[32px] border border-dashed border-black/15 bg-white px-6 py-20 text-center shadow-sm">
                  <h3 className="text-3xl font-bold">Chưa có sản phẩm nổi bật</h3>
                  <p className="mt-4 text-[#6b7280]">
                    Sản phẩm sẽ hiển thị khi dữ liệu cửa hàng sẵn sàng.
                  </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {showcaseProducts.map((product) => (
                      <div
                          key={product.id}
                          onClick={() => goToProduct(product.id)}
                          className="group cursor-pointer overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.09)]"
                      >
                        <div className="relative h-[340px] overflow-hidden">
                          <img
                              src={product.imageUrlFront}
                              alt={product.name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                            {activeTab === "bestseller" ? "Bán chạy" : "Hàng mới"}
                          </div>

                          {product.quantity === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                        <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black">
                          HẾT HÀNG
                        </span>
                              </div>
                          )}
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="line-clamp-2 text-lg font-bold leading-7 text-black">
                              {product.name}
                            </h4>

                            <div className="flex items-center gap-1 rounded-full border border-black/10 bg-[#f4f4f4] px-2.5 py-1 text-black">
                              <Star size={14} className="fill-black text-black" />
                              <span className="text-xs font-semibold">
                          {product.rating?.toFixed(1) || "5.0"}
                        </span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <p className="text-xl font-extrabold text-black">
                              {formatPrice(product.costPrice || product.price)}
                            </p>
                            <span className="text-xs uppercase tracking-[0.16em] text-[#7a7a7a]">
                        Xem chi tiết
                      </span>
                          </div>

                          {product.reviewCount > 0 && (
                              <p className="mt-2 text-xs text-[#6b7280]">
                                {product.reviewCount} đánh giá
                              </p>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
            )}

            <div className="mt-12 text-center">
              <button
                  onClick={() => {
                    const sortParam =
                        activeTab === "bestseller" ? "bestselling" : "newest";
                    navigate(`/product?sort=${sortParam}`);
                  }}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black bg-black px-8 text-sm font-semibold text-white transition hover:bg-[#2b2b2b]"
              >
                Xem tất cả sản phẩm
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        {!isLoggedIn && (
            <section className="pb-20">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="bg-black px-8 py-14 text-white sm:px-12">
                    <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                      Tham gia DTCLL Shop
                    </p>

                    <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
                      Bắt đầu mua sắm hôm nay
                    </h2>

                    <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
                      Tạo tài khoản để nhận ưu đãi riêng, cập nhật sản phẩm mới
                      và mua sắm thuận tiện hơn.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                      <button
                          onClick={() => navigate("/register")}
                          className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
                      >
                        Đăng ký ngay
                      </button>
                      <button
                          onClick={() => navigate("/login")}
                          className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        Đã có tài khoản
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center bg-[#efefec] p-8">
                    <div className="max-w-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                        Quyền lợi thành viên
                      </p>
                      <ul className="mt-5 space-y-4 text-sm leading-7 text-[#4f5660]">
                        <li>• Quản lý đơn hàng dễ dàng hơn</li>
                        <li>• Thanh toán nhanh và thuận tiện hơn</li>
                        <li>• Cập nhật sản phẩm mới sớm hơn</li>
                        <li>• Trải nghiệm mua sắm tốt hơn</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        )}

        <ChatBot />
        <Contact />
      </div>
  );
};

export default Home;



