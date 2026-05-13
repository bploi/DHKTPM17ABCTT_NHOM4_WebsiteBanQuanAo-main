import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount || 0);
};

const calculateSummary = (items) => {
  if (!Array.isArray(items)) {
    return { subtotal: 0, discount: 0, shippingFee: 30000, total: 0 };
  }

  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((s, i) => s + (i.subtotal || 0), 0);
  const discount = 0;
  const shippingFee = 30000;
  const total = subtotal - discount + shippingFee;

  return { subtotal, discount, shippingFee, total };
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId || localStorage.getItem("userId");
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;
  const selectedCartItems = location.state?.select || [];

  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [payment, setPayment] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [isAddAddress, setIsAddAddress] = useState(false);

  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
  });

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

  const [formAddress, setFormAddress] = useState({
    province: "",
    delivery_address: "",
    delivery_note: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!userId) return;

        const token = localStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:8080/addresses/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("ADDRESS API:", data);

        if (Array.isArray(data)) {
          setAddresses(data);
        } else if (Array.isArray(data.data)) {
          setAddresses(data.data);
        } else if (Array.isArray(data.result)) {
          setAddresses(data.result);
        } else {
          setAddresses([]);
        }
      } catch (error) {
        console.log("Lỗi fetch Addresses:", error);
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, [userId]);

  useEffect(() => {
    const handleFetchCustomer = async () => {
      try {
        if (!userId) return;

        const token = localStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:8080/customers/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const customer = await res.json();
        setForm((prev) => ({
          ...prev,
          name: customer.fullName || "",
          phone: customer.phoneNumber || "",
          email: customer.email || "",
        }));
      } catch (error) {
        console.log("Lỗi fetch customer:", error);
      }
    };

    handleFetchCustomer();
  }, [userId]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/v2/?depth=2")
        .then((res) => res.json())
        .then((data) => setProvinces(Array.isArray(data) ? data : []))
        .catch(() => setProvinces([]));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCartItems(parsed);
      setSummary(calculateSummary(parsed));
    }
  }, []);

  const handleProvinceChange = (provinceName) => {
    setSelectedProvince(provinceName);
    const province = provinces.find((p) => p.name === provinceName);
    setWards(province?.wards || []);
  };

  const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });

  const handleChangeAddress = (e) =>
      setFormAddress({ ...formAddress, [e.target.name]: e.target.value });

  const handleSelectAddress = (index) => {
    if (index === "") return;
    if (!Array.isArray(addresses)) return;

    const addr = addresses[index];
    if (!addr) return;

    setForm((prev) => ({
      ...prev,
      address: addr.delivery_address || "",
      province: addr.province || "",
      district: addr.city || "",
      ward: addr.ward || "",
      note: addr.delivery_note || "",
    }));
  };

  const handleAddNewAddress = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const finalDeliveryAddress = selectedWard
          ? `${formAddress.delivery_address}, ${selectedWard}`
          : `${formAddress.delivery_address}`;

      const requestBody = {
        accountId: userId,
        province: selectedProvince,
        delivery_address: finalDeliveryAddress,
        delivery_note: formAddress.delivery_note,
      };

      const res = await fetch(`http://localhost:8080/addresses/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        toast.success("Add address successfully!!");
        setIsAddAddress(false);
        setFormAddress({
          province: "",
          delivery_address: "",
          delivery_note: "",
        });
      }

      const resAddress = await fetch(`http://localhost:8080/addresses/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resAddress.json();

      if (Array.isArray(data)) {
        setAddresses(data);
      } else if (Array.isArray(data.data)) {
        setAddresses(data.data);
      } else if (Array.isArray(data.result)) {
        setAddresses(data.result);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Fail to add new address!!", error);
      toast.error("Fail to add new address!!");
    }
  };

  const handleConfirm = async () => {
    try {
      if (payment === "") {
        toast.warning("Vui lòng chọn phương thức thanh toán!!!");
        return;
      }

      const token = localStorage.getItem("accessToken");

      const fullAddress = `${form.address}${form.ward ? ", " + form.ward : ""}, ${form.province}`;

      const requestBody = product
          ? {
            receiverName: form.name,
            receiverPhone: form.phone,
            receiverEmail: form.email,
            receiverAddress: fullAddress,
            totalAmount: product.costPrice * quantity + 30000,
          }
          : {
            receiverName: form.name,
            receiverPhone: form.phone,
            receiverEmail: form.email,
            receiverAddress: fullAddress,
            totalAmount: summary.total,
          };

      const res = await fetch("http://localhost:8080/customer-trading/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Failed to create customer trading");

      const data = await res.json();

      const orderBody = {
        customerTradingId: data.id,
        note: form.note || "",
        account_id: userId,
        paymentMethod: payment === "bank" ? "BANK_TRANSFER" : "CASH",
      };

      const orderRes = await fetch("http://localhost:8080/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderBody),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");

      const orderData = await orderRes.json();

      if (product) {
        await fetch(`http://localhost:8080/order-details/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productName: product.name,
            quantity,
            unitPrice: product.costPrice,
            totalPrice: product.costPrice * quantity,
            orderId: orderData.id,
            productId: product.id,
          }),
        });
      } else {
        for (const item of selectedCartItems) {
          await fetch(`http://localhost:8080/order-details/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productName: item.productName,
              quantity: item.quantity,
              unitPrice: item.priceAtTime,
              totalPrice: item.subtotal,
              orderId: orderData.id,
              productId: item.id,
            }),
          });
        }

        localStorage.removeItem("cartItems");
      }

      toast.success("Đặt hàng thành công!!");

      if (payment === "bank") {
        const invoiceRequest = {
          orderId: orderData.id,
          paymentMethod: "BANK_TRANSFER",
          paymentStatus: "UNPAID",
        };

        const invoiceRes = await fetch("http://localhost:8080/invoices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(invoiceRequest),
        });

        if (!invoiceRes.ok) throw new Error("Failed to create invoice");

        const newInvoice = await invoiceRes.json();

        navigate(
            `/payment?orderId=${orderData.id}&amount=${
                product ? product.costPrice * quantity + 30000 : summary.total
            }&invoiceId=${newInvoice.id}&invoiceCode=${newInvoice.invoiceCode}`
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h1 className="text-3xl font-bold mb-5">Shipping Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border p-3 rounded"
                  onChange={handleChange}
                  value={form.email}
              />

              <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="border p-3 rounded"
                  onChange={handleChange}
                  value={form.name}
              />

              <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="border p-3 rounded"
                  onChange={handleChange}
                  value={form.phone}
              />

              <div className="p-3 relative">
                {!isAddAddress && (
                    <button
                        onClick={() => setIsAddAddress(true)}
                        className="absolute right-0 bottom-0 px-4 bg-black text-white py-2 rounded font-bold text-sm hover:bg-gray-800 transition"
                    >
                      Add new address
                    </button>
                )}
              </div>

              {!isAddAddress ? (
                  <select
                      name="address"
                      className="border p-3 rounded md:col-span-2"
                      onChange={(e) => handleSelectAddress(e.target.value)}
                  >
                    <option value="">-- Select saved address --</option>

                    {Array.isArray(addresses) &&
                        addresses.map((addr, index) => (
                            <option key={index} value={index}>
                              {addr.delivery_address} ({addr.province})
                            </option>
                        ))}
                  </select>
              ) : (
                  <div className="md:col-span-2 border p-5 rounded bg-gray-100 space-y-4">
                    <h3 className="text-xl font-bold">Add New Address</h3>

                    <input
                        type="text"
                        name="delivery_address"
                        placeholder="Delivery Address"
                        className="border p-3 rounded w-full"
                        onChange={handleChangeAddress}
                        value={formAddress.delivery_address}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                          value={selectedProvince}
                          onChange={(e) => handleProvinceChange(e.target.value)}
                          className="border p-2 rounded"
                      >
                        <option value="">-- Select Province --</option>

                        {provinces.map((p) => (
                            <option key={p.code} value={p.name}>
                              {p.name}
                            </option>
                        ))}
                      </select>

                      <select
                          className="border p-2 rounded"
                          disabled={!selectedProvince}
                          onChange={(e) => setSelectedWard(e.target.value)}
                      >
                        <option value="">-- Select Wards --</option>

                        {wards.map((w) => (
                            <option key={w.code} value={w.name}>
                              {w.name}
                            </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                        name="delivery_note"
                        placeholder="Delivery note (optional)"
                        className="border p-3 rounded w-full"
                        rows="3"
                        onChange={handleChangeAddress}
                        value={formAddress.delivery_note}
                    />

                    <div className="flex justify-between pt-2">
                      <button
                          onClick={() => setIsAddAddress(false)}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>

                      <button
                          onClick={handleAddNewAddress}
                          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
              )}

              <textarea
                  name="note"
                  placeholder="Notes (optional)"
                  className="border p-3 rounded md:col-span-2"
                  onChange={handleChange}
                  value={form.note}
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Delivery Method</h2>
            <div className="border p-4 rounded flex justify-between items-center">
              <span>Standard (3–5 business days)</span>
              <span className="font-semibold">{formatVND(30000)}</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                    type="radio"
                    name="payment"
                    value="cash"
                    onChange={(e) => setPayment(e.target.value)}
                />
                <span>Cash on Delivery (COD)</span>
              </label>

              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                    type="radio"
                    name="payment"
                    value="bank"
                    onChange={(e) => setPayment(e.target.value)}
                />
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-red-500 p-6 rounded-lg bg-gray-50 shadow-md h-fit">
          <h2 className="text-3xl font-bold mb-6 text-red-500">Order Summary</h2>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">
              {formatVND(product ? product.costPrice * quantity : summary.subtotal)}
            </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping fee:</span>
              <span>{formatVND(product ? 30000 : summary.shippingFee)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount:</span>
              <span>{formatVND(summary.discount)}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold border-t pt-5 mt-5">
            <span>Total:</span>
            <span className="text-red-500">
            {formatVND(product ? product.costPrice * quantity + 30000 : summary.total)}
          </span>
          </div>

          <button
              onClick={handleConfirm}
              className="w-full mt-8 bg-black text-white py-3 rounded font-bold text-lg hover:bg-gray-800 transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
  );
};

export default Checkout;