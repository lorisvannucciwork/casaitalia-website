'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { DeliveryCartItem, DeliveryCustomerDetails } from '@/types/delivery';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedMenuItem } from '@/utils/menuTranslations';
import { SITE_CONFIG } from '@/config/site';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Bike,
  FileText,
  Check,
} from 'lucide-react';

interface DeliveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: DeliveryCartItem[];
  onAddToCart: (dish: DeliveryCartItem['dish']) => void;
  onRemoveFromCart: (dish: DeliveryCartItem['dish']) => void;
  onDeleteFromCart: (dishId: string) => void;
  onUpdateItemNotes: (dishId: string, notes: string) => void;
  onClearCart: () => void;
  customerDetails: DeliveryCustomerDetails;
  onUpdateCustomerDetails: (details: Partial<DeliveryCustomerDetails>) => void;
}


export const DeliveryDrawer: React.FC<DeliveryDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onDeleteFromCart,
  onUpdateItemNotes,
  onClearCart,
  customerDetails,
  onUpdateCustomerDetails,
}) => {
  const { language, formatCurrency, t } = useLanguage();
  const isIt = language === 'it';
  const [activeItemNoteId, setActiveItemNoteId] = useState<string | null>(null);

  // Drawer visibility state & desktop closing animation flag
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      // Check if currently on desktop view (>= 768px)
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
      if (isDesktop) {
        setIsClosing(true);
        timer = setTimeout(() => {
          setShouldRender(false);
          setIsClosing(false);
        }, 300);
      } else {
        // Mobile view: close immediately without animation
        setShouldRender(false);
        setIsClosing(false);
      }
    }

    return () => clearTimeout(timer);
  }, [isOpen, shouldRender]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  // Generate formatted WhatsApp message and open link
  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart
      .map((item) => {
        const translated = getTranslatedMenuItem(item.dish, language);
        const lineTotal = formatCurrency(item.dish.price * item.quantity);
        const itemNote = item.notes?.trim() ? `\n   └ Note: "${item.notes.trim()}"` : '';
        return `• ${item.quantity}x ${translated.name} (${lineTotal})${itemNote}`;
      })
      .join('\n');

    const customerName = customerDetails.customerName.trim() || (isIt ? 'Ospite' : 'Guest');
    const isInside = customerDetails.area !== 'outside';
    const areaText = isInside
      ? (isIt ? 'Dentro Port Ghalib' : 'Inside Port Ghalib')
      : (isIt ? 'Fuori Port Ghalib' : 'Outside Port Ghalib');
    const specificLoc = customerDetails.specificLocation.trim() || (isIt ? 'Da concordare' : 'To be confirmed');
    const phone = customerDetails.phone.trim() || (isIt ? 'WhatsApp' : 'WhatsApp');
    const specialNotes = customerDetails.notes?.trim() || (isIt ? 'Nessuna' : 'None');
    const feeText = isInside
      ? (isIt ? 'Gratuita (Offerta da Casa Italia)' : 'Complimentary (Free)')
      : (isIt ? 'Da concordare su WhatsApp' : 'To be agreed via WhatsApp');
    const closingText = isInside
      ? (isIt ? 'Grazie! Attendo conferma dell’ordine.' : 'Thank you! Looking forward to your confirmation.')
      : (isIt ? 'Grazie! Attendo conferma e indicazione delle spese di consegna.' : 'Thank you! Looking forward to your confirmation and delivery fee estimate.');

    const message = isIt
      ? `🇮🇹 *NUOVO ORDINE DELIVERY — CASA ITALIA PORTO GHALIB*

👤 *Cliente:* ${customerName}
📍 *Zona di Consegna:* ${areaText}
📍 *Posizione:* ${specificLoc}
📱 *Telefono:* ${phone}

📋 *DETTAGLIO ORDINE:*
${itemsSummary}

💰 *Totale Cibo:* ${formatCurrency(subtotal)}
🛵 *Spese di Consegna:* ${feeText}

📝 *Note speciali:* ${specialNotes}

${closingText}`
      : `🇮🇹 *NEW DELIVERY ORDER — CASA ITALIA PORTO GHALIB*

👤 *Customer:* ${customerName}
📍 *Delivery Area:* ${areaText}
📍 *Location:* ${specificLoc}
📱 *Phone:* ${phone}

📋 *ORDER ITEMS:*
${itemsSummary}

💰 *Food Subtotal:* ${formatCurrency(subtotal)}
🛵 *Delivery Fee:* ${feeText}

📝 *Special Instructions:* ${specialNotes}

${closingText}`;

    const whatsappUrl = `https://wa.me/201508300656?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGeneralInquiry = () => {
    const text = isIt
      ? 'Salve Casa Italia! Vorrei informazioni sul servizio di consegna a domicilio a Port Ghalib.'
      : 'Hello Casa Italia! I would like some information regarding your delivery service in Port Ghalib.';
    window.open(`https://wa.me/201508300656?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delivery-drawer-title"
      className="fixed inset-0 z-[120] flex justify-end overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer ${
          isClosing ? 'drawer-backdrop-close' : 'drawer-backdrop-open'
        }`}
      />

      {/* Slide-over Sheet */}
      <div
        className={`relative z-10 w-full max-w-lg bg-[#faf7f2] h-full shadow-2xl flex flex-col border-l border-[#ba935a]/40 overflow-hidden ${
          isClosing ? 'drawer-sheet-close' : 'drawer-sheet-open'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#faf7f2] text-[#1a1816] border-b border-[#ba935a]/25 flex items-center justify-between shrink-0">
          <div>
            <h2 id="delivery-drawer-title" className="font-serif font-bold text-lg sm:text-xl text-[#1a1816]">
              {t('delivery.cartTitle')}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close delivery order tray"
              className="p-1.5 text-[#6e675e] hover:text-[#1a1816] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {cart.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#ba935a]/10 border border-[#ba935a]/30 text-[#ba935a] mx-auto flex items-center justify-center">
                <Bike className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-[#1a1816]">
                  {t('delivery.cartEmpty')}
                </h3>
                <p className="text-xs text-[#6e675e] max-w-xs mx-auto">
                  {t('delivery.cartEmptyPrompt')}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                {t('delivery.continueBrowsing')}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba935a] block">
                    {isIt ? 'Piatti Selezionati' : 'Selected Dishes'} ({totalItemsCount})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] text-[#ba935a] hover:text-[#8a6834] underline underline-offset-2 transition-colors px-1 py-0.5 cursor-pointer font-medium"
                  >
                    {t('delivery.clearCart')}
                  </button>
                </div>

                <div className="space-y-2.5 divide-y divide-[#ba935a]/15">
                  {cart.map((item) => {
                    const translated = getTranslatedMenuItem(item.dish, language);
                    const dishImage =
                      item.dish.image && item.dish.image.trim() !== ''
                        ? encodeURI(item.dish.image.trim())
                        : null;

                    return (
                      <div key={item.dish.id} className="pt-2.5 first:pt-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          {/* Image Thumbnail */}
                          <div className="relative w-12 h-12 bg-[#f5eedf] shrink-0 border border-[#ba935a]/30 overflow-hidden">
                            {dishImage ? (
                              <Image
                                src={dishImage}
                                alt={translated.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] font-signature text-[#ba935a]">
                                CI
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm text-[#1a1816] truncate">
                              {translated.name}
                            </h4>
                            <p className="text-xs text-[#8c6c39] font-medium">
                              {formatCurrency(item.dish.price)} each
                            </p>
                          </div>

                          {/* Line Total */}
                          <div className="text-right shrink-0">
                            <span className="font-serif font-bold text-sm text-[#1a1816]">
                              {formatCurrency(item.dish.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Controls & Notes */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveItemNoteId(
                                activeItemNoteId === item.dish.id ? null : item.dish.id
                              )
                            }
                            className="text-[11px] text-[#6e675e] hover:text-[#ba935a] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>
                              {item.notes ? (isIt ? 'Modifica nota' : 'Edit note') : (isIt ? '+ Aggiungi nota' : '+ Add note')}
                            </span>
                          </button>

                          <div className="flex items-center gap-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-white border border-[#ba935a]/40 shadow-2xs">
                              <button
                                type="button"
                                onClick={() => onRemoveFromCart(item.dish)}
                                aria-label="Decrease quantity"
                                className="w-6 h-6 flex items-center justify-center text-[#1a1816] hover:bg-[#ba935a] hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-bold text-xs text-[#1a1816]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onAddToCart(item.dish)}
                                aria-label="Increase quantity"
                                className="w-6 h-6 flex items-center justify-center text-[#1a1816] hover:bg-[#ba935a] hover:text-white transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Delete button */}
                            <button
                              type="button"
                              onClick={() => onDeleteFromCart(item.dish.id)}
                              aria-label="Remove item"
                              className="text-[#6e675e] hover:text-red-600 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Optional Dish Note Input */}
                        {(activeItemNoteId === item.dish.id || Boolean(item.notes)) && (
                          <div className="pt-1">
                            <input
                              type="text"
                              value={item.notes || ''}
                              onChange={(e) => onUpdateItemNotes(item.dish.id, e.target.value)}
                              placeholder={isIt ? 'Inserisci eventuali note per questo piatto qui...' : 'Enter any dish notes or instructions here...'}
                              className="w-full text-xs p-2 bg-white border border-[#ba935a]/30 focus:border-[#ba935a] focus:outline-none placeholder:text-[#a8a095]"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-4 pt-4 border-t border-[#ba935a]/25">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba935a] block">
                    {isIt ? 'Dati Consegna' : 'Delivery Details'}
                  </span>
                </div>

                {/* Customer Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1a1816] block">
                    {t('delivery.nameLabel')}
                  </label>
                  <input
                    type="text"
                    value={customerDetails.customerName}
                    onChange={(e) => onUpdateCustomerDetails({ customerName: e.target.value })}
                    placeholder={t('delivery.namePlaceholder')}
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#ba935a]/30 focus:border-[#ba935a] focus:ring-1 focus:ring-[#ba935a] focus:outline-none"
                  />
                </div>

                {/* Delivery Area Options: Inside vs Outside Port Ghalib */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#1a1816] flex items-center justify-between">
                    <span>{t('delivery.areaLabel')}</span>
                    <span className="text-[10px] text-[#ba935a] font-bold uppercase tracking-wide">
                      2 {isIt ? 'Opzioni' : 'Options'}
                    </span>
                  </label>

                  {/* 2 Options Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Option 1: Inside Port Ghalib */}
                    <button
                      type="button"
                      onClick={() => onUpdateCustomerDetails({ area: 'inside' })}
                      className={`p-3 border text-left transition-all duration-200 cursor-pointer relative flex items-center justify-between gap-2 ${
                        customerDetails.area !== 'outside'
                          ? 'bg-[#ba935a] text-white border-[#ba935a] shadow-sm'
                          : 'bg-white text-[#1a1816] border-[#ba935a]/30 hover:border-[#ba935a] hover:bg-[#faf7f2]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {t('delivery.insidePortGhalib')}
                      </span>
                      {customerDetails.area !== 'outside' && (
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      )}
                    </button>

                    {/* Option 2: Outside Port Ghalib */}
                    <button
                      type="button"
                      onClick={() => onUpdateCustomerDetails({ area: 'outside' })}
                      className={`p-3 border text-left transition-all duration-200 cursor-pointer relative flex items-center justify-between gap-2 ${
                        customerDetails.area === 'outside'
                          ? 'bg-[#ba935a] text-white border-[#ba935a] shadow-sm'
                          : 'bg-white text-[#1a1816] border-[#ba935a]/30 hover:border-[#ba935a] hover:bg-[#faf7f2]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {t('delivery.outsidePortGhalib')}
                      </span>
                      {customerDetails.area === 'outside' && (
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Room / Villa / Berth & Phone in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1a1816] block">
                      {t('delivery.roomLabel')}
                    </label>
                    <input
                      type="text"
                      value={customerDetails.specificLocation}
                      onChange={(e) => onUpdateCustomerDetails({ specificLocation: e.target.value })}
                      placeholder={t('delivery.roomPlaceholder')}
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#ba935a]/30 focus:border-[#ba935a] focus:ring-1 focus:ring-[#ba935a] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1a1816] block">
                      {t('delivery.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => onUpdateCustomerDetails({ phone: e.target.value })}
                      placeholder={t('delivery.phonePlaceholder')}
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#ba935a]/30 focus:border-[#ba935a] focus:ring-1 focus:ring-[#ba935a] focus:outline-none"
                    />
                  </div>
                </div>

                {/* General Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1a1816] block">
                    {t('delivery.notesLabel')}
                  </label>
                  <textarea
                    rows={2}
                    value={customerDetails.notes || ''}
                    onChange={(e) => onUpdateCustomerDetails({ notes: e.target.value })}
                    placeholder={t('delivery.notesPlaceholder')}
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-[#ba935a]/30 focus:border-[#ba935a] focus:ring-1 focus:ring-[#ba935a] focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Delivery Fee & Pricing Summary */}
              <div className="bg-[#f5eedf]/80 border border-[#ba935a]/40 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#1a1816]">
                  <span className="font-semibold">{t('delivery.subtotal')}</span>
                  <span className="font-serif font-bold text-lg text-[#1a1816]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#ba935a]/25 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[#ba935a]">
                    {t('delivery.feeLabel')}
                  </span>
                  <span
                    className={`text-xs font-bold shrink-0 ${
                      customerDetails.area === 'outside'
                        ? 'text-[#ba935a]'
                        : 'text-[#1b7e3e]'
                    }`}
                  >
                    {customerDetails.area === 'outside'
                      ? (isIt ? 'Su WhatsApp' : 'Via WhatsApp')
                      : (isIt ? 'Gratuita' : 'Complimentary')}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Sticky Action Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#ba935a]/30 space-y-3 shrink-0 shadow-xl">
            <button
              type="button"
              onClick={handleSendWhatsAppOrder}
              className="group relative w-full py-3.5 px-4 sm:px-5 overflow-hidden bg-gradient-to-r from-[#171513] via-[#231f1a] to-[#171513] hover:from-[#231f1a] hover:via-[#2d2822] hover:to-[#231f1a] text-[#faf7f2] border border-[#ba935a] shadow-[0_4px_22px_rgba(26,24,22,0.35)] hover:shadow-[0_6px_28px_rgba(186,147,90,0.38)] flex items-center justify-center transition-all duration-300 transform active:scale-[0.99] cursor-pointer"
            >
              {/* Subtle luxury light shimmer on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-[#ba935a]/20 to-transparent transition-transform ease-out pointer-events-none" />

              <span className="font-serif text-xs sm:text-sm font-bold tracking-wider uppercase text-[#faf7f2] truncate">
                {t('delivery.orderOnWhatsApp')}
              </span>
            </button>

            <button
              type="button"
              onClick={handleGeneralInquiry}
              className="w-full text-center text-[11px] text-[#8c6c39] hover:text-[#ba935a] underline transition-colors cursor-pointer"
            >
              {t('delivery.directInquiry')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
