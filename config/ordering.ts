/**
 * Online ordering switch: orders sent to the website's server (they reach Odoo by themselves):
 * delivery, "Create your own pizza" and ordering from the Pizza Wall.
 * false = the pizza pages show "currently unavailable" and the server refuses every new order.
 */
export const ONLINE_ORDERING_AVAILABLE = false;

/** Online table booking through the website's server. false = the server refuses every new booking. */
export const RESERVATIONS_AVAILABLE = false;

/**
 * WhatsApp mode: the delivery and booking pages stay open, but pressing send opens WhatsApp with the
 * order / booking written out, to the restaurant's number (config/site.ts). Nothing reaches the server
 * or Odoo: staff take it from WhatsApp. Takes priority over the online switches above.
 */
export const DELIVERY_VIA_WHATSAPP = true;
export const RESERVATIONS_VIA_WHATSAPP = true;

export const DELIVERY_OPEN = DELIVERY_VIA_WHATSAPP || ONLINE_ORDERING_AVAILABLE;
export const RESERVATIONS_OPEN = RESERVATIONS_VIA_WHATSAPP || RESERVATIONS_AVAILABLE;

/** wa.me link to the restaurant with a ready-written message. */
export function whatsappLink(phone: string, text: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
}

/** Opens WhatsApp in a new tab (the app on phones); where pop-ups are blocked, in this tab. */
export function openWhatsApp(url: string) {
  const win = window.open(url, '_blank');
  if (win) win.opener = null;
  else window.location.href = url;
}
