'use client';

import React, { useState, useEffect } from 'react';

import { MenuItem } from '../data/menuData';
import { X, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export interface OrderItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  options: string[];
  specialNotes?: string;
  unitPrice: number;
}

import { TableSelectionModal } from './TableSelectionModal';

interface OrderDraftDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onUpdateNote?: (cartId: string, note: string) => void;
}

import { useLanguage } from '../context/LanguageContext';
import { getTranslatedMenuItem } from '../utils/menuTranslations';

export const OrderDraftDrawer: React.FC<OrderDraftDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNote,
}) => {
  const { language, t, formatNumber, formatCurrency } = useLanguage();
  const [tableNumber, setTableNumber] = useState('Table 07');
  const [callWaiterMsg, setCallWaiterMsg] = useState<string | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('casaItaliaTableNumber');
    if (stored) {
      setTableNumber(stored);
    }
  }, []);

  // Table selection modal states
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [pendingServiceType, setPendingServiceType] = useState<string | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMessage(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = items.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const serviceChargeRate = 0.12; // 12% service charge
  const serviceTotal = subtotal * serviceChargeRate;
  const grandTotal = subtotal + serviceTotal;

  const dispatchCallToBackend = async (tableNum: number, serviceType: string, orderData?: string): Promise<boolean> => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableNumber: tableNum,
          callType: serviceType,
          orderData: orderData || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitting(false);
        return true;
      } else {
        const errText = data.error || 'Failed to communicate with Cloudflare D1 database.';
        setErrorMessage(errText);
        setIsSubmitting(false);
        return false;
      }
    } catch (err: any) {
      setErrorMessage(`Cloudflare D1 Connection Error: ${err?.message || 'Network request failed'}`);
      setIsSubmitting(false);
      return false;
    }
  };

  const handleSendOrder = async () => {
    const isScanned = localStorage.getItem('casaItaliaScannedViaQR') === 'true';
    const numOnly = parseInt(tableNumber.replace(/\D/g, ''), 10) || 7;

    const orderLines = items.map(
      (ci) => `${ci.quantity}x ${ci.item.name} (€${(ci.unitPrice * ci.quantity).toFixed(2)})${ci.specialNotes ? ` [${ci.specialNotes}]` : ''}`
    );
    const orderSummary = `${orderLines.join('\n')}\nTotal: €${grandTotal.toFixed(2)}`;

    if (isScanned) {
      const ok = await dispatchCallToBackend(numOnly, 'Order Placed', orderSummary);
      if (ok) {
        setOrderSubmitted(true);
      }
    } else {
      setPendingServiceType('Order Placed');
      setIsTableModalOpen(true);
    }
  };

  const handleCallWaiterClick = async (serviceType: string) => {
    const isScanned = localStorage.getItem('casaItaliaScannedViaQR') === 'true';
    const numOnly = parseInt(tableNumber.replace(/\D/g, ''), 10) || 7;
    const labelKey = serviceType === 'Ask for Check' ? 'waiter.askedCheck' : 'waiter.called';

    if (isScanned) {
      const ok = await dispatchCallToBackend(numOnly, serviceType);
      if (ok) {
        setCallWaiterMsg(`${t(labelKey)} ${tableNumber}`);
        setTimeout(() => setCallWaiterMsg(null), 4000);
      }
    } else {
      setPendingServiceType(serviceType);
      setIsTableModalOpen(true);
    }
  };

  const handleConfirmTableModal = async (num: number) => {
    const formatted = num < 10 ? `Table 0${num}` : `Table ${num}`;
    setTableNumber(formatted);
    localStorage.setItem('casaItaliaTableNumber', formatted);
    localStorage.setItem('casaItaliaTableNumOnly', String(num));

    if (pendingServiceType === 'Order Placed') {
      const orderLines = items.map(
        (ci) => `${ci.quantity}x ${ci.item.name} (€${(ci.unitPrice * ci.quantity).toFixed(2)})${ci.specialNotes ? ` [${ci.specialNotes}]` : ''}`
      );
      const orderSummary = `${orderLines.join('\n')}\nTotal: €${grandTotal.toFixed(2)}`;
      const ok = await dispatchCallToBackend(num, 'Order Placed', orderSummary);
      if (ok) {
        setOrderSubmitted(true);
      }
    } else if (pendingServiceType) {
      const labelKey = pendingServiceType === 'Ask for Check' ? 'waiter.askedCheck' : 'waiter.called';
      const ok = await dispatchCallToBackend(num, pendingServiceType);
      if (ok) {
        setCallWaiterMsg(`${t(labelKey)} ${formatted}`);
        setTimeout(() => setCallWaiterMsg(null), 4000);
      }
    }
    setIsTableModalOpen(false);
    setPendingServiceType(null);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm' : 'opacity-0 pointer-events-none bg-black/0 backdrop-blur-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md bg-[#faf7f2] h-full shadow-2xl flex flex-col justify-between border-l border-[#ba935a]/30 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#ba935a]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1a1816]">{t('cart.title')}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 text-[#1a1816] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Notification Alert Banner */}
        {errorMessage && (
          <div className="bg-rose-600 text-white text-xs font-semibold px-4 py-3 flex items-center justify-between shadow-md animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-white" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-white/80 hover:text-white ml-2 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Waiter Notification Alert banner */}
        {callWaiterMsg && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 text-center animate-pulse flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{callWaiterMsg}</span>
          </div>
        )}

        {/* Success Confirmation State */}
        {orderSubmitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-2xl text-[#1a1816]">{t('order.sentTitle')}</h4>
            <p className="text-sm text-[#6e675e] max-w-xs mx-auto">
              {t('order.sentDesc')} <span className="font-bold text-[#ba935a]">{tableNumber}</span>.
            </p>
            <button
              onClick={() => {
                setOrderSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-[#ba935a] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#a37f48] transition-colors"
            >
              {t('order.viewMenu')}
            </button>
          </div>
        ) : (
          /* Drawer Content Items List */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#6e675e] space-y-2">
                <p className="font-serif text-lg text-[#1a1816]">{t('cart.empty')}</p>
                <p className="text-xs max-w-xs">{t('cart.emptyDesc')}</p>
              </div>
            ) : (
              items.map((cartItem) => {
                const translated = getTranslatedMenuItem(cartItem.item, language);
                return (
                  <div
                    key={cartItem.cartId}
                    className="p-3 bg-white border border-[#ba935a]/20 space-y-2 relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-sm text-[#1a1816]">{translated.name}</h4>
                        <p className="text-xs text-[#6e675e] line-clamp-1">{translated.description}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Special Instructions Note */}
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder={t('cart.addNote')}
                        value={cartItem.specialNotes || ''}
                        onChange={(e) => onUpdateNote && onUpdateNote(cartItem.cartId, e.target.value)}
                        className="w-full text-xs p-1.5 bg-[#faf7f2] border border-[#ba935a]/20 text-[#1a1816] placeholder:text-gray-400 focus:outline-none focus:border-[#ba935a]"
                      />
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 bg-[#faf7f2] border border-[#ba935a]/20 px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                          className="text-xs font-bold hover:text-[#ba935a]"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1.5">{formatNumber(cartItem.quantity)}</span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                          className="text-xs font-bold hover:text-[#ba935a]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-bold text-sm text-[#1a1816]">
                        {formatCurrency(cartItem.unitPrice * cartItem.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Drawer Bottom Total & Action */}
        {!orderSubmitted && items.length > 0 && (
          <div className="p-4 pb-12 sm:p-5 bg-white border-t border-[#ba935a]/20 space-y-3 shrink-0">
            {/* Calculation summary */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-[#6e675e]">
                <span>{t('cart.subtotal')}:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[#6e675e]">
                <span>{t('cart.serviceCharge')}:</span>
                <span>{formatCurrency(serviceTotal)}</span>
              </div>
              <div className="flex items-center justify-between font-bold text-sm text-[#1a1816] pt-1 border-t border-gray-100">
                <span>{t('cart.total')}:</span>
                <span className="font-serif text-lg text-[#ba935a]">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#ba935a]/20 space-y-2">
              <button
                disabled={isSubmitting}
                onClick={handleSendOrder}
                className="w-full py-3 px-4 bg-[#ba935a] hover:bg-[#a37f48] disabled:opacity-60 text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{t('cart.sendOrder')}</span>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  disabled={isSubmitting}
                  onClick={() => handleCallWaiterClick('Ask for Check')}
                  className="p-2.5 bg-white hover:bg-[#faf7f2] disabled:opacity-60 text-[#ba935a] border border-[#ba935a] font-semibold text-center transition-colors shadow-sm"
                >
                  {t('cart.requestBill')}
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleCallWaiterClick('Call Waiter')}
                  className="p-2.5 bg-white hover:bg-[#faf7f2] disabled:opacity-60 text-[#ba935a] border border-[#ba935a] font-semibold text-center transition-colors shadow-sm"
                >
                  {t('cart.callWaiter')}
                </button>
              </div>
            </div>
          </div>
        )}

        <TableSelectionModal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          onSelectTable={handleConfirmTableModal}
        />
      </div>
    </div>
  );
};
