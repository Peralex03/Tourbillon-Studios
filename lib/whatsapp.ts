/**
 * WhatsApp contact link.
 * Number stored in international format without "+" or spaces (wa.me requirement).
 * Swiss mobile 076 530 28 50 -> 41765302850.
 */
export const WHATSAPP_NUMBER = "41765302850";

/** Build a wa.me link, optionally with a prefilled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
