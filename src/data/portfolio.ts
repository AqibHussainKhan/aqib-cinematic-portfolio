export const profile = {
  name: "Aqib Hussain",
  email: "aqib.n2742@gmail.com",
  github: "https://github.com/AqibHussainKhan",
  linkedin: "https://www.linkedin.com/in/aqib-hussain-khan-b92311408/",
  location: "Mailsi, Pakistan",
};

export const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Expertise", "expertise"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
] as const;

export const skillRows = [
  [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Responsive UI",
    "Git",
    "GitHub",
  ],
  [
    "Supabase",
    "Local Storage",
    "REST APIs",
    "UI Animation",
    "DOM",
    "Vite",
    "VS Code",
    "UI Layouts",
    "MS Office",
  ],
];

export const expertise = [
  {
    title: "Frontend Development",
    description:
      "Responsive, accessible interfaces built around clean components and thoughtful details.",
    stack: "React + Tailwind",
    tools: "TypeScript / CSS / HTML",
    code: "</>",
  },
  {
    title: "Application Development",
    description:
      "Turning everyday workflows into clear dashboards, useful tools and connected experiences.",
    stack: "State + Interfaces",
    tools: "Forms / Navigation / Data",
    code: "{ }",
  },
  {
    title: "Data & Integration",
    description:
      "Connecting interfaces to authentication, application data and persistent browser storage.",
    stack: "Supabase + APIs",
    tools: "Auth / Storage / Records",
    code: "[ ]",
  },
  {
    title: "Motion & Interaction",
    description:
      "Scroll-driven storytelling, precise transitions and subtle movement that make interfaces feel alive.",
    stack: "CSS + JavaScript",
    tools: "Scroll / Motion / Performance",
    code: "↗",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  features: string[];
  live?: string;
};

export const projects: Project[] = [
  {
    id: "medicore",
    title: "MediCore Hospital System",
    category: "Dashboard & Operations",
    description:
      "A connected hospital interface for patient records, appointments, departments and daily administration.",
    tags: ["React", "TypeScript", "Supabase"],
    features: [
      "Patient search, details and record editing.",
      "Responsive sidebar, dashboard and department pages.",
      "Authentication and consistent light and dark interfaces.",
    ],
  },
  {
    id: "lab",
    title: "Gutham Lab Attendance",
    category: "Attendance & Persistence",
    description:
      "A glass-inspired lab workspace with check-in, check-out and attendance history saved in the browser.",
    tags: ["JavaScript", "Tailwind", "Local Storage"],
    features: [
      "Check-in and check-out with session history.",
      "Browser storage that keeps records after a refresh.",
      "A responsive dashboard designed for everyday use.",
    ],
    live: "https://aqibhussainkhan.github.io/gutham-lab-portal/",
  },
  {
    id: "portfolio",
    title: "The Cinematic Portfolio",
    category: "Creative Development",
    description:
      "A personal portfolio shaped around a rotating portrait, scroll-linked storytelling and quiet, considered motion.",
    tags: ["React", "TypeScript", "CSS"],
    features: [
      "A scroll-scrubbed portrait turntable and changing hero titles.",
      "Animated technology strips and interactive root cards.",
      "Project dialogs, a keyboard-friendly carousel and a live contact preview.",
    ],
    live: "#home",
  },
  {
    id: "javascript",
    title: "JavaScript UI Experiments",
    category: "Interaction & Learning",
    description:
      "A collection of focused exercises in DOM updates, form interactions, calculators and synchronized sliders.",
    tags: ["JavaScript", "HTML", "CSS"],
    features: [
      "Synchronized slider images, titles and descriptions.",
      "Interactive form and calculator exercises.",
      "Practical explorations of state, events and the DOM.",
    ],
  },
];
