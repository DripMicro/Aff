interface SingleLinkData {
  type: "single";
  link: string;
  linkName: string;
}

interface DropdownLinkData {
  type: "dropdown";
  linkName: string;
  dropdownName: string;
  defaultLink: string;
  parentLink?: string;
  links: Array<{ name: string; link: string }>;
}

export type NavigationLinkData = SingleLinkData | DropdownLinkData;

export const navigationData: NavigationLinkData[] = [
  {
    type: "single",
    link: "dashboard",
    linkName: "Dashboard",
  },
  {
    type: "dropdown",
    linkName: "Marketing Tools",
    dropdownName: "marketing",
    defaultLink: "creative",
    links: [
      { name: "Creative Materials", link: "creative" },
      { name: "Sub Affiliates Creatives", link: "sub" },
    ],
  },
  {
    type: "dropdown",
    linkName: "Reports",
    dropdownName: "reports",
    defaultLink: "quick-summary",
    parentLink: "reports",
    links: [
      { name: "Quick Summary Report", link: "quick-summary" },
      { name: "Commission Report", link: "commission-report" },
      { name: "Clicks Report", link: "clicks-report" },
      { name: "Creative Report", link: "creative-report" },
      { name: "Landing Page Report", link: "landing-page" },
      { name: "Users Report", link: "trader_report" },
      { name: "Pixels Logs Report", link: "pixel_log_report" },
      { name: "Install Report", link: "install-reports" },
      { name: "Profile Report", link: "profile-report" },
      { name: "Sub Affiliates Report", link: "sub-affiliate-report" },
    ],
  },
  {
    type: "single",
    link: "profiles",
    linkName: "Profiles",
  },
  {
    type: "dropdown",
    linkName: "My Account",
    dropdownName: "myAccount",
    defaultLink: "account",
    links: [
      { name: "Account Details", link: "account" },
      { name: "Document", link: "documents" },
      { name: "Payment Method", link: "account-payment" },
      { name: "Commission Structure", link: "commissions" },
    ],
  },
  {
    type: "single",
    link: "billings",
    linkName: "Billings",
  },
  {
    type: "single",
    link: "pixel-monitor",
    linkName: "Pixel Monitor",
  },
  {
    type: "single",
    link: "support",
    linkName: "Support",
  },
  {
    type: "single",
    link: "announcements",
    linkName: "Announcements",
  },
  {
    type: "single",
    link: "privacy",
    linkName: "Privacy policy",
  },
  {
    type: "single",
    link: "terms",
    linkName: "Terms & Conditions",
  },
];
