import React from "react";
import { Quote, MapPin } from "lucide-react";
import ChatBot from "../components/ChatBot";
import Contact from "../components/Contact";

const About = () => {
    const mainImage =
        "aboutus.png";
    const image2 =
        "bentrong.png";
    const image3 =
        "nguoithat.png";
    const image4 =
        "bentrongcuahang.png";
    const headerImage =
        "cuahang.png";

    const quotes = [
        {
            id: 1,
            shortText: "We focus on high-quality products aligned with modern trends.",
            fullText:
                "We focus on high quality products that are in line with modern trends for potential and intelligent customers.",
        },
        {
            id: 2,
            shortText: "We deliver trendy, refined, and modern everyday fashion.",
            fullText: "We bring the most trendy, luxurious and fashionable.",
        },
        {
            id: 3,
            shortText: "Fashion should naturally become part of daily life.",
            fullText:
                "Fashion is closely linked to life and life must have fashion as a highlight.",
        },
        {
            id: 4,
            shortText: "Our mission is to help people express style with confidence.",
            fullText:
                "Our mission is to empower you to 'live your truth' and define your own unique style through our creative and bold designs.",
        },
    ];

    const timeline = [
        {
            year: "2020 - 2024",
            title: "The Foundation",
            desc: "Founded and developed by 5 passionate members who shared a vision of bringing quality fashion to Vietnamese youth.",
        },
        {
            year: "Early Vision",
            title: "Basic & Classic",
            desc: "Our initial direction focused on timeless basic and classic pieces, creating wardrobe essentials for everyday style.",
        },
        {
            year: "The Shift",
            title: "Evolution & Adaptation",
            desc: "Everything changed when fashion trends evolved rapidly. We adapted, transformed, and found our unique voice in the dynamic streetwear scene.",
        },
        {
            year: "2025",
            title: "Official Launch",
            desc: "DTCLL SHOP officially launched with a cleaner visual identity, bringing modern style and a new shopping experience.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f3f3f1] text-black">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* HERO */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-stretch">
                    <div className="flex flex-col justify-center rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-10">
                        <p className="inline-flex w-fit rounded-full border border-black/10 bg-[#f5f5f5] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666]">
                            DTCLL SHOP • BRAND MANIFESTO
                        </p>

                        <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                            Built For
                            <span className="block text-[#6a6a6a]">Modern Expression</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f6368] sm:text-lg">
                            DTCLL SHOP is a modern fashion concept shaped around simplicity,
                            individuality, and a cleaner sense of style. We believe daily
                            fashion should feel effortless, confident, and visually refined.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-[24px] border border-black/10 bg-[#f7f7f7] p-4">
                                <p className="text-2xl font-bold">2025</p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                                    Launch
                                </p>
                            </div>
                            <div className="rounded-[24px] border border-black/10 bg-[#f7f7f7] p-4">
                                <p className="text-2xl font-bold">Local</p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                                    Identity
                                </p>
                            </div>
                            <div className="rounded-[24px] border border-black/10 bg-[#f7f7f7] p-4 col-span-2 sm:col-span-1">
                                <p className="text-2xl font-bold">Clean</p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7a7a7a]">
                                    Direction
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[36px] border border-black/10 bg-black shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                        <img
                            src={headerImage}
                            alt="DTCLL Brand Hero"
                            className="h-full min-h-[360px] w-full object-cover opacity-90"
                        />
                    </div>
                </section>

                {/* INTRO + QUOTES */}
                <section className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    {/* Left visual */}
                    <div className="self-start overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_14px_34px_rgba(0,0,0,0.05)]">                        <div className="relative">
                            <img
                                src={mainImage}
                                alt="Fashion inspiration"
                                className="h-[560px] w-full object-cover"
                            />

                            <div className="absolute left-5 top-5 rounded-full bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                                Est 2025
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-black/10 bg-white/92 p-5 backdrop-blur-md">
                                <p className="text-base font-semibold text-black sm:text-lg">
                                    <MapPin className="mr-2 inline h-5 w-5 text-black" />
                                    Based in Viet Nam
                                </p>
                                <p className="mt-2 text-sm leading-7 text-[#5f6368]">
                                    We are inspired by everyday life, clean aesthetics, and modern
                                    youth culture — then transform those ideas into wearable
                                    products.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right content */}
                    <div className="space-y-5">
                        <div className="rounded-[32px] border border-black/10 bg-white p-7 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                                Brand Overview
                            </p>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                                A Cleaner Brand Story
                            </h2>
                            <p className="mt-4 text-base leading-8 text-[#5f6368]">
                                Instead of following loud fashion formulas, DTCLL SHOP focuses
                                on a minimal visual language and a more balanced shopping
                                experience. Our direction is modern, local, and shaped by
                                simplicity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {quotes.map((quote) => (
                                <div
                                    key={quote.id}
                                    className="group rounded-[26px] border border-black/10 bg-white p-6 shadow-[0_10px_24px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:bg-black hover:text-white"
                                >
                                    <p className="text-lg font-semibold leading-8 text-black transition group-hover:text-white">
                                        <Quote className="mr-2 inline h-5 w-5" />
                                        {quote.shortText}
                                    </p>

                                    <div className="mt-3 border-t border-black/10 pt-3 transition group-hover:border-white/15">
                                        <p className="text-sm leading-7 text-[#666] transition group-hover:text-white/75">
                                            "{quote.fullText}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TIMELINE -BỐ CỤC */}
                <section className="mt-20">
                    <div className="mb-10 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                            Timeline
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                            Our Story
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className="group rounded-[30px] border border-black/10 bg-white p-6 text-black shadow-[0_10px_26px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:bg-black hover:text-white"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a] transition group-hover:text-white/55">
                                    {item.title}
                                </p>

                                <h3 className="mt-4 text-2xl font-extrabold">
                                    {item.year}
                                </h3>

                                <p className="mt-4 text-sm leading-8 text-[#5f6368] transition group-hover:text-white/75">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* STORE VIEW */}
                <section className="mt-20">
                    <div className="mb-10 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                            Brand visual
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                            Store View
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            { src: image2, label: "Luxury" },
                            { src: image3, label: "Trendy" },
                            { src: image4, label: "Fashionable" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-[28px] border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                            >
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/45" />
                                <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SLOGAN */}
                <section className="mt-20">
                    <div className="rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-12">
                        <div className="mx-auto max-w-4xl text-center">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a7a7a]">
                                Brand statement
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                                Less Noise. More Style.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-[#5f6368] sm:text-lg">
                                DTCLL SHOP follows a cleaner visual direction, focusing on
                                simplicity, modern form, and a more refined everyday fashion
                                experience.
                            </p>

                            <div className="mt-10 rounded-[32px] bg-black px-6 py-12 text-white sm:px-12">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                                    Core line
                                </p>

                                <p className="mt-6 text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-5xl">
                                    Less noise.
                                </p>
                                <p className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white/70 sm:text-5xl">
                                    More style.
                                </p>
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

export default About;