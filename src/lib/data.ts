export const site = {
  name: "Sumting Blue",
  tagline: "Jazz standards, pop anthems, and everything blue in between.",
  // TODO: swap in the band's real booking email
  email: "sumtingblue@gmail.com",
  instagram: "https://www.instagram.com/sumtingblue",
  instagramHandle: "@sumtingblue",
};

export type Member = {
  name: string;
  instrument: string;
  favoriteSong: string;
  favoriteMemory: string;
  image: string;
};

export const memberQuestions = {
  favoriteSong: "What's your favorite jazz song (or any song)?",
  favoriteMemory: "What's your favorite memory at Sumting Blue?",
};

// Answers below are placeholders — replace with each member's real
// answers via the /admin page (or edit here and re-run `npm run db:seed`).
export const members: Member[] = [
  { name: "Malka", instrument: "Keys", favoriteSong: "Misty — Ella Fitzgerald", favoriteMemory: "Our first full-band rehearsal finally sounding like a band.", image: "/images/malka.png" },
  { name: "Alexis", instrument: "Vocals", favoriteSong: "At Last — Etta James", favoriteMemory: "The crowd singing the last chorus back at us.", image: "/images/alexis.png" },
  { name: "Naomi", instrument: "Vocals", favoriteSong: "Dreams — Fleetwood Mac", favoriteMemory: "Post-show boba runs, every single time.", image: "/images/naomi.png" },
  { name: "Ronyn", instrument: "Vocals", favoriteSong: "Die with a Smile — Lady Gaga & Bruno Mars", favoriteMemory: "Nailing the three-part harmony we'd been fighting for weeks.", image: "/images/ronyn.png" },
  { name: "Ansel", instrument: "Bass", favoriteSong: "Just the Two of Us — Bill Withers", favoriteMemory: "Locking in with the drums for the first time.", image: "/images/ansel.png" },
  { name: "Ranga", instrument: "Electric Guitar", favoriteSong: "Smooth Operator — Sade", favoriteMemory: "The impromptu jam that became our encore.", image: "/images/ranga.png" },
  { name: "Tyler", instrument: "Guitar / Drums", favoriteSong: "Iris — Goo Goo Dolls", favoriteMemory: "Switching from guitar to drums mid-set on a dare.", image: "/images/tyler.png" },
  { name: "Max", instrument: "Trumpet", favoriteSong: "I Want You Back — The Jackson 5", favoriteMemory: "The first time the horn section actually hit together.", image: "/images/max.png" },
  { name: "Ellie", instrument: "Violin", favoriteSong: "Mia & Sebastian's Theme — Justin Hurwitz", favoriteMemory: "Sound-checking in an empty hall at golden hour.", image: "/images/ellie.png" },
  { name: "Maya", instrument: "Saxophone", favoriteSong: "Careless Whisper (obviously)", favoriteMemory: "Every single time someone requests Careless Whisper.", image: "/images/maya.png" },
  { name: "London", instrument: "Drums", favoriteSong: "Isn't She Lovely — Stevie Wonder", favoriteMemory: "Winter show, final song, lights down.", image: "/images/london.png" },
];

export type Genre = "Jazz" | "Pop" | "Soul" | "Film" | "Party";

export type Song = {
  title: string;
  artist: string;
  genre: Genre;
  featured?: boolean;
  note?: string;
};

export const genres: Genre[] = ["Jazz", "Pop", "Soul", "Film", "Party"];

export const songs: Song[] = [
  { title: "From the Start", artist: "Laufey", genre: "Jazz", featured: true, note: "The one that started it all — bossa nova with bite." },
  { title: "Dreams", artist: "Fleetwood Mac", genre: "Pop", featured: true, note: "Three-part harmonies, full-band groove." },
  { title: "I Want You Back", artist: "The Jackson 5", genre: "Party", featured: true, note: "Horns up. Nobody stands still for this one." },
  { title: "Lover Girl", artist: "Laufey", genre: "Jazz", featured: true, note: "Swing feel, string features, pure charm." },
  { title: "Everything Happens to Me", artist: "Samara Joy", genre: "Jazz", featured: true, note: "A slow-burn standard for the quiet moments." },
  { title: "Kiss Me", artist: "Sixpence None The Richer", genre: "Pop" },
  { title: "Iris", artist: "Goo Goo Dolls", genre: "Pop" },
  { title: "Just the Two of Us", artist: "Bill Withers & Grover Washington Jr.", genre: "Soul" },
  { title: "The Girl from Ipanema", artist: "João Gilberto & Stan Getz", genre: "Jazz" },
  { title: "Put Your Records On", artist: "Corinne Bailey Rae", genre: "Soul" },
  { title: "Smooth Operator", artist: "Sade", genre: "Soul" },
  { title: "So Easy (To Fall in Love)", artist: "Olivia Dean", genre: "Soul" },
  { title: "At Last", artist: "Etta James", genre: "Soul" },
  { title: "Isn't She Lovely", artist: "Stevie Wonder", genre: "Soul" },
  { title: "Christmas Time Is Here", artist: "Vince Guaraldi Trio", genre: "Jazz" },
  { title: "I Wanna Dance with Somebody", artist: "Whitney Houston", genre: "Party" },
  { title: "Misty", artist: "Ella Fitzgerald", genre: "Jazz" },
  { title: "Don't Know Why", artist: "Norah Jones", genre: "Jazz" },
  { title: "Girls Just Wanna Have Fun", artist: "Cyndi Lauper", genre: "Party" },
  { title: "Can't Take My Eyes Off You", artist: "Frankie Valli", genre: "Pop" },
  { title: "City of Stars", artist: "La La Land", genre: "Film" },
  { title: "Nomad", artist: "Clairo", genre: "Pop" },
  { title: "My Love Mine All Mine", artist: "Mitski", genre: "Pop" },
  { title: "I Don't Want to Miss a Thing", artist: "Aerosmith", genre: "Pop" },
  { title: "Mia & Sebastian's Theme", artist: "Justin Hurwitz", genre: "Film" },
  { title: "Die with a Smile", artist: "Lady Gaga & Bruno Mars", genre: "Pop" },
  { title: "Dancing Queen", artist: "ABBA", genre: "Party" },
  { title: "Don't Stop Believin'", artist: "Journey", genre: "Party" },
];

export type Video = {
  title: string;
  caption: string;
  // Paste any YouTube link here — regular (youtube.com/watch?v=...),
  // short (youtu.be/...), or Shorts (youtube.com/shorts/...) all work.
  // Leave empty ("") to show a "tape coming soon" placeholder.
  url: string;
};

// To add a clip: copy one of the blocks below, paste your YouTube link
// into `url`, and give it a title + caption. That's it.
export const videos: Video[] = [
  {
    title: "UCLA Showcase",
    caption: "Full-band concert recording",
    url: "",
  },
  {
    title: "From the Start",
    caption: "Laufey cover — concert recording",
    url: "",
  },
];

// Accepts watch?v=, youtu.be/, shorts/, embed/, and live/ URL shapes.
export function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|v=|shorts\/|embed\/|live\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

export type Milestone = {
  date: string;
  title: string;
  body: string;
};

export type SiteInfo = typeof site;

// The full editable content of the website. This shape is what lives in
// MongoDB and what the /admin editor modifies. Design stays in the code;
// only this content changes.
export type Content = {
  site: SiteInfo;
  members: Member[];
  songs: Song[];
  videos: Video[];
  milestones: Milestone[];
};

export const milestones: Milestone[] = [
  {
    date: "September 2025",
    title: "Two freshmen, one idea",
    body: "Sumting Blue starts as a two-person project in a UCLA dorm — a shared love of Laufey, old standards, and pop that swings.",
  },
  {
    date: "Fall 2025",
    title: "First gig",
    body: "A campus showcase turns a duo into a band. Friends of friends bring horns, strings, and three voices.",
  },
  {
    date: "Winter 2026",
    title: "Eleven strong",
    body: "The lineup settles at eleven — freshmen through grad students — with a book of songs spanning Ella Fitzgerald to ABBA.",
  },
  {
    date: "Spring 2026",
    title: "Around town",
    body: "UCLA events, local venues, parties, private events. If there's a stage (or a living room), we'll play it.",
  },
  {
    date: "Today",
    title: "Booking now",
    body: "Writing arrangements, adding songs, and looking for the next room to fill. That could be yours.",
  },
];
