export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "company" | "personal";
  companyName?: string;
  summary: string;
  body: string;
  image: string | null;
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  year: number;
  published: boolean;
}

export const DEFAULT_PROJECTS: ProjectItem[] = [
  // 1. Company Work
  {
    id: "proj-aniheal",
    slug: "aniheal",
    title: "Aniheal — Corporate Web Platform",
    category: "company",
    companyName: "aniheal.co.ke",
    summary:
      "Official web platform for Aniheal, delivering high-performance digital presence, service catalog, responsive client workflows, and SEO optimization.",
    body: "Designed and developed the modern corporate web presence for Aniheal (aniheal.co.ke). Engineered for fast load times, accessibility, and high conversion, featuring responsive layouts and intuitive service navigation.",
    image: null,
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aniheal.co.ke",
    repoUrl: null,
    year: 2026,
    published: true,
  },
  // 2. Personal Projects
  {
    id: "proj-laundry",
    slug: "laundry-management-system",
    title: "Laundry Management System",
    category: "personal",
    summary:
      "Full-featured operations management system for commercial laundry services: automated order intake, cloth tracking, customer billing, and pickup/delivery scheduling.",
    body: "A web-based operations hub built to streamline commercial laundry businesses. Includes order life-cycle tracking, customer management, service tier pricing, status notifications, and invoice generation.",
    image: null,
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    liveUrl: "https://laundryservices-fronted.vercel.app/", // Can be updated with custom deployment link
    repoUrl: "https://github.com/devmunguti/laundryservices-fronted.git",
    year: 2026,
    published: true,
  },
  {
    id: "proj-house",
    slug: "house-management-system",
    title: "House & Property Management System",
    category: "personal",
    summary:
      "Centralized property and tenancy management platform managing tenant records, rent tracking, automated payment reconciliation, and maintenance ticketing.",
    body: "A scalable management platform designed for property managers and landlords. Automates monthly rent records, unit occupancy tracking, digital lease agreements, and maintenance issue resolution workflows.",
    image: null,
    stack: ["React", "Node.js", "MongoDB", "JavaScript", "REST APIs"],
    liveUrl: "#",
    repoUrl: "https://github.com/devmunguti/house-management-client.git",
    year: 2026,
    published: true,
  },
  {
    id: "proj-bakery",
    slug: "bakery-management-system",
    title: "Bakery Management System",
    category: "personal",
    summary:
      "All-in-one production, inventory, and point-of-sale (POS) system tracking ingredient usage, batch baking schedules, daily sales, and profit margins.",
    body: "Designed to tackle wastage and inventory bottlenecks in artisanal bakeries. Manages raw ingredients, recipe batching, daily production forecasts, POS sales logging, and real-time stock alerts.",
    image: null,
    stack: ["JavaScript", "Python", "MongoDB", "HTML5", "CSS3"],
    liveUrl: "https://cake-website-frontend.vercel.app/",
    repoUrl: "https://github.com/devmunguti/cake.website-frontend.git",
    year: 2026,
    published: true,
  },
  {
    id: "proj-decorating",
    slug: "online-decorating-store",
    title: "Online Decorating Store Platform",
    category: "personal",
    summary:
      "Modern e-commerce platform for interior decor and home styling products with dynamic catalog filtering, cart state management, and secure checkout.",
    body: "A comprehensive interior decoration e-commerce solution. Offers rich image galleries, product attribute variations, wishlist, shopping cart persistence, and order management dashboard.",
    image: null,
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://decohhaven.xyz/",
    repoUrl: "#",
    year: 2026,
    published: true,
  },
];
