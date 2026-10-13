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
  { id: "whatsapp", label: "WhatsApp", value: "Chat on WhatsApp", href: profile.whatsapp },
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
    statement: "I'm a video editor and AI video creator.",
    sub: "I edit podcasts, movie recaps, kids' videos, motivational videos, health awareness campaigns, real estate, events and more.",
  },
  work: { label: "Work", title: "Work", blurb: "Pick a category to see the videos." },
  about: {
    label: "About",
    title: "About",
    lead: "Hi, I'm Victor. I'm a video editor and AI video creator.",
    body: [
      "I edit for YouTube channels including Dr Paul's Health Tips, Kiddies Fun Club, The Rise of the Eternal Warriors and The Prime Motion Studios. I've also worked on health awareness campaigns, real estate and events.",
      "If you have footage that needs editing, or an idea you want to see on screen, get in touch.",
    ],
  },
  contact: { line1: "Need a video?", line2: "Get in touch." },
};

export type Category = {
  /** Also the page address: /work/<slug>. */
  slug: string;
  label: string;
  /** Hue (0-360) used to tint cards that have no thumbnail. */
  hue: number;
};

// The order on the site comes from the videos list below, not from this list.
const categoryList = [
  { slug: "ai-films", label: "AI Films", hue: 22 },
  { slug: "events", label: "Events", hue: 340 },
  { slug: "health-awareness", label: "Health Awareness", hue: 160 },
  { slug: "kids", label: "Kids", hue: 50 },
  { slug: "motivation", label: "Motivation", hue: 5 },
  { slug: "podcasts", label: "Podcasts", hue: 275 },
  { slug: "real-estate", label: "Real Estate", hue: 95 },
  { slug: "movie-recaps", label: "Movie Recaps", hue: 240 },
] as const satisfies readonly Category[];

export type CategorySlug = (typeof categoryList)[number]["slug"];

export type Video = {
  /** Where the video is hosted, and its id there (from the share link). */
  source: "youtube" | "tiktok" | "drive";
  id: string;
  /** TikTok only: the account that posted it, used to link to the original. */
  handle?: string;
  title: string;
  category: CategorySlug;
  /** The channel or client the video was edited for. */
  client?: string;
  orientation: "portrait" | "landscape";
  /** Optional local thumbnail in /public. */
  poster?: string;
  /** True when the video was made with AI. Wrap a video in ai(...) below to set it. */
  ai?: boolean;
};

const yt = (id: string, title: string, category: CategorySlug, client: string): Video => ({
  source: "youtube",
  id,
  title,
  category,
  client,
  orientation: "landscape",
});

const drive = (
  id: string,
  title: string,
  category: CategorySlug,
  extra: Partial<Video> = {},
): Video => ({ source: "drive", id, title, category, orientation: "landscape", ...extra });

// TikTok thumbnails expire, so each one is saved in /public/thumbs and passed as the poster.
const tt = (
  id: string,
  title: string,
  category: CategorySlug,
  poster: string,
  orientation: Video["orientation"] = "portrait",
): Video => ({
  source: "tiktok",
  id,
  handle: "myhealthintegral",
  title,
  category,
  client: MHI,
  orientation,
  poster: `/thumbs/${poster}.jpg`,
});

/** Marks a video as made with AI, which puts it in the "Made with AI" group on its page. */
const ai = (video: Video): Video => ({ ...video, ai: true });

const MHI = "My Health Integral";
const DR_PAUL = "Dr Paul's Health Tips";
const KIDDIES = "Kiddies Fun Club";
const WARRIORS = "The Rise of the Eternal Warriors";
const PRIME_MOTION = "The Prime Motion Studios";

export const videos: Video[] = [
  // Real Estate
  drive("1PXQ7JjGC3XNaopUVk_ZhF0w3ZMfQyeUT", "Dubai LD", "real-estate", { orientation: "portrait", poster: "/thumbs/dubai-ld.jpg" }),
  ai(drive("1FKXoHOyV0uzNtKx509oRbi8v1_ymBVpD", "Palm Residence", "real-estate", { orientation: "portrait", poster: "/thumbs/palm-residence.jpg" })),

  // Health Awareness
  drive("1TZFFIx2ZUUckeleJAImfvTkZltKGQ7Fi", "Parkinson", "health-awareness", { client: MHI, orientation: "portrait", poster: "/thumbs/parkinson.jpg" }),
  ai(tt("7584006879131716871", "Choose Life, Not Smoke", "health-awareness", "choose-life-not-smoke", "landscape")),
  ai(tt("7632681859368881416", "Malaria MHI", "health-awareness", "malaria-mhi")),
  tt("7637532644720299271", "World Ovarian Cancer Day", "health-awareness", "world-ovarian-cancer-day"),
  ai(drive("1V4K48EFbpKmMCQ18E6r41H6IMRIM3G5g", "Postpartum", "health-awareness", { orientation: "portrait", poster: "/thumbs/postpartum.jpg" })),
  tt("7634652550020549895", "World Immunization Day", "health-awareness", "world-immunization-day"),
  tt("7626090121485421842", "World Health Day", "health-awareness", "world-health-day"),
  tt("7602917085009726738", "World Cancer Day 2026", "health-awareness", "world-cancer-day-2026"),
  tt("7620883940231908629", "Tuberculosis", "health-awareness", "tuberculosis"),
  ai(tt("7592909175248768264", "Join MHI", "health-awareness", "join-mhi")),
  ai(tt("7588083659601677576", "Good Health, Good Christmas", "health-awareness", "good-health-good-christmas")),

  // Events
  drive("1GMbdxK56ly0pjQ1Cs8Q88rOfjSdgx-xC", "121 Selah Opening Dance", "events", { orientation: "portrait", poster: "/thumbs/121-selah.jpg" }),

  // AI Films
  ai(drive("1D4wf4-D3mB66hMSUaS-OD-FMVfdrrdjz", "Tea Split", "ai-films", { orientation: "portrait", poster: "/thumbs/tea-split.jpg" })),
  ai(drive("1oX99hXs5pSwY7z_FZm_PS_o2atA8uwHx", "Message", "ai-films", { orientation: "portrait", poster: "/thumbs/message.jpg" })),
  ai(drive("1Q3tvyTBvi9nHJJLdaAb6C2layIuWsx_3", "I Knew Your Father", "ai-films", { orientation: "portrait", poster: "/thumbs/i-knew-your-father.jpg" })),
  ai(drive("18HgOxynqbn4PaDh0snr1KnpWiaNzjiWD", "Clean in Here", "ai-films", { orientation: "portrait", poster: "/thumbs/clean-in-here.jpg" })),
  ai(drive("1HZeQvhV3YNouAebH--NmU7kG3jN51Uwq", "Clean Flashback", "ai-films", { orientation: "portrait", poster: "/thumbs/clean-flashback.jpg" })),
  ai(drive("1a7DFbRAHJ3YERrNZ8QDffJU7dtkbNQ3n", "Burial Flashback", "ai-films", { orientation: "portrait", poster: "/thumbs/burial-flashback.jpg" })),
  ai(drive("1H4_-1VvOBhxIGHkD4fC2c2xiLmNTGiP3", "Boardroom", "ai-films", { orientation: "portrait", poster: "/thumbs/boardroom.jpg" })),
  ai(drive("1YV5HS2a6yue5JssNZ2L9Ygm0sAWksVLW", "Arrest", "ai-films", { orientation: "portrait", poster: "/thumbs/arrest.jpg" })),

  // Kids
  ai(yt("k_ceGTlAVz8", "Soccer Tournament Song & Play Pretend Animals", "kids", KIDDIES)),
  ai(yt("ABpsnEEHeKg", "Hurry! The School Bus Is Here!", "kids", KIDDIES)),
  ai(yt("K8zX97923Ks", "Can You Make All 12 Animal Sounds?", "kids", KIDDIES)),
  ai(yt("ikHvp1CGvDo", "The Hare Laughed at the Tortoise", "kids", KIDDIES)),

  // Motivation
  yt("KXmDn_SZ0Fo", "You're Boring", "motivation", WARRIORS),
  yt("ppZsvcebNNY", "Don't Waste the Rest of This Year", "motivation", WARRIORS),
  yt("RX6nPl-9muQ", "Watch This Before You Trust Anyone Again", "motivation", WARRIORS),
  yt("JFDyvAfZvcQ", "The Greatest Regret", "motivation", WARRIORS),
  yt("m7wRxdk04U4", "The Greatest Regret (2)", "motivation", WARRIORS),

  // Podcasts
  ai(yt("IOz2C-Is35A", "Baby Movements", "podcasts", DR_PAUL)),
  ai(yt("tXIawVubHRI", "Your Body Is Changing During Pregnancy", "podcasts", DR_PAUL)),
  ai(yt("JlHSgRQ6ZfM", "Food During Pregnancy", "podcasts", DR_PAUL)),
  ai(yt("4FhM0QYgjNU", "Pregnant With Twins?", "podcasts", DR_PAUL)),
  ai(yt("7DmDhhClb-M", "Why Is Pregnancy Changing My Skin, Nose, Taste and Memory?", "podcasts", DR_PAUL)),
  ai(drive("1F4ON22QGnDINctDCe3ps2zXIib-HNqfs", "Bill Podcast 2", "podcasts")),

  // Movie Recaps
  yt("WJr4hqzRC7A", "The Transporter", "movie-recaps", PRIME_MOTION),
  yt("D0eVYFB5Jds", "Van Helsing", "movie-recaps", PRIME_MOTION),
  yt("e7l4bgJrMWY", "Fantastic Four", "movie-recaps", PRIME_MOTION),
  yt("VTTgwAO-p_E", "Blade II", "movie-recaps", PRIME_MOTION),
];

/**
 * Categories in the order their first video appears in the list above. To reorder the
 * site, move a category's block of videos up or down; videos show in the order listed.
 */
export const categories: Category[] = [...categoryList].sort(
  (a, b) =>
    videos.findIndex((v) => v.category === a.slug) - videos.findIndex((v) => v.category === b.slug),
);

export const videosIn = (slug: string) => videos.filter((v) => v.category === slug);

export const driveThumbUrl = (id: string, width = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

const hosts = {
  youtube: {
    name: "YouTube",
    embed: (v: Video) => `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`,
    watch: (v: Video) => `https://www.youtube.com/watch?v=${v.id}`,
  },
  tiktok: {
    name: "TikTok",
    embed: (v: Video) => `https://www.tiktok.com/player/v1/${v.id}?autoplay=1&rel=0`,
    watch: (v: Video) => `https://www.tiktok.com/@${v.handle}/video/${v.id}`,
  },
  drive: {
    name: "Google Drive",
    embed: (v: Video) => `https://drive.google.com/file/d/${v.id}/preview`,
    watch: (v: Video) => `https://drive.google.com/file/d/${v.id}/view`,
  },
};

export const hostName = (v: Video) => hosts[v.source].name;
export const embedUrl = (v: Video) => hosts[v.source].embed(v);
export const watchUrl = (v: Video) => hosts[v.source].watch(v);

/** A still for the video, or null when it has none yet (a Drive file that isn't shared). */
export const thumbUrl = (v: Video, playable: boolean) =>
  v.poster ??
  (v.source === "youtube"
    ? `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`
    : v.source === "drive" && playable
      ? driveThumbUrl(v.id)
      : null);
