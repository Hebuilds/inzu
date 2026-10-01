/**
 * Landing page copy and links, kept in one place so the sections stay presentational.
 * `APP_URL` points at the live app; set it to "" once this page lives inside that app.
 */
export const APP_URL = "https://www.inzuconnect.com/en";

export const links = {
  register: `${APP_URL}/register`,
  login: `${APP_URL}/login`,
  pricing: `${APP_URL}/pricing`,
  listings: `${APP_URL}/listings`,
  properties: `${APP_URL}/listings?kind=property`,
  lodges: `${APP_URL}/listings?kind=lodge`,
  about: `${APP_URL}/about`,
  contact: `${APP_URL}/contact`,
  privacy: `${APP_URL}/legal/privacy-policy`,
  terms: `${APP_URL}/legal/terms-of-service`,
  cookies: `${APP_URL}/legal/cookies`,
  refunds: `${APP_URL}/legal/refunds`,
  status: "https://status.inzuconnect.com",
  maker: "https://malos-tech.vercel.app",
} as const;

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Listings", href: links.listings },
  { label: "Pricing", href: links.pricing },
  { label: "About", href: links.about },
  { label: "Contact", href: links.contact },
] as const;

export const stats = [
  { value: 2400, suffix: "+", label: "Units managed" },
  { value: 98, suffix: "%", label: "Rent collected on time" },
  { value: 10, suffix: " min", label: "Avg. maintenance response" },
  { value: 340, suffix: "+", label: "Active tenants" },
] as const;

export const audiences = [
  {
    id: "landlords",
    title: "For landlords",
    body: "Every unit, invoice and lease on one dashboard. Rent reminders go out on their own, and the month's report lands in your inbox.",
  },
  {
    id: "tenants",
    title: "For tenants",
    body: "A portal to pay rent online, send a maintenance request with photos, and message management. No phone calls, no queues.",
  },
  {
    id: "agents",
    title: "For agents",
    body: "List properties publicly. Anyone can browse, filter by amenity and price, and apply online, with no account needed.",
  },
] as const;

export const features = [
  {
    id: "tenants",
    title: "Tenant management",
    body: "Whether you have 2 units or 200, the tenant hub keeps every profile, lease, document and history on one clean screen.",
    points: [
      "Full profiles: ID, lease, employment, vehicles and emergency contacts",
      "An immutable timeline of every payment, notice and action",
      "Onboard a tenant and assign a unit in under two minutes",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance workflows",
    body: "Tenants submit from their portal, admins assign the right specialist, assistants resolve and close, with an audit trail at every step.",
    points: [
      "Requests arrive with photos and a priority level",
      "Admins, specialists and tenants are notified at each stage",
      "History per unit makes recurring problems easy to spot",
    ],
  },
  {
    id: "analytics",
    title: "Analytics & reports",
    body: "Revenue trends, occupancy heatmaps, overdue invoices and maintenance KPIs on one dashboard. Export anything in seconds.",
    points: [
      "Filter and drill down on any data point",
      "Scheduled PDF and Excel reports, straight to your inbox",
      "Exports as PDF, Excel or CSV",
    ],
  },
] as const;

export const steps = [
  {
    title: "Create your company",
    body: "Sign up, configure payment details, set your late-fee rules and invite your admin team.",
  },
  {
    title: "Add properties & lodges",
    body: "Bring in your portfolio with locations, unit details, amenities and pricing. It takes minutes.",
  },
  {
    title: "Onboard tenants",
    body: "Add tenants, assign them to units and set lease dates. They get portal access instantly.",
  },
  {
    title: "Everything automates",
    body: "Invoices generate monthly, reminders go out, payments process online and maintenance flows.",
  },
] as const;

/** What the background jobs do across a month, plotted on a 30-day track. */
export const automations = [
  { day: 1, label: "Invoices generated", detail: "Every active lease, on the 1st" },
  { day: 5, label: "Rent reminders", detail: "SMS, email and WhatsApp" },
  { day: 12, label: "Overdue detection", detail: "Checked daily, late fees applied" },
  { day: 23, label: "Lease expiry notice", detail: "At 30, 14 and 7 days out" },
  { day: 30, label: "Monthly report", detail: "PDF and Excel, to your inbox" },
] as const;

export type Listing = {
  title: string;
  place: string;
  price: string;
  per: string;
  meta: string;
  image: string;
};

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

/** Sample listings for the showcase rail; replace with the listings API. */
export const properties: Listing[] = [
  {
    title: "Two-bed apartment",
    place: "Kiyovu, Kigali",
    price: "RWF 450,000",
    per: "month",
    meta: "2 bed · 2 bath · Parking",
    image: photo("1545324418-cc1a3fa10c00"),
  },
  {
    title: "Family house with garden",
    place: "Nyarutarama, Kigali",
    price: "RWF 1,200,000",
    per: "month",
    meta: "4 bed · 3 bath · Garden",
    image: photo("1512917774080-9991f1c4c750"),
  },
  {
    title: "Furnished studio",
    place: "Kacyiru, Kigali",
    price: "RWF 280,000",
    per: "month",
    meta: "Studio · 1 bath · Wi-Fi",
    image: photo("1522708323590-d24dbb6b0267"),
  },
  {
    title: "Hillside villa",
    place: "Rebero, Kigali",
    price: "RWF 1,800,000",
    per: "month",
    meta: "5 bed · 4 bath · View",
    image: photo("1600596542815-ffad4c1539a9"),
  },
  {
    title: "One-bed apartment",
    place: "Kimihurura, Kigali",
    price: "RWF 350,000",
    per: "month",
    meta: "1 bed · 1 bath · Balcony",
    image: photo("1502672260266-1c1ef2d93688"),
  },
  {
    title: "Modern townhouse",
    place: "Gacuriro, Kigali",
    price: "RWF 900,000",
    per: "month",
    meta: "3 bed · 3 bath · Garage",
    image: photo("1600585154340-be6161a56a0c"),
  },
];

export const lodges: Listing[] = [
  {
    title: "Lakeside rooms",
    place: "Rubavu, Lake Kivu",
    price: "RWF 65,000",
    per: "night",
    meta: "Double · Breakfast · Lake view",
    image: photo("1566073771259-6a8506099945"),
  },
  {
    title: "Garden suite",
    place: "Musanze",
    price: "RWF 80,000",
    per: "night",
    meta: "Suite · Fireplace · Wi-Fi",
    image: photo("1582719478250-c89cae4dc85b"),
  },
  {
    title: "Long-stay room",
    place: "Remera, Kigali",
    price: "RWF 30,000",
    per: "night",
    meta: "Single · Kitchenette",
    image: photo("1493809842364-78817add7ffb"),
  },
  {
    title: "Resort cottage",
    place: "Karongi, Lake Kivu",
    price: "RWF 110,000",
    per: "night",
    meta: "Cottage · Pool · Half board",
    image: photo("1520250497591-112f2f40a3f4"),
  },
  {
    title: "City apartment stay",
    place: "Kiyovu, Kigali",
    price: "RWF 55,000",
    per: "night",
    meta: "1 bed · Self check-in",
    image: photo("1560448204-e02f11c3d0e2"),
  },
  {
    title: "Courtyard house",
    place: "Huye",
    price: "RWF 70,000",
    per: "night",
    meta: "3 bed · Whole house",
    image: photo("1564013799919-ab600027ffc6"),
  },
];

export const storyImage = photo("1460317442991-0ec209397118");

export const capabilities = [
  {
    icon: "building",
    title: "Properties & lodges",
    body: "Apartments, houses, commercial spaces and lodges under one roof, with amenities tracked per unit.",
  },
  {
    icon: "users",
    title: "Tenant management",
    body: "Profiles with ID, insurance, employment, banking and vehicle details, plus an immutable event timeline.",
  },
  {
    icon: "wrench",
    title: "Maintenance workflows",
    body: "Tenants submit, admins assign to specialists, assistants resolve. A full audit trail at every step.",
  },
  {
    icon: "chart",
    title: "Analytics & reports",
    body: "Revenue trends, occupancy heatmaps and maintenance stats. Export as PDF, Excel or CSV.",
  },
  {
    icon: "globe",
    title: "Public listings",
    body: "List properties publicly so anyone can browse, filter by amenity and price, and apply online.",
  },
  {
    icon: "bell",
    title: "Automated notifications",
    body: "Real-time alerts, email and optional WhatsApp for payments, maintenance and lease reminders.",
  },
  {
    icon: "shield",
    title: "Role-based access",
    body: "Five roles, from platform owner to assistant. Every action is controlled by precise permissions.",
  },
  {
    icon: "zap",
    title: "Background automation",
    body: "Invoices on the 1st, overdue detection daily, lease expiry reminders at 30, 14 and 7 days.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "We moved from spreadsheets to Inzu Connect in one week. The automated invoices alone save us 3 hours every month.",
    name: "Alice Uwera",
    role: "Property manager, Kigali",
    initials: "AU",
  },
  {
    quote:
      "Our tenants pay online, maintenance gets done faster, and I can see everything from my phone. This is what we needed.",
    name: "Jean Bosco N.",
    role: "Lodge owner, Musanze",
    initials: "JB",
  },
  {
    quote: "The multi-property analytics are exceptional. We track occupancy across 6 buildings in one dashboard.",
    name: "Diane Ingabire",
    role: "Real estate firm, Nairobi",
    initials: "DI",
  },
] as const;

export const footer = {
  blurb:
    "Property management built for Africa. Manage properties, collect rent and grow your portfolio, all in one place.",
  languages: ["English", "Français", "Kiswahili", "Kinyarwanda"],
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#product" },
        { label: "Pricing", href: links.pricing },
        { label: "Listings", href: links.listings },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: links.about },
        { label: "Contact", href: links.contact },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: links.privacy },
        { label: "Terms of service", href: links.terms },
        { label: "Cookie policy", href: links.cookies },
        { label: "Refund policy", href: links.refunds },
      ],
    },
  ],
} as const;
