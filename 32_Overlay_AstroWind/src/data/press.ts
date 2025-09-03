export interface PressData {
  name: string;
  heroImage: string;
  headshots: { url: string; caption?: string }[];
  bios: { short: string; medium: string; long: string };
  contacts?: { label: string; url: string }[];
  downloadPressKit?: string; // Path under /public (e.g. /press/Bree-Lowdermilk-PressKit.zip)
  sameAs?: string[]; // social/profile URLs
}

const press: PressData = {
  name: "Bree Lowdermilk",
  // This path matches the normalized filename produced by the image normalizer.
  heroImage: "/images/gallery/bree-piano-whatttt.png",
  headshots: [
    { url: "/images/press/bree-headshot-picsart-aiimageenhancer.jpg", caption: "Headshot (hi-res)" },
    { url: "/images/press/bree-lowdermilk-headshot-low-res-copy.jpg", caption: "Headshot (alt)" }
  ],
  bios: {
    short: "Bree Lowdermilk is a songwriter and composer known for contemporary musical theatre anthems and intimate story songs.",
    medium: "Bree Lowdermilk is a songwriter and composer whose work spans contemporary musical theatre, cabaret, and studio projects. Their songs are known for soaring melodies, emotional clarity, and vocalist‑friendly ranges, with widely performed pieces such as ‘Run Away With Me’ and ‘My Party Dress.’",
    long: "Bree Lowdermilk is a songwriter and composer creating contemporary musical theatre and cross‑genre works. Collaborating frequently with lyricist Kait Kerrigan, Bree’s catalog includes fan‑favorite audition and concert repertoire as well as original works for stage and recordings. Their music centers vocal storytelling, clear dramatic stakes, and singable ranges, with arrangements that adapt easily for teaching studios and live performance. Current projects include new works for stage and recordings, alongside performances with longtime collaborators."
  },
  contacts: [
    { label: "General Inquiries", url: "mailto:press@example.com" }
  ],
  // Place a ZIP at public/press/Bree-Lowdermilk-PressKit.zip in your Astro project to enable this
  downloadPressKit: "/press/Bree-Lowdermilk-PressKit.zip",
  sameAs: []
};

export default press;

