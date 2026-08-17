'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { OrderDraftDrawer } from "../components/OrderDraftDrawer";
import { FloatingOrderBar } from "../components/FloatingOrderBar";
import { useState } from "react";
import { useCart } from '../hooks/useCart';

import { useLanguage } from "../context/LanguageContext";

function OwnerAvatarCard({
  src,
  alt,
  positionClass,
  zIndexClass,
}: {
  src: string;
  alt: string;
  positionClass: string;
  zIndexClass: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`absolute w-[65%] aspect-[3/4] overflow-hidden border-8 border-[#faf7f2] bg-[#f7f2e8] group ${positionClass} ${zIndexClass}`}>
      {!imgError && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          onError={() => setImgError(true)}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f2] via-[#f5e9d3] to-[#e8d5b7] flex flex-col items-center justify-center p-4 text-center select-none group-hover:scale-105 transition-transform duration-700 ease-out">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ba935a_1px,transparent_1px)] [background-size:14px_14px]" />

          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-[#ba935a]/50 shadow-xl flex items-center justify-center mb-3 group-hover:border-[#ba935a] transition-colors">
            <div className="w-[88%] h-[88%] rounded-full border border-[#ba935a]/20 flex items-center justify-center bg-[#faf7f2] shadow-inner">
              <User className="w-12 h-12 sm:w-14 sm:h-14 text-[#ba935a]/85 stroke-[1.6]" />
            </div>
          </div>


        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/30 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}

export default function Home() {
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const { t } = useLanguage();
  const {
    orderItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleUpdateNote,
  } = useCart();

  const totalItemCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        orderCount={totalItemCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 relative">
        <div className="fixed inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-cover bg-center bg-no-repeat" />
        {/* Sunlit Hero Banner */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* Our Story Section */}
        <section className="relative z-10 py-16 sm:py-24 bg-[url('/backgrounds/bg-2.webp')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-[#faf7f2]/80 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Text Side */}
              <div className="flex-1 space-y-8 text-center lg:text-start">
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#1a1816] tracking-tight">
                    {t('story.title')} <span className="text-[#ba935a] font-accent font-normal text-5xl sm:text-6xl px-2">{t('story.subtitle')}</span>
                  </h2>
                  <div className="w-24 h-[2px] bg-[#ba935a]/60 mx-auto lg:mx-0"></div>
                </div>

                <div className="space-y-6 text-[#6e675e] text-base sm:text-lg leading-relaxed font-medium">
                  <p>
                    {t('story.p1')}
                  </p>
                  <p>
                    {t('story.p2')}
                  </p>
                  <p className="font-accent text-3xl sm:text-4xl text-[#ba935a] pt-6 font-normal">
                    {t('story.quote')}
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#ba935a] hover:bg-[#ba935a] text-[#ba935a] hover:text-white font-bold text-sm transition-colors shadow-sm tracking-wider uppercase"
                  >
                    <span>{t('story.discoverMenu')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Image Side - Luxury Person PFP Avatar Fallback */}
              <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] mx-auto mt-8 lg:mt-0">
                {/* Person 1 */}
                <OwnerAvatarCard
                  src="/home/mr-loris.jpg"
                  alt="Mr. Loris"
                  positionClass="top-0 right-0 shadow-2xl"
                  zIndexClass="z-10 hover:z-30"
                />

                {/* Person 2 */}
                <OwnerAvatarCard
                  src="/home/mrs-veronica.jpg"
                  alt="Mrs. Veronica"
                  positionClass="bottom-0 left-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  zIndexClass="z-20 hover:z-30"
                />
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      <FloatingOrderBar
        items={orderItems}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
      />

      <OrderDraftDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateNote={handleUpdateNote}
      />
    </div>
  );
}
