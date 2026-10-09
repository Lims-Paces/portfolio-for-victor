export const profile = {
  name: "Victor Adeyinka",
  firstName: "Victor",
  lastName: "Adeyinka",
  handle: "vicksticx",
  role: "Video Editor & AI Video Creator",
  bio: "Professional video editor & AI creator, crafting high-quality videos with Premiere Pro, After Effects, CapCut, DaVinci Resolve, and AI tools.",
  email: "vicksticx@gmail.com",
  whatsapp:
    "https://api.whatsapp.com/send?phone=2348122919345&text=" +
    encodeURIComponent(
      "Hi Victor, I saw your portfolio and I'd like to talk about a video project.",
    ),
  linktree: "https://linktr.ee/vicksticx",
};

export type SocialId = "whatsapp" | "email" | "instagram" | "linkedin" | "facebook";

export const socials: { id: SocialId; label: string; value: string; href: string }[] = [
  { id: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { id: "whatsapp", label: "WhatsApp", value: "+234 812 291 9345", href: profile.whatsapp },
  {
    id: "instagram",
    label: "Instagram",
    value: "@vicksticx_adeyinka",
    href: "https://instagram.com/vicksticx_adeyinka",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "victor-adeyinka",
    href: "https://www.linkedin.com/in/victor-adeyinka",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Victor Adeyinka",
    href: "https://www.facebook.com/share/1XVd9eoVnG/",
  },
];

export const tools = ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "AI tools"];

// Site copy. Kept short and plain on purpose: the videos do the talking.
export const copy = {
  hero: {
    statement: "I edit videos and make films with AI.",
    sub: "Health awareness videos, podcasts, product videos and event edits.",
  },
  spotlight: { label: "AI films", title: "AI Films", blurb: "Short scenes I made with AI tools." },
  work: { label: "Work", title: "Work" },
  about: {
    label: "About",
    title: "About",
    lead: "Hi, I'm Victor. I'm a video editor, and I also make short films with AI.",
    body: [
      "A lot of my work so far has been health awareness videos. I've also edited podcasts, product videos and events.",
      "If you have footage that needs editing, or an idea you want to see on screen, send me a message.",
    ],
  },
  contact: { line1: "Need a video?", line2: "Get in touch." },
};

export type CategoryId =
  | "ai-series"
  | "health"
  | "ai-health"
  | "podcast"
  | "product"
  | "events";

export type Category = {
  id: CategoryId;
  label: string;
  /** Hue (0-360) used to tint the title card shown when a video has no thumbnail. */
  hue: number;
};

export const categories: Category[] = [
  { id: "ai-series", label: "AI Films", hue: 22 },
  { id: "health", label: "Health Awareness", hue: 160 },
  { id: "ai-health", label: "AI Health Awareness", hue: 195 },
  { id: "podcast", label: "Podcast", hue: 275 },
  { id: "product", label: "Product", hue: 45 },
  { id: "events", label: "Events", hue: 340 },
];

export type Video = {
  /** Google Drive file id. To add a video, paste the id from its share link. */
  driveId: string;
  title: string;
  category: CategoryId;
  orientation: "portrait" | "landscape";
  /** Optional local thumbnail in /public. Falls back to Drive, then a title card. */
  poster?: string;
};

export const videos: Video[] = [
  // AI Movie Series
  {
    driveId: "1oX99hXs5pSwY7z_FZm_PS_o2atA8uwHx",
    title: "Message",
    category: "ai-series",
    orientation: "portrait",
    poster: "/thumbs/message.jpg",
  },
  {
    driveId: "18HgOxynqbn4PaDh0snr1KnpWiaNzjiWD",
    title: "Clean in Here",
    category: "ai-series",
    orientation: "portrait",
    poster: "/thumbs/clean-in-here.jpg",
  },
  {
    driveId: "1D4wf4-D3mB66hMSUaS-OD-FMVfdrrdjz",
    title: "Tea Split",
    category: "ai-series",
    orientation: "portrait",
    poster: "/thumbs/tea-split.jpg",
  },
  {
    driveId: "1H4_-1VvOBhxIGHkD4fC2c2xiLmNTGiP3",
    title: "Boardroom",
    category: "ai-series",
    orientation: "portrait",
    poster: "/thumbs/boardroom.jpg",
  },

  // Health Awareness
  { driveId: "17JMBoM5hRIZ_f6IVkCsGziO6_JO_DTxA", title: "World Ovarian Cancer Day", category: "health", orientation: "landscape" },
  { driveId: "1jx0b-2c9O8Dgy5hiyedBpEy7c6exjAp3", title: "Parkinson", category: "health", orientation: "landscape" },
  { driveId: "1nWNvDQOPEQleza8lekRJ4DFksJLMzj3s", title: "World Immunization Day", category: "health", orientation: "landscape" },
  { driveId: "1lz9xwW-0rE1su0YGilgEhXk8aa5Niv_B", title: "Malaria MHI", category: "health", orientation: "landscape" },
  { driveId: "10elYUy8amGeW60T-p_MYs8e327tM90bJ", title: "World Health Day", category: "health", orientation: "landscape" },
  { driveId: "1bM4e-sL_fF3gcgd3h6wfk9_lGPFO7PQd", title: "World Cancer Day 2026", category: "health", orientation: "landscape" },
  { driveId: "14u9aXjaqC_BltdbZ6eWYdgsMe6Z82UoR", title: "Tuberculosis", category: "health", orientation: "landscape" },

  // AI Health Awareness
  { driveId: "144Ob2ocAoc6JL1OyFiIbzlbBzWnMYHW6", title: "World Diabetes Day 2025", category: "ai-health", orientation: "landscape" },
  { driveId: "1k9c-mdYdbnGNFjHQ7osZtBGObxT6l-mw", title: "Choose Life, Not Smoke", category: "ai-health", orientation: "landscape" },
  { driveId: "1oVRJQbMhz68VYLr51-2zDoH0gD2Rrf5c", title: "Join NHI", category: "ai-health", orientation: "landscape" },
  { driveId: "19neDBO9WP4wn6CyFoFdtOh6wtlonUdzs", title: "Good Health, Good Christmas", category: "ai-health", orientation: "landscape" },
  { driveId: "1Qqv8yZTZBjsne7fMNYbV3rELhquKtNXn", title: "Wellness Wednesday", category: "ai-health", orientation: "landscape" },

  // Podcast
  { driveId: "1F4ON22QGnDINctDCe3ps2zXIib-HNqfs", title: "Bill Podcast 2", category: "podcast", orientation: "landscape" },

  // Product
  { driveId: "11XFon-8tb9inEsKW3q_1FUe4YRi5Gz-p", title: "Tom Marsh", category: "product", orientation: "landscape" },

  // Events
  { driveId: "1k2RDcaeu-1PumkWA8kB0CJxD8HfnTbeg", title: "121 Selah Opening Dance", category: "events", orientation: "landscape" },
  { driveId: "1lsqBHo-1E_rJPy_i6SNPWoN6g9lZYgjU", title: "Dubai LD", category: "events", orientation: "landscape" },
];

export const spotlightCategory: CategoryId = "ai-series";

export const driveEmbedUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const driveThumbUrl = (id: string, width = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
