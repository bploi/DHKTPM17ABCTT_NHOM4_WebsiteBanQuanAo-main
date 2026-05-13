import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
      <footer className="border-t border-black/10 bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
            {/* Brand */}
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white px-5 py-3 shadow-[0_12px_24px_rgba(255,255,255,0.06)]">
                <div className="mr-3 h-2.5 w-2.5 rounded-full bg-black" />
                <span className="text-base font-extrabold uppercase tracking-[0.18em] text-black">
                DTCLL SHOP
              </span>
              </div>

              <p className="max-w-xs text-sm leading-7 text-white/70">
                A modern fashion store with a clean identity, minimalist styling,
                and an easy shopping experience for everyday wear.
              </p>

              <div className="inline-flex rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Minimal fashion concept
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-5 text-lg font-bold tracking-tight text-white">
                Navigation
              </h3>

              <div className="flex flex-col gap-3">
                <Link
                    to="/"
                    className="text-sm text-white/70 transition hover:translate-x-1 hover:text-white"
                >
                  Home
                </Link>
                <Link
                    to="/product"
                    className="text-sm text-white/70 transition hover:translate-x-1 hover:text-white"
                >
                  Catalog
                </Link>
                <Link
                    to="/about"
                    className="text-sm text-white/70 transition hover:translate-x-1 hover:text-white"
                >
                  Brand
                </Link>
                <Link
                    to="/policy"
                    className="text-sm text-white/70 transition hover:translate-x-1 hover:text-white"
                >
                  Service
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-5 text-lg font-bold tracking-tight text-white">
                Contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                      Hotline
                    </p>
                    <p className="mt-1 text-sm text-white/80">093 - 3462 - 6578</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      support@dtcllshop.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                      Address
                    </p>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-white/80">
                      Ho Chi Minh City, Viet Nam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-5 text-lg font-bold tracking-tight text-white">
                Connect
              </h3>

              <div className="flex items-center gap-3">
                <a
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:-translate-y-1 hover:bg-white hover:text-black"
                    aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>

                <a
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:-translate-y-1 hover:bg-white hover:text-black"
                    aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>

                <a
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:-translate-y-1 hover:bg-white hover:text-black"
                    aria-label="TikTok"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>

                <a
                    href="mailto:support@dtcllshop.com"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:-translate-y-1 hover:bg-white hover:text-black"
                    aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-7 text-white/68">
                Stay connected for product updates, new arrivals, and simple
                style inspiration from DTCLL SHOP.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-white/45">
              © 2025 DTCLL SHOP. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-white/35">
              <span>Minimal layout</span>
              <span className="hidden sm:inline">•</span>
              <span>Modern fashion</span>
            </div>
          </div>
        </div>
      </footer>
  );
}