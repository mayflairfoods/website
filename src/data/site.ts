// Single source of truth for Inside MayFlair links and contact details.
// Values mirror the live footer. Anything marked TODO still needs confirming.
export const site = {
  whatsappChannel: "https://whatsapp.com/channel/0029VbD5jyV3gvWfiiA32w2z",
  youtube: "https://www.youtube.com/@mayflairfoods",
  orderUrl: "https://app.mayflairfoods.com",
  submitUrl: "/inside/submit",
  tagline: "Good food, always.",
  hours: [
    ["Monday - Friday", "7 AM - 10 PM"],
    ["Saturday", "10 AM - 11 PM"],
    ["Sunday", "Closed"],
  ],
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Inside MayFlair", href: "/inside" },
    { label: "FAQ", href: "/faq" },
    { label: "Careers", href: "/careers" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  contact: {
    email: "hello@mayflairfoods.com",
    phone: "08021678212",
    phoneHref: "tel:+2348021678212",
    address: "University of Nigeria Enugu Campus, Enugu State", // TODO: confirm full address
  },
  social: [
    {
      label: "Instagram",
      href: "https://instagram.com/mayflairfoods",
      icon: "/icons/instagram.svg",
    },
    {
      label: "TikTok",
      href: "https://tiktok.com/@mayflairfoods",
      icon: "/icons/tiktok.svg",
    },
    {
      label: "Facebook",
      href: "https://facebook.com/mayflairfoods",
      icon: "/icons/facebook.svg",
    },
  ],
};
