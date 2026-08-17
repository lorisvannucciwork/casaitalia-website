'use client';

import React, { useState, useEffect } from 'react';

import { MenuItem } from '../data/menuData';
import { X, Trash2, CheckCircle2 } from 'lucide-react';

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
  const { language, t } = useLanguage();
  const [tableNumber, setTableNumber] = useState('Table 07');
  const [callWaiterMsg, setCallWaiterMsg] = useState<string | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

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

  const dispatchCallToBackend = async (tableNum: number, serviceType: string, orderData?: string) => {
    try {
      const systemApiUrl = process.env.NEXT_PUBLIC_SYSTEM_API_URL || 'http://localhost:3001/api/calls';
      await fetch(systemApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableNumber: tableNum,
          callType: serviceType,
          orderData: orderData || undefined,
        }),
      });
    } catch {
      console.log('Local call recorded:', serviceType);
    }
  };

  const handleSendOrder = () => {
    const isScanned = localStorage.getItem('casaItaliaScannedViaQR') === 'true';
    const numOnly = parseInt(tableNumber.replace(/\D/g, ''), 10) || 7;

    const orderLines = items.map(
      (ci) => `${ci.quantity}x ${ci.item.name} (€${(ci.unitPrice * ci.quantity).toFixed(2)})${ci.specialNotes ? ` [${ci.specialNotes}]` : ''}`
    );
    const orderSummary = `${orderLines.join('\n')}\nTotal: €${grandTotal.toFixed(2)}`;

    if (isScanned) {
      dispatchCallToBackend(numOnly, 'Order Placed', orderSummary);
      setOrderSubmitted(true);
    } else {
      setPendingServiceType('Order Placed');
      setIsTableModalOpen(true);
    }
  };

  const handleCallWaiterClick = (serviceType: string) => {
    const isScanned = localStorage.getItem('casaItaliaScannedViaQR') === 'true';
    const numOnly = parseInt(tableNumber.replace(/\D/g, ''), 10) || 7;
    const labelKey = serviceType === 'Ask for Check' ? 'waiter.askedCheck' : 'waiter.called';

    if (isScanned) {
      dispatchCallToBackend(numOnly, serviceType);
      setCallWaiterMsg(`${t(labelKey)} ${tableNumber}`);
      setTimeout(() => setCallWaiterMsg(null), 3500);
    } else {
      setPendingServiceType(serviceType);
      setIsTableModalOpen(true);
    }
  };

  const handleConfirmTableModal = (num: number) => {
    const formatted = num < 10 ? `Table 0${num}` : `Table ${num}`;
    setTableNumber(formatted);
    localStorage.setItem('casaItaliaTableNumber', formatted);
    localStorage.setItem('casaItaliaTableNumOnly', String(num));

    if (pendingServiceType === 'Order Placed') {
      const orderLines = items.map(
        (ci) => `${ci.quantity}x ${ci.item.name} (€${(ci.unitPrice * ci.quantity).toFixed(2)})${ci.specialNotes ? ` [${ci.specialNotes}]` : ''}`
      );
      const orderSummary = `${orderLines.join('\n')}\nTotal: €${grandTotal.toFixed(2)}`;
      dispatchCallToBackend(num, 'Order Placed', orderSummary);
      setOrderSubmitted(true);
    } else if (pendingServiceType) {
      const labelKey = pendingServiceType === 'Ask for Check' ? 'waiter.askedCheck' : 'waiter.called';
      dispatchCallToBackend(num, pendingServiceType);
      setCallWaiterMsg(`${t(labelKey)} ${formatted}`);
      setTimeout(() => setCallWaiterMsg(null), 3500);
    }
    setIsTableModalOpen(false);
    setPendingServiceType(null);
  };

  const { formatNumber, formatCurrency } = useLanguage();

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


        {/* Waiter Notification Alert banner */}
        {callWaiterMsg && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center animate-pulse">
            ✓ {callWaiterMsg}
          </div>
        )}

        {/* Success Confirmation View */}
        {orderSubmitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-[#1a1816]">{t('cart.orderSent')}</h4>
            <p className="text-sm text-[#6e675e]">
              {t('cart.orderTransmitted')} <strong className="text-[#1a1816]">({formatNumber(tableNumber)})</strong>
            </p>
            <span className="text-xs bg-[#f5eedf] text-[#ba935a] px-3 py-1.5 font-bold">
              {t('cart.estimatedTime')}
            </span>
          </div>
        ) : (
          /* Order Items List */
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 pb-20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-12 h-12 text-[#ba935a]/40 mx-auto"
                >
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                  <path d="M4 16C4 11.5817 7.58172 8 12 8C16.4183 8 20 11.5817 20 16H4Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17H22" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 20H19" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
                <p className="text-sm font-semibold text-[#1a1816]">{t('cart.empty')}</p>
                <p className="text-xs text-[#6e675e] max-w-xs mx-auto">
                  {t('cart.emptyDesc')}
                </p>
              </div>
            ) : (
              items.map((cartItem) => {
                const translated = getTranslatedMenuItem(cartItem.item, language);
                return (
                  <div
                    key={cartItem.cartId}
                    className="bg-white p-3.5  border border-[#ba935a]/25 shadow-sm space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#1a1816]">
                          {translated.name}
                        </h4>
                        {language !== 'it' && translated.italianName && (
                          <p className="text-xs text-[#ba935a] italic">{translated.italianName}</p>
                        )}
                      </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.cartId)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options & Notes */}
                  {cartItem.options.length > 0 && (
                    <div className="text-[11px] text-[#6e675e] bg-[#faf7f2] p-2 ">
                      {cartItem.options.join(', ')}
                    </div>
                  )}

                  {/* Notes Input */}
                  <div className="pt-1">
                    <input
                      type="text"
                      placeholder={t('cart.notes')}
                      value={cartItem.specialNotes || ''}
                      onChange={(e) => onUpdateNote?.(cartItem.cartId, e.target.value)}
                      className="w-full text-[11px] bg-[#faf7f2] border border-[#ba935a]/20 p-2 focus:outline-none focus:border-[#ba935a]/60 placeholder-[#6e675e]/60 text-[#1a1816] italic transition-colors"
                    />
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 bg-[#faf7f2] border border-[#ba935a]/20  px-2 py-0.5">
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
                onClick={handleSendOrder}
                className="w-full py-3 px-4 bg-[#ba935a] hover:bg-[#a37f48] text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>{t('cart.sendOrder')}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleCallWaiterClick('Ask for Check')}
                  className="p-2.5 bg-white hover:bg-[#faf7f2] text-[#ba935a] border border-[#ba935a] font-semibold text-center transition-colors shadow-sm"
                >
                  {t('cart.requestBill')}
                </button>
                <button
                  onClick={() => handleCallWaiterClick('Call Waiter')}
                  className="p-2.5 bg-white hover:bg-[#faf7f2] text-[#ba935a] border border-[#ba935a] font-semibold text-center transition-colors shadow-sm"
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
