import React from "react";
import {
  Package,
  Shield,
  Truck,
  RefreshCw,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRightLeft,
  CheckCircle2,
} from "lucide-react";
import ChatBot from "../components/ChatBot";
import Contact from "../components/Contact";

const Policy = () => {
  const conditions = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Condition of Item",
      description:
          "Items must be unused, unwashed, and free of any odors (body odor, perfume, chemicals, etc.).",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Tags and Labels",
      description:
          "Tags and labels must remain intact, not be torn, removed, or altered.",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Original Packaging",
      description:
          "The item must be returned with all original packaging and accessories in the same condition it was received.",
    },
  ];

  const freeReturnCases = [
    {
      title: "Manufacturer Defects",
      description:
          "Items with verifiable manufacturer defects (e.g., torn seams, dye/print issues, poor workmanship).",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      title: "Incorrect Item Sent",
      description:
          "Items sent incorrectly (wrong size, color, or product) compared to the original order.",
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      title: "Out of Stock for Exchange",
      description:
          "If a size exchange is requested, but the item is confirmed to be out of stock.",
      icon: <Package className="h-5 w-5" />,
    },
  ];

  const requestFields = [
    "Customer Full Name",
    "Contact Phone Number",
    "Order Number",
    "Product Name",
    "Reason for Request",
    "Detailed Issue / Request",
    "Attachments",
  ];

  return (
      <div className="min-h-screen bg-[#f3f3f1] text-black">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* HERO */}
          <section className="rounded-[40px] border border-black/10 bg-white p-8 shadow-[0_18px_44px_rgba(0,0,0,0.05)] sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full border border-black/10 bg-[#f6f6f6] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666]">
                  DTCLL SHOP • SUPPORT CENTER
                </p>

                <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Return & Exchange,
                  <span className="block text-[#666]">Made Clear</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f6368] sm:text-lg">
                  This page explains when returns are accepted, which cases are
                  supported, and how customers can submit a request in the
                  clearest possible way.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-full border border-black/10 bg-black px-5 py-3 text-sm font-semibold text-white">
                    15-Day Eligibility
                  </div>
                  <div className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black">
                    One-Way Free Return Cases
                  </div>
                  <div className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black">
                    Contact Support
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="group rounded-[28px] border border-black/10 bg-white p-6 text-black transition hover:-translate-y-1 hover:bg-black hover:text-white">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a7a7a] transition group-hover:text-white/50">
                    Eligibility
                  </p>
                  <p className="mt-3 text-5xl font-extrabold">15</p>
                  <p className="mt-2 text-sm leading-7 text-[#5f6368] transition group-hover:text-white/75">
                    Days from the date the customer receives the product.
                  </p>
                </div>

                <div className="group rounded-[28px] border border-black/10 bg-white p-6 text-black transition hover:-translate-y-1 hover:bg-black hover:text-white">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a7a7a] transition group-hover:text-white/50">
                    Supported Shipping
                  </p>
                  <p className="mt-3 text-2xl font-extrabold">One-Way Free</p>
                  <p className="mt-2 text-sm leading-7 text-[#5f6368] transition group-hover:text-white/75">
                    Applied in verified eligible return or exchange cases.
                  </p>
                </div>

                <div className="group rounded-[28px] border border-black/10 bg-white p-6 text-black transition hover:-translate-y-1 hover:bg-black hover:text-white sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a7a7a] transition group-hover:text-white/50">
                    Important
                  </p>
                  <p className="mt-3 text-lg font-bold">
                    Keep product evidence and unboxing video if possible.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#5f6368] transition group-hover:text-white/75">
                    This helps customer support verify issues faster and process
                    requests more accurately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3-STEP FLOW */}
          <section className="mt-20">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                Quick process
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                How This Works
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="group rounded-[30px] border border-black/10 bg-white p-7 text-black shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white transition group-hover:bg-white group-hover:text-black">
                  1
                </div>
                <h3 className="text-2xl font-bold">Check Conditions</h3>
                <p className="mt-3 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                  Review the mandatory return conditions and confirm the product
                  still qualifies for return or exchange.
                </p>
              </div>

              <div className="group rounded-[30px] border border-black/10 bg-white p-7 text-black shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white transition group-hover:bg-white group-hover:text-black">
                  2
                </div>
                <h3 className="text-2xl font-bold">Prepare Evidence</h3>
                <p className="mt-3 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                  Keep packaging, tags, issue photos, and unboxing proof if
                  available before contacting support.
                </p>
              </div>

              <div className="group rounded-[30px] border border-black/10 bg-white p-7 text-black shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white transition group-hover:bg-white group-hover:text-black">
                  3
                </div>
                <h3 className="text-2xl font-bold">Send Request</h3>
                <p className="mt-3 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                  Use the request template below and contact DTCLL SHOP through
                  the listed support channels.
                </p>
              </div>
            </div>
          </section>

          {/* CONDITIONS */}
          <section className="mt-20 rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-10">
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                Return requirements
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Mandatory Conditions
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#5f6368]">
                For a return or exchange to be accepted, the item must meet all of
                the conditions listed below.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {conditions.map((condition, index) => (
                  <div
                      key={index}
                      className="group rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_10px_24px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:bg-black hover:text-white"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                      {condition.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{condition.title}</h3>
                    <p className="mt-3 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                      {condition.description}
                    </p>
                  </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-black/10 bg-black p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-black">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Important Note</h3>
                  <p className="mt-2 leading-8 text-white/75">
                    Recording an unboxing video is strongly recommended to support
                    future claims and speed up verification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ELIGIBLE CASES */}
          <section className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[36px] border border-black/10 bg-black p-8 text-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Supported cases
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Eligible Return / Exchange Cases
              </h2>
              <p className="mt-4 text-base leading-8 text-white/75">
                These are the cases in which DTCLL SHOP supports the return or
                exchange process and covers one-way return shipping.
              </p>

              <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                ✓ Free Return Shipping One-Way
              </div>
            </div>

            <div className="space-y-5">
              {freeReturnCases.map((item, index) => (
                  <div
                      key={index}
                      className="group rounded-[28px] border border-black/10 bg-white p-6 text-black shadow-[0_10px_24px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:bg-black hover:text-white"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="mt-2 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
              ))}

              <p className="px-2 text-sm italic text-[#5f6368]">
                DTCLL SHOP covers shipping costs incurred for the return or
                exchange in the supported cases above.
              </p>
            </div>
          </section>

          {/* CUSTOMER PAID */}
          <section className="mt-20">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                Customer-paid shipping
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Cases Subject to Customer-Paid Fees
              </h2>
            </div>

            <div className="mx-auto max-w-4xl rounded-[30px] border border-black/10 bg-white p-7 shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Size Exchange</h3>
                  <p className="mt-3 leading-8 text-[#5f6368]">
                    Customer-paid shipping applies when exchanging a size due to
                    fit issues, subject to stock availability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TEMPLATE */}
          <section className="mt-20 rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-10">
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                Support template
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Return / Exchange Request Format
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#5f6368]">
                To ensure the fastest support, please copy the template below and
                include all relevant information when contacting customer service.
              </p>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-black/10">
              <div className="border-b border-black/10 bg-[#f8f8f8] px-6 py-5">
                <h3 className="flex items-center gap-3 text-2xl font-bold">
                  <ArrowRightLeft className="h-6 w-6" />
                  DTCLL SHOP REQUEST TEMPLATE
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 bg-white p-6 sm:grid-cols-2">
                {requestFields.map((field, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl border border-black/10 bg-[#f8f8f8] p-4 ${
                            field === "Order Number" ||
                            field === "Product Name" ||
                            field === "Reason for Request" ||
                            field === "Detailed Issue / Request" ||
                            field === "Attachments"
                                ? "sm:col-span-2"
                                : ""
                        }`}
                    >
                      <p className="text-sm font-bold">{field}</p>
                      <p className="mt-2 text-sm text-[#5f6368]">
                        [Fill in this information]
                      </p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="mt-20">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                Contact channels
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Contact Information
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#5f6368]">
                For all questions, return/exchange inquiries, or complaints,
                please contact our support team through the channels below.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="group rounded-[28px] border border-black/10 bg-white p-7 text-center shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Support Email</h3>
                <p className="mt-3 text-[#5f6368] transition group-hover:text-white/75">
                  support@dtcllshop.com
                </p>
              </div>

              <div className="group rounded-[28px] border border-black/10 bg-white p-7 text-center shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Hotline / Zalo</h3>
                <p className="mt-3 text-[#5f6368] transition group-hover:text-white/75">
                  +84 901 234 567
                </p>
              </div>

              <div className="group rounded-[28px] border border-black/10 bg-white p-7 text-center shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Return Warehouse</h3>
                <p className="mt-3 text-[#5f6368] transition group-hover:text-white/75">
                  [Detailed address for returns]
                </p>
              </div>
            </div>
          </section>

          {/* COMMITMENT */}
          <section className="mt-20 rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-10">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                Service promise
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Commitment & Right to Refuse
              </h2>
            </div>

            <div className="mx-auto max-w-4xl space-y-5">
              <div className="group rounded-[28px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Our Commitment</h3>
                    <p className="mt-2 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                      We are committed to providing fast and reliable support upon
                      receiving your inquiry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-[28px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:bg-black hover:text-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Right to Refuse</h3>
                    <p className="mt-2 leading-8 text-[#5f6368] transition group-hover:text-white/75">
                      DTCLL SHOP reserves the right to reject returns that do not
                      meet the mandatory conditions listed above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ChatBot />
        <Contact />
      </div>
  );
};

export default Policy;