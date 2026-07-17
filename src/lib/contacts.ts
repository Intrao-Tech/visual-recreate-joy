/** Single source of truth for every contact detail rendered on the site. */
export const CONTACTS = {
  email: "ag0487713516@gmail.com",
  /** E.164, used for tel:/wa.me style hrefs. */
  phone: "+380671755376",
  /** Human-readable grouping of the same number. */
  phoneDisplay: "+380 67 175 53 76",
  telegramHandle: "@AnGe_La85",
  telegramUrl: "https://t.me/AnGe_La85",
  facebookUrl: "https://www.facebook.com/share/1CrBPhds3p",
} as const;

export const MAILTO = `mailto:${CONTACTS.email}`;
export const TEL = `tel:${CONTACTS.phone}`;
