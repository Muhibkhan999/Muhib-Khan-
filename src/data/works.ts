import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";

export type Work = {
  slug: string;
  n: string;
  year: string;
  client: string;
  title: string;
  tag: string;
  image: string;
  discipline: string[];
  location: string;
  duration: string;
  role: string;
  brief: string;
  approach: string[];
  outcome: string;
  gallery: string[];
  credits: { role: string; name: string }[];
  quote: { body: string; author: string };
  link?: string;
  next?: string;
};

export const works: Work[] = [
  {
    slug: "kifayat",
    n: "01",
    year: "2026",
    client: "Kifayat",
    title: "A smarter way to shop online in Pakistan",
    tag: "e-commerce · co-founder",
    image: work1,
    discipline: ["Frontend", "E-commerce", "Domains", "Data"],
    location: "Karachi, PK",
    duration: "Ongoing",
    role: "Co-Founder · Lead Frontend Developer",
    brief:
      "Kifayat is a growing e-commerce platform built to make online shopping in Pakistan smarter, simpler and more affordable — with Cash on Delivery, loyalty rewards and exclusive discounts in one place.",
    approach: [
      "Designed and built the platform's frontend with a focus on speed, clarity and a checkout that never gets in the way.",
      "Managed the domain infrastructure and the technical foundation the store runs on.",
      "Analysed business data to shape what gets built next, and kept the codebase clean enough to scale.",
    ],
    outcome:
      "Launched live at kifayat.co and still growing — a real product with real customers, built alongside co-founders Muhammad Ashar Khan and Aaliyan Suhail.",
    gallery: [work1, work3, work2, work1],
    credits: [
      { role: "Co-Founder · Lead Frontend", name: "Muhammad Muhib Khan" },
      { role: "Co-Founder", name: "Muhammad Ashar Khan" },
      { role: "Co-Founder", name: "Aaliyan Suhail" },
    ],
    quote: {
      body: "Fast, intuitive and reliable — backed by clean, efficient technology. That was the whole brief.",
      author: "Muhib Khan",
    },
    link: "https://kifayat.co",
    next: "mai",
  },
  {
    slug: "mai",
    n: "02",
    year: "2025",
    client: "MAI",
    title: "Multimodal AI, built from scratch",
    tag: "ai platform · full-stack",
    image: work2,
    discipline: ["AI", "Full-stack", "SaaS"],
    location: "Karachi, PK",
    duration: "Solo build",
    role: "Designer + Developer",
    brief:
      "MAI isn't just a chatbot. It's a multimodal intelligence platform that reasons, remembers, speaks and adapts — designed and coded end to end at fifteen.",
    approach: [
      "Integrated five models — GPT-5, DeepSeek R1, Groq, Mixtral and Gemini — behind nine conversation modes and a DeepThink reasoning engine.",
      "Built memory, live web search, speech-to-text and voice replies, with dark, light, system and reading themes.",
      "Shipped on a SERN stack with Supabase for reliability and Stripe (demo) billing for a SaaS-ready foundation.",
    ],
    outcome:
      "A fully responsive, fully working AI platform — and proof that age doesn't define innovation. Curiosity, discipline and vision do.",
    gallery: [work2, work1, work3, work2],
    credits: [
      { role: "Design + Engineering", name: "Muhammad Muhib Khan" },
      { role: "Stack", name: "React · Express · Node · Supabase" },
    ],
    quote: {
      body: "I wanted to prove that age doesn't define innovation.",
      author: "Muhib Khan",
    },
    next: "health-mate",
  },
  {
    slug: "health-mate",
    n: "03",
    year: "2025",
    client: "Health Mate",
    title: "AI-powered hospital care",
    tag: "mern · hackathon",
    image: work3,
    discipline: ["MERN", "AI", "Healthcare"],
    location: "Karachi, PK",
    duration: "Hackathon",
    role: "Full-stack Developer",
    brief:
      "A hospital management system where AI meets healthcare — analysing medical reports, patient vitals and symptoms to help doctors diagnose and plan treatment.",
    approach: [
      "MongoDB for secure patient records, Express for the healthcare API, React for the medical dashboard, Node for scale.",
      "AI report analysis, a symptom checker with predictive suggestions, real-time vital monitoring and emergency alerts.",
      "Multi-role authentication for doctors, patients and admins, with careful handling of sensitive data.",
    ],
    outcome:
      "Completed as a MERN Stack hackathon project — and a crash course in building real-time systems that could genuinely help people.",
    gallery: [work3, work2, work1, work3],
    credits: [
      { role: "Full-stack", name: "Muhammad Muhib Khan" },
      { role: "Stack", name: "MongoDB · Express · React · Node" },
    ],
    quote: {
      body: "Health Mate isn't just code — it's a potential lifesaver.",
      author: "Muhib Khan",
    },
    next: "dastras",
  },
  {
    slug: "dastras",
    n: "04",
    year: "2025",
    client: "Dastras",
    title: "Hyperlocal skilled-trade dispatch",
    tag: "mern · realtime",
    image: work1,
    discipline: ["MERN", "Geo", "Realtime", "PWA"],
    location: "Karachi, PK",
    duration: "Concept build",
    role: "Full-stack Developer",
    brief:
      "A dispatch network that connects households with nearby electricians, plumbers and technicians — matched by distance, availability and rating in seconds.",
    approach: [
      "MongoDB 2dsphere indexes find verified workers within a 5 km radius in a single query.",
      "WebSockets power live quote negotiation and job status between customer and worker.",
      "A lightweight PWA with offline caching keeps it usable on slow mobile networks.",
    ],
    outcome:
      "A working prototype of real-time geo dispatch — and a deep dive into building for low-bandwidth, mobile-first users.",
    gallery: [work1, work2, work3, work1],
    credits: [
      { role: "Full-stack", name: "Muhammad Muhib Khan" },
      { role: "Stack", name: "MongoDB · Express · React · Node · Socket.io" },
    ],
    quote: { body: "The best interface is the one that works on a 3G connection.", author: "Muhib Khan" },
    next: "munshi",
  },
  {
    slug: "munshi",
    n: "05",
    year: "2025",
    client: "Munshi",
    title: "Offline-first wholesale ledger",
    tag: "mern · offline-first",
    image: work2,
    discipline: ["MERN", "Offline", "Fintech"],
    location: "Karachi, PK",
    duration: "Concept build",
    role: "Full-stack Developer",
    brief:
      "A digital ledger for wholesale shopkeepers — credit, stock and cash flow tracked on the phone, even when the internet drops.",
    approach: [
      "IndexedDB queues every entry on-device and syncs to Express + MongoDB with conflict resolution.",
      "Invoices are generated as PDFs on the server and shared in one tap.",
      "Automated payment reminders keep outstanding credit visible and under control.",
    ],
    outcome:
      "A prototype that replaces the paper khata — built around how small traders actually work.",
    gallery: [work2, work3, work1, work2],
    credits: [
      { role: "Full-stack", name: "Muhammad Muhib Khan" },
      { role: "Stack", name: "MongoDB · Express · React · Node · IndexedDB" },
    ],
    quote: { body: "Software should fit the shop, not the other way round.", author: "Muhib Khan" },
    next: "kifayat",
  },
];

export const worksBySlug = new Map(works.map((w) => [w.slug, w]));

export function getWork(slug: string): Work | undefined {
  return worksBySlug.get(slug);
}
