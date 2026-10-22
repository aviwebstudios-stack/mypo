export const profile = {
  name: "Vanessa",
  role: "FULL-STACK SOFTWARE ENGINEER",
  heroTagline:
    "I build scalable web applications with React, Next.js, TypeScript, Node.js, and PostgreSQL.",
  email: "aviwebstudios@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "Email", href: "mailto:aviwebstudios@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/vanessa-awo" },
    {
      label: "GitHub",
      href: "https://github.com/awoiwinosavanessa/awoiwinosavanessa.github.io",
    },
    { label: "Twitter", href: "https://x.com/aviwebstudios" },
  ],
};

//PROJECTS//
export const projects = [
  {
    id: "oralogs",
    title: "Oralogs",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Telegram Bot API"],
    description:
      "Built a token-based campaign platform with password-gated pages, voting, giveaways, claim flows, and real-time owner notifications through a Telegram bot.",
    links: [{ label: "Visit Site", href: "https://oralogs.app" }],
    href: "https://oralogs.app",
    image: "/images/oralogs.png",
    gallery: [
      "/images/oralogs-landing.png",
      "/images/oralogs-campaign.png",
      "/images/oralogs-voting.png",
      "/images/oralogs-admin.png",
    ],
    overview:
      "Oralogs is a campaign management platform built for teams running token-gated promotions, voting, giveaways, and reward claims that need to stay restricted to verified participants. Campaign owners often lose track of engagement in real time, so the platform pairs a password-gated web app with a Telegram bot that pushes instant notifications the moment a new vote, claim, or entry comes in. I built it to solve the gap between running a campaign and knowing what's happening inside it without constantly refreshing a dashboard.",
    features: [
      "Password-gated campaign pages",
      "Token-based voting system",
      "Giveaway and claim flows",
      "Real-time Telegram bot notifications",
      "Campaign owner dashboard",
    ],
    metrics: ["5 Core Features", "Real-time Alerts", "Token-Gated Access"],
    challenges: [
      "Keeping campaign state consistent across the web app and Telegram bot in real time",
      "Preventing race conditions when multiple users voted or claimed simultaneously",
      "Securing password-gated pages without adding friction for legitimate participants",
    ],
    learned: [
      "Improved my approach to keeping two systems (web app + bot) in sync without conflicting writes.",
      "Learned to design claim flows that stay fair under concurrent access.",
    ],
  },
  {
    id: "fway-shipping",
    title: "Fway Shipping",
    stack: ["React", "Node.js", "Express", "MySQL"],
    description:
      "Built a production-ready courier tracking platform that lets customers monitor shipments in real time while giving administrators full control over order management.",
    links: [{ label: "Visit Site", href: "https://fwayshipping.com/" }],
    href: "https://fwayshipping.com/",
    image: "/images/fway-shipping.png",
    gallery: [
      "/images/fway-tracking.png",
      "/images/fway-dashboard.png",
      "/images/fway-order-details.png",
    ],
    overview:
      "Fway Shipping needed a way for customers to track courier orders without calling in for updates, and for staff to manage shipment status without juggling spreadsheets. The platform gives customers a live lookup by order ID and gives the business a simple way to push status changes as packages move. It's built for a real shipping company handling day-to-day deliveries, so reliability mattered more than flashy features.",
    features: [
      "Live order tracking by ID",
      "Real-time status updates",
      "Admin order management panel",
      "Customer-facing lookup page",
      "MySQL-backed order history",
    ],
    metrics: ["Live Tracking", "Admin Controls", "Production Use"],
    challenges: [
      "Making status updates feel live without over-polling the database",
      "Balancing responsiveness for customers against server load",
      "Structuring order data in MySQL for fast lookups at scale",
    ],
    learned: [
      "Learned to optimize read-heavy MySQL queries for a customer-facing lookup feature.",
      "Improved my sense for when polling is 'good enough' versus needing sockets.",
    ],
  },
  {
    id: "fashion-platform",
    title: "Fashion Commerce & Booking",
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    description:
      "Built a full e-commerce and consultation-booking platform with wallet refunds and an admin panel the client can manage without code changes.",
    links: [{ label: "Visit Site", href: "https://favyatelier.com" }],
    href: "https://favyatelier.com",
    image: "/images/fashion-platform.png",
    gallery: [
      "/images/fashion-shop.png",
      "/images/fashion-booking.png",
      "/images/fashion-admin.png",
      "/images/fashion-admin-product.png",
    ],
    overview:
      "This platform combines e-commerce with consultation booking for a fashion brand. Customers can shop products and book styling consultations in the same flow, with wallet-based refunds instead of manual processing. The client needed to manage products, bookings, and orders themselves without touching code. I built the admin panel around that requirement specifically, so day-to-day changes don't need developer involvement.",
    features: [
      "Product catalog and checkout",
      "Consultation booking flow",
      "Stripe payment integration",
      "Wallet-based refund system",
      "No-code admin panel for the client",
    ],
    metrics: ["E-commerce + Booking", "Stripe Payments", "Self-Serve Admin"],
    challenges: [
      "Tracking wallet balances accurately across orders, cancellations, and bookings",
      "Combining two different flows (shopping + booking) into one consistent UX",
      "Building an admin panel non-technical staff could safely operate",
    ],
    learned: [
      "Learned to design internal wallet logic that stays consistent under refunds and cancellations.",
      "Got better at building admin UIs for non-technical end users.",
    ],
  },
  {
    id: "chat-app",
    title: "Real-Time Chat App",
    stack: ["React", "Socket.io", "Node.js", "WebRTC"],
    description:
      "Built a Slack-inspired messaging app with channels, groups, real-time chat, and voice/video calling powered by WebRTC signaling.",
    links: [
      { label: "Visit Site", href: "https://vanessa-chat-app.netlify.app/" },
    ],
    href: "https://vanessa-chat-app.netlify.app/",
    image: "/images/chat-app.png",
    overview:
      "A Slack-style messaging app built to explore real-time communication at the protocol level, channels, group messaging, and live chat over Socket.io, plus peer-to-peer voice and video calls using WebRTC. I built it to get hands-on with signaling and real-time state sync, which don't come up in typical CRUD app work.",
    features: [
      "Channels and group messaging",
      "Real-time chat via Socket.io",
      "Voice and video calling",
      "WebRTC peer connection signaling",
      "Presence and reconnect handling",
    ],
    metrics: ["Real-time Messaging", "Voice & Video", "WebRTC Signaling"],
    challenges: [
      "Coordinating peer connections through the signaling server",
      "Handling users joining, leaving, and reconnecting without dropping calls",
      "Keeping message state in sync across multiple channels in real time",
    ],
    learned: [
      "Learned WebRTC signaling and peer connection lifecycle in depth.",
      "Improved my handling of real-time reconnect edge cases.",
    ],
  },
  {
    id: "kanban",
    title: "Real-Time Kanban Board",
    stack: ["React", "Socket.io", "JWT", "Node.js"],
    description:
      "Built a Trello-style task board with drag-and-drop, JWT authentication, and live multi-user synchronization.",
    image: "/images/kanban.png",
    overview:
      "A Trello-style task board for teams that need live multi-user collaboration, drag-and-drop task management where changes from one user appear instantly for everyone else on the board. I built it to practice real-time state synchronization across multiple connected clients, secured with JWT authentication.",
    features: [
      "Drag-and-drop task board",
      "Live multi-user sync via Socket.io",
      "JWT-based authentication",
      "Multiple boards and columns",
      "Instant updates across clients",
    ],
    metrics: ["Real-time Sync", "JWT Auth", "Multi-user Boards"],
    challenges: [
      "Avoiding conflicting updates when two users moved cards at the same time",
      "Keeping board state consistent across all connected clients",
      "Securing socket connections with JWT without adding noticeable latency",
    ],
    learned: [
      "Improved WebSocket state management for concurrent multi-user actions.",
      "Learned to secure real-time connections with token-based auth.",
    ],
  },
  {
    id: "booking",
    title: "Appointment Booking Platform",
    stack: ["React", "Node.js", "Express", "MongoDB", "Telegram Bot API"],
    description:
      "Built a multi-tenant booking platform with an auto-updating availability engine and instant Telegram alerts for every new booking.",
    links: [
      {
        label: "Visit Site",
        href: "https://vanessa-appointmentbooking.netlify.app/",
      },
    ],
    href: "https://vanessa-appointmentbooking.netlify.app/",
    image: "/images/booking.png",
    overview:
      "To reduce ongoing developer involvement, I built a self-service admin dashboard that enables staff to manage products, bookings, orders, site colors, typography, and other content without modifying code or requiring developer assistance.",
    features: [
      "Multi-tenant architecture",
      "Automatic availability engine",
      "Telegram booking notifications",
      "Admin dashboard per business",
      "Customer booking calendar",
    ],
    metrics: ["Multi-tenant", "Auto Availability", "Instant Alerts"],
    challenges: [
      "Isolating each business's schedule and data while sharing one system",
      "Auto-updating availability without double-booking conflicts",
      "Keeping Telegram notifications reliable under concurrent bookings",
    ],
    learned: [
      "Learned to isolate tenant data while keeping the scheduling engine reusable.",
      "Improved my approach to state management for real-time availability updates.",
    ],
  },
  {
    id: "ai-resume-builder",
    title: "AI Resume Builder",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Clerk", "PDFKit"],
    description:
      "Built an AI-powered resume builder that turns pasted career notes into a structured, typeset resume, rewritten by an LLM into clean, ATS-safe bullets and exported as a styled PDF.",
    links: [{ label: "Visit Site", href: "https://avi-ai-resume-builder.vercel.app" }],
    href: "https://avi-ai-resume-builder.vercel.app",
    gallery: [
      "/images/ai-resume-landing.png",
      "/images/ai-resume-history.png",
    ],
    overview:
      "Most resume builders make people manually format every line. This one takes the opposite approach. Paste in a rough LinkedIn export, an old resume, or just freeform notes, and an LLM extracts and rewrites the content into structured, ATS-optimized bullets, preserving every fact exactly as given while never inventing metrics. The result is stored in Postgres via Prisma, editable through a live preview, and exportable as a typeset PDF with a consistent color system shared between the web preview and the PDF itself.",
    features: [
      "Freeform text-to-structured-resume drafting via LLM",
      "Strict fact-preservation prompt, rewrites language, never invents details",
      "Live editor with instant preview",
      "Typeset PDF export with a matching visual identity",
      "Auth and per-user resume storage",
    ],
    metrics: ["LLM-Drafted Content", "PDF Export", "Full Auth + Storage"],
    challenges: [
      "Constraining the model to rewrite tone and structure without fabricating experience or metrics",
      "Keeping the PDF's visual design (color, type, layout) consistent with the in-browser preview",
      "Structuring resume data (experience, education, skills) relationally while keeping edits fast",
    ],
    learned: [
      "Learned to write system prompts that reliably separate 'rewriting' from 'inventing' for factual documents.",
      "Got hands-on with server-side PDF generation and its quirks inside a Next.js deployment.",
    ],
  },
];
