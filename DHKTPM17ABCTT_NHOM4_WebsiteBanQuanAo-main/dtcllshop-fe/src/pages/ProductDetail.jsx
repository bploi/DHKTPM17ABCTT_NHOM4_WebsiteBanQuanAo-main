import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  CreditCard,
  X,
  ZoomIn,
  Minus,
  Plus,
  GitCompare,
  ShoppingBag,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { toast } from "sonner";
import ChatBot from "../components/ChatBot";
import Contact from "../components/Contact";

// --- GLOBAL UTILS FOR COMPARE LIST ---
const getCompareList = () => {
  const list = localStorage.getItem("compareList");
  return list ? JSON.parse(list) : [];
};

const setCompareList = (list) => {
  localStorage.setItem("compareList", JSON.stringify(list));
};

// --- COMPARISON BAR COMPONENT ---
const CompareBar = ({ compareList, setCompareListState, formatPrice }) => {
  if (compareList.length === 0) return null;

  const handleRemoveProduct = (productId, productName) => {
    const newList = compareList.filter((p) => p.id !== productId);
    setCompareList(newList);
    setCompareListState(newList);
    toast.info(`${productName} removed from Compare List.`);
  };

  const compareUrl = `/compare?ids=${compareList.map((p) => p.id).join(",")}`;

  return (
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white/95 px-4 py-4 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {compareList.map((p) => (
                <div
                    key={p.id}
                    className="relative w-32 flex-shrink-0 rounded-2xl border border-black/10 bg-[#f7f7f7] p-2"
                >
                  <Link
                      to={`/product/${p.id}`}
                      className="block text-center transition hover:opacity-80"
                  >
                    <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="mx-auto mb-2 h-20 w-full rounded-xl object-contain"
                    />
                    <p className="truncate text-xs font-semibold text-black">
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-black">
                      {formatPrice(p.discount_amount || p.price)}
                    </p>
                  </Link>

                  <button
                      onClick={() => handleRemoveProduct(p.id, p.name)}
                      className="absolute -right-1 -top-1 rounded-full bg-black p-1 text-white transition hover:bg-[#2c2c2c]"
                  >
                    <X size={12} />
                  </button>
                </div>
            ))}

            {Array(4 - compareList.length)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={`placeholder-${index}`}
                        className="flex h-36 w-32 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-[#f5f5f5] p-2 text-sm text-gray-500"
                    >
                      <Plus size={18} className="mb-1" />
                      Add product
                    </div>
                ))}
          </div>

          <div className="text-center lg:ml-4 lg:flex-shrink-0">
            <p className="text-sm font-semibold text-black">
              {compareList.length} / 4 Products selected
            </p>
            <p className="mt-1 text-xs italic text-gray-500">
              Select 2-4 products to compare
            </p>
            <Link
                to={compareUrl}
                onClick={() => {
                  if (compareList.length < 2) {
                    toast.warning("Please select at least 2 products to compare.");
                    return false;
                  }
                }}
                className={`mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition ${
                    compareList.length >= 2
                        ? "bg-black hover:bg-[#2c2c2c]"
                        : "cursor-not-allowed bg-gray-400"
                }`}
                style={{ pointerEvents: compareList.length >= 2 ? "auto" : "none" }}
            >
              <GitCompare size={18} /> Compare ({compareList.length})
            </Link>
          </div>
        </div>
      </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [currentImage, setCurrentImage] = useState("front");
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const [compareList, setCompareListState] = useState(getCompareList());

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`http://localhost:8080/accounts/myinfor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data.result);
    } catch (error) {
      console.error("Lỗi fetch user", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:8080/carts/account/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCart(data.result);
    } catch (error) {
      console.error("Lỗi fetch cart: ", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.result || null);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        if (response.ok) {
          const data = await response.json();
          let products = data.result || [];

          products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          products = products.filter((p) => p.id !== parseInt(id)).slice(0, 4);
          setOtherProducts(products);
        }
      } catch (error) {
        console.error("Error fetching other products:", error);
      }
    };
    fetchOtherProducts();
  }, [id]);

  const formatPrice = (price) => {
    const numericPrice =
        typeof price === "number" && isFinite(price) ? price : 0;

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericPrice);
  };

  const handleAddToCart = async () => {
    if (isSoldOut) {
      return toast.error("This product is currently sold out.");
    }

    const hasSizes = uniqueSizes.length > 0;

    if (hasSizes && !selectedSize) {
      return toast.warning("Please select a size");
    }

    if (!user?.id) {
      toast.warning("Vui lòng đăng nhập trước khi thêm vào giỏ hàng");
      return toast.warning("Please Log in before add to cart");
    }
    if (quantity < 1) return toast.warning("Quantity must be at least 1");

    setIsAddedToCart(true);
    toast.success("Added items, check your Cart!");
    setTimeout(() => setIsAddedToCart(false), 2000);

    try {
      const token = localStorage.getItem("accessToken");

      let sizeDetailId = null;
      if (hasSizes && selectedSize) {
        const resSize = await fetch(`http://localhost:8080/sizes/${selectedSize}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const size = await resSize.json();
        const sizeIdToFind = size.id;
        const productIdToFind = parseInt(id);
        const resSizeDatail = await fetch(
            `http://localhost:8080/size-details/find?productId=${productIdToFind}&sizeId=${sizeIdToFind}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );
        const sizeDetailResponse = await resSizeDatail.json();
        sizeDetailId = sizeDetailResponse.id;
      }

      const dataSend = {
        productId: parseInt(id),
        cartId: cart.id,
        quantity: quantity,
        ...(sizeDetailId && { sizeDetailId: sizeDetailId }),
      };

      await fetch(`http://localhost:8080/cart-details/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataSend),
      });

      const cartRequest = {
        quantity: parseInt(quantity),
        totalAmount: product.costPrice,
      };

      const resCart = await fetch(`http://localhost:8080/carts/update/${cart.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartRequest),
      });
      if (resCart.ok) {
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.log("Lỗi thêm vào cart: ", error);
      toast.error("Failed to add to cart.");
    }
  };

  const handleBuyNow = () => {
    if (isSoldOut) {
      return toast.error("This product is currently sold out.");
    }

    const hasSizes = uniqueSizes.length > 0;
    if (hasSizes && !selectedSize) {
      return toast.warning("Please select a size");
    }
    if (quantity < 1) return toast.warning("Quantity must be at least 1");
    navigate("/checkout", {
      state: { userId: user.id, product: product, quantity: quantity },
    });
  };

  const handleZoom = (imageType) => {
    setZoomImage(
        imageType === "front" ? product.imageUrlFront : product.imageUrlBack
    );
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setZoomLevel((prev) => Math.max(1, Math.min(prev + delta, 5)));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (moveE) => {
      setPosition({
        x: moveE.clientX - startX,
        y: moveE.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleCompare = () => {
    if (!product) return;

    const currentProductInList = compareList.find((p) => p.id === product.id);
    const newProductData = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount_amount: product.costPrice,
      imageUrl: product.imageUrlFront,
    };

    if (currentProductInList) {
      const newList = compareList.filter((p) => p.id !== product.id);
      setCompareList(newList);
      setCompareListState(newList);
      toast.info(`${product.name} removed from Compare List.`);
    } else {
      if (compareList.length < 4) {
        const newList = [...compareList, newProductData];
        setCompareList(newList);
        setCompareListState(newList);
        toast.success(`${product.name} added to Compare List (${newList.length}/4).`);
      } else {
        toast.error("Maximum 4 products allowed for comparison.");
      }
    }
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center bg-[#f3f3f1]">
          <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-black"></div>
        </div>
    );
  }

  if (error || !product) {
    return (
        <div className="py-20 text-center">
          <h3 className="mb-3 text-2xl font-bold text-gray-700">
            {error || "Product not found"}
          </h3>
          <Link to="/product" className="font-medium text-black hover:underline">
            Back to Products
          </Link>
        </div>
    );
  }

  const uniqueSizes = [];
  const sizeMap = new Map();

  product.sizeDetails?.forEach((size) => {
    if (sizeMap.has(size.sizeName)) {
      const existing = sizeMap.get(size.sizeName);
      existing.quantity += size.quantity;
    } else {
      sizeMap.set(size.sizeName, { ...size });
    }
  });

  sizeMap.forEach((value) => uniqueSizes.push(value));
  uniqueSizes.sort((a, b) => {
    const order = ["S", "M", "L", "XL"];
    return order.indexOf(a.sizeName) - order.indexOf(b.sizeName);
  });

  const totalStock = uniqueSizes.reduce((sum, size) => sum + size.quantity, 0);
  const isSoldOut = totalStock === 0;

  const isComparing = compareList.some((p) => p.id === product.id);

  return (
      <div className="min-h-screen bg-[#f3f3f1] text-black">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* top content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            {/* IMAGE SECTION */}
            <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-full border border-black/10 bg-[#f5f5f5] p-1.5">
                  <button
                      onClick={() => setCurrentImage("front")}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                          currentImage === "front"
                              ? "bg-black text-white"
                              : "text-black hover:bg-white"
                      }`}
                  >
                    Front
                  </button>
                  <button
                      onClick={() => setCurrentImage("back")}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                          currentImage === "back"
                              ? "bg-black text-white"
                              : "text-black hover:bg-white"
                      }`}
                  >
                    Back
                  </button>
                </div>

                <button
                    onClick={handleCompare}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                        isComparing
                            ? "bg-black text-white"
                            : "border border-black/10 bg-white text-black hover:bg-[#f5f5f5]"
                    }`}
                >
                  <GitCompare size={16} />
                  {isComparing ? "Comparing" : "Add to Compare"}
                </button>
              </div>

              <div className="relative group overflow-hidden rounded-[28px] bg-[#f6f6f6]">
                {isSoldOut && (
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                      <div className="rounded-full border-4 border-white bg-black px-8 py-3 text-lg font-bold tracking-[0.18em] text-white shadow-2xl">
                        SOLD OUT
                      </div>
                    </div>
                )}

                <img
                    src={
                      currentImage === "front"
                          ? product.imageUrlFront
                          : product.imageUrlBack
                    }
                    alt={product.name}
                    className="h-[540px] w-full cursor-pointer object-cover transition duration-300"
                    onClick={() => handleZoom(currentImage)}
                />

                <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.05)] sm:p-8">
              <p className="inline-flex rounded-full border border-black/10 bg-[#f5f5f5] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666]">
                DTCLL SHOP • PRODUCT DETAIL
              </p>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold text-black">
                {formatPrice(product.costPrice)}
              </span>
                {!isSoldOut && product.discountAmount > 0 && (
                    <span className="text-base text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-[#5f6368]">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  <span>
                  Sold:{" "}
                    <span className="font-bold text-black">
                    {(product.soldQuantity || 0).toLocaleString("en-US")}
                  </span>
                </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-black text-black" />
                  <span className="font-semibold text-black">
                  {product.rating || "N/A"}
                </span>
                </div>
              </div>

              {/* SIZE */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-bold">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueSizes.map((size) => (
                      <button
                          key={size.sizeName}
                          onClick={() => setSelectedSize(size.sizeName)}
                          disabled={size.quantity <= 0}
                          className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                              selectedSize === size.sizeName
                                  ? "bg-black text-white"
                                  : "border border-black/10 bg-[#f5f5f5] text-black hover:bg-[#ececec]"
                          } ${size.quantity <= 0 ? "cursor-not-allowed opacity-40" : ""}`}
                      >
                        {size.sizeName}
                      </button>
                  ))}
                  {uniqueSizes.length === 0 && (
                      <p className="text-sm text-gray-500">No sizes available</p>
                  )}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-bold">Quantity</h3>
                <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#f8f8f8] px-3 py-2">
                  <button
                      onClick={() => changeQuantity(-1)}
                      disabled={isSoldOut}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                          isSoldOut
                              ? "cursor-not-allowed opacity-40"
                              : "bg-white hover:bg-[#ececec]"
                      }`}
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-[36px] text-center text-base font-bold">
                  {quantity}
                </span>

                  <button
                      onClick={() => changeQuantity(1)}
                      disabled={isSoldOut}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                          isSoldOut
                              ? "cursor-not-allowed opacity-40"
                              : "bg-white hover:bg-[#ececec]"
                      }`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                    onClick={handleAddToCart}
                    disabled={isSoldOut}
                    className={`inline-flex h-14 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                        isSoldOut
                            ? "cursor-not-allowed bg-gray-400 text-white"
                            : "border border-black bg-white text-black hover:bg-black hover:text-white"
                    }`}
                >
                  <ShoppingCart size={18} />
                  {isSoldOut ? "Sold Out" : isAddedToCart ? "Added" : "Add to Cart"}
                </button>

                <button
                    onClick={handleBuyNow}
                    disabled={isSoldOut}
                    className={`inline-flex h-14 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                        isSoldOut
                            ? "cursor-not-allowed bg-gray-400 text-white"
                            : "bg-black text-white hover:bg-[#2c2c2c]"
                    }`}
                >
                  <CreditCard size={18} />
                  Buy Now
                </button>
              </div>

              {/* DESCRIPTION / DETAILS */}
              <div className="mt-10 space-y-8">
                <div className="rounded-[24px] bg-[#f7f7f7] p-5">
                  <h3 className="text-lg font-bold">Description</h3>
                  <p className="mt-3 leading-8 text-[#5f6368]">
                    {product.description}
                  </p>
                </div>

                <div className="rounded-[24px] bg-[#f7f7f7] p-5">
                  <h3 className="text-lg font-bold">Product Details</h3>
                  <ul className="mt-3 space-y-2 text-[#5f6368]">
                    <li>
                      <span className="font-semibold text-black">Form:</span>{" "}
                      {product.form}
                    </li>
                    <li>
                      <span className="font-semibold text-black">Material:</span>{" "}
                      {product.material}
                    </li>
                    <li>
                      <span className="font-semibold text-black">Unit:</span>{" "}
                      {product.unit}
                    </li>
                  </ul>
                </div>

                <div className="rounded-[24px] bg-[#f7f7f7] p-5">
                  <h3 className="mb-4 text-lg font-bold">Size Chart</h3>
                  <img
                      src={product.category?.imageUrl}
                      alt="Size Chart"
                      className="w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {otherProducts.length > 0 && (
              <div className="mt-14">
                <div className="mb-6 flex items-end justify-between gap-4 flex-col sm:flex-row">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                      Related picks
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em]">
                      You May Also Like
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {otherProducts.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </div>
          )}

          <ChatBot />
          <Contact />
        </div>

        {/* ZOOM MODAL */}
        {zoomImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <img
                    ref={imageRef}
                    src={zoomImage}
                    alt="Zoomed product"
                    className="cursor-grab rounded-2xl transition-transform duration-200 ease-in-out"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                      maxHeight: "90vh",
                      objectFit: "contain",
                    }}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                />

                <button
                    onClick={() => setZoomImage(null)}
                    className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-[#ececec]"
                >
                  <X size={22} />
                </button>
              </div>
            </div>
        )}

        <CompareBar
            compareList={compareList}
            setCompareListState={setCompareListState}
            formatPrice={formatPrice}
        />
      </div>
  );
};

export default ProductDetail;