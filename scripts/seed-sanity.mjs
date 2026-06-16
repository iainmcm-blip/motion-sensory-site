/**
 * Seed script for motion-sensory-site (project vlohz8nm).
 * Only seeds caseStudy and post documents.
 * Run with: node scripts/seed-sanity.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..');

const client = createClient({
  projectId: 'vlohz8nm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skCRfx1ceiVSXS6IImto5wxg0MPIV86tV8usYlc3GcBNeNlHhQe4BXghPVKpOpWR98Uymb0kLeSJvM6S6',
  useCdn: false,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

async function uploadImage(filename) {
  const filepath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`  ⚠  Missing: ${filename}`);
    return null;
  }
  const ext = path.extname(filename).slice(1).toLowerCase().replace('jpg', 'jpeg');
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
  console.log(`  ↑ Uploading ${filename}…`);
  const asset = await client.assets.upload('image', fs.createReadStream(filepath), {
    filename,
    contentType: mimeType,
  });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function deleteExisting(type) {
  const docs = await client.fetch(`*[_type == $type]._id`, { type });
  if (docs.length === 0) return;
  console.log(`  🗑  Deleting ${docs.length} existing ${type} doc(s)…`);
  const tx = client.transaction();
  docs.forEach(id => tx.delete(id));
  await tx.commit();
}

// ─── Case Studies ────────────────────────────────────────────────────────────

async function seedCaseStudies() {
  console.log('\n📁 Case Studies');
  await deleteExisting('caseStudy');

  const studies = [
    {
      client: 'Changi Airport',
      slug: { _type: 'slug', current: 'changi' },
      order: 1,
      heading: "Building the world's first airport scent identity.",
      subtitle: 'Olfactory Architecture',
      excerpt: "The world's first airport scent identity. A multi-sensory landscape where Orchid Tea transforms transit into memory and identity.",
      category: 'aviation',
      categoryLabel: 'Aviation & Infrastructure',
      cardStyle: 'large',
      featured: true,
      imageAlign: 'left',
      pageFile: 'portfolio-changi.html',
      stat1Value: '40%',
      stat1Label: 'Reduction in perceived stress',
      stat2Value: '+15–20%',
      stat2Label: 'Dwell time increase',
      heroImg: 'Changi Airport.png',
      listingImg: 'Changi Airport.png',
      logoImg: 'Changi white logo.png',
      bodyImgs: ['Changi Airport 2.png', 'Changi Airport 3.png', 'Changi Airport 4.png', 'Changi Airport Scent.png'],
    },
    {
      client: 'Aesop: Khronos',
      slug: { _type: 'slug', current: 'aesop' },
      order: 2,
      heading: 'Three immersive activations — a new sensory dimension in retail storytelling.',
      subtitle: 'Spatial Design · Immersive Storytelling',
      excerpt: 'New sensory dimensions in immersive storytelling. A spatial expression of skin through 15,000 hand-placed elements and curated scent.',
      category: 'retail',
      categoryLabel: 'Retail & Wellness',
      cardStyle: 'large',
      featured: false,
      imageAlign: 'right',
      pageFile: 'portfolio-aesop.html',
      stat1Value: '3.86M',
      stat1Label: 'Reach across earned media',
      stat2Value: '+28%',
      stat2Label: 'Sales uplift during activation',
      heroImg: 'Aesop 5.png',
      listingImg: 'Aesop 5.png',
      logoImg: 'Aesop white logo.png',
      bodyImgs: ['aesop-khronos.jpg', 'aesop-khronos-2.jpg', 'aesop-othertopias.png', 'aesop-othertopias-2.png', 'aesop-barthess.png', 'aesop-barthess-2.png'],
    },
    {
      client: 'Hilton',
      slug: { _type: 'slug', current: 'hilton' },
      order: 3,
      heading: "A multimedia journey through Hilton's storied history since 1919.",
      subtitle: 'Case Study — Hilton India',
      excerpt: 'A landmark exhibition where brand legacy meets innovation. Cinematic projection mapping and bespoke olfactory signatures for a century of hospitality.',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      cardStyle: 'compact',
      featured: false,
      imageAlign: 'left',
      icon: 'hotel',
      pageFile: 'portfolio-hilton.html',
      stat1Value: '9',
      stat1Label: 'Brand environments designed',
      stat2Value: '5',
      stat2Label: 'Senses engaged',
      heroImg: 'HIlton India 1.png',
      listingImg: 'HIlton India 1.png',
      logoImg: 'Hilton white Logo.png',
      bodyImgs: ['Hilton India 2.jpg', 'Hilton India 3.jpg', 'Hilton India 4.jpg', 'HIlton India 5.jpg', 'hilton-hotel-lobby.jpg'],
    },
    {
      client: 'UOB',
      slug: { _type: 'slug', current: 'uob' },
      order: 4,
      heading: 'Where eastern philosophy meets private banking.',
      subtitle: 'Scent Identity · Finance',
      excerpt: "Designing the olfactory presence of Southeast Asia's most trusted private bank — where trust is built through sensation.",
      category: 'finance',
      categoryLabel: 'Finance',
      cardStyle: 'compact',
      featured: false,
      imageAlign: 'right',
      icon: 'account_balance',
      pageFile: 'portfolio-uob.html',
      stat1Value: 'Multi-channel',
      stat1Label: 'Sensory engagement strategy',
      stat2Value: 'High intent',
      stat2Label: 'Audience curation',
      heroImg: 'uob-hero.png',
      listingImg: 'uob-hero.png',
      logoImg: 'uob-white-logo.png',
      bodyImgs: ['uob-2.png', 'uob-3.png', 'uob-4.png'],
    },
    {
      client: 'Singapore Airshow',
      slug: { _type: 'slug', current: 'airshow' },
      order: 5,
      heading: "Engineering the first olfactory identity for Asia's largest aerospace event.",
      subtitle: 'Event Scent Identity',
      excerpt: 'For the 10th edition of the Singapore Airshow, we composed "Timely" — a green, aquatic signature with cedarwood base that smells like the future of flight.',
      category: 'aviation',
      categoryLabel: 'Aviation',
      cardStyle: 'compact',
      featured: false,
      imageAlign: 'left',
      icon: 'flight',
      pageFile: 'portfolio-airshow.html',
      stat1Value: '3×',
      stat1Label: 'Diffusion density vs standard event',
      stat2Value: '10th',
      stat2Label: 'Edition milestone — first olfactory identity',
      heroImg: 'airshow-hero.png',
      listingImg: 'airshow-hero.png',
      logoImg: 'singapore-airshow-white.png',
      bodyImgs: ['airshow-2.png', 'airshow-3.png', 'airshow-4.png'],
    },
  ];

  for (const study of studies) {
    const { heroImg, listingImg, logoImg, bodyImgs, ...doc } = study;
    console.log(`\n  → ${doc.client}`);
    const [heroImage, listingImage, logo, ...bImgs] = await Promise.all([
      uploadImage(heroImg),
      uploadImage(listingImg),
      logoImg ? uploadImage(logoImg) : Promise.resolve(null),
      ...bodyImgs.map(f => uploadImage(f)),
    ]);
    const bodyImages = bImgs.filter(Boolean).map((img, i) => ({ ...img, _key: `bi${i}` }));
    await client.create({ _type: 'caseStudy', ...doc, heroImage, listingImage, ...(logo && { logo }), bodyImages });
    console.log(`  ✓ ${doc.client} created`);
  }
}

// ─── Journal Posts ────────────────────────────────────────────────────────────

async function seedJournalPosts() {
  console.log('\n📰 Journal Posts');
  await deleteExisting('post');

  const posts = [
    {
      title: 'The Business Case for Multisensory Alignment',
      slug: { _type: 'slug', current: 'multisensory-alignment' },
      publishedAt: '2025-09-15T09:00:00.000Z',
      excerpt: 'When sound, scent, and visual rhythm align, they create a liminal resonance that binds a consumer to a brand on a neurobiological level. Here is the commercial evidence.',
      category: 'Sensory Science',
      readTime: 8,
      featured: true,
      author: 'Juliana Mattar',
      coverImg: 'home-philosophy.jpg',
      body: [
        { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: "In the current landscape of digital-first interactions, the physical experience has become a rarity. This scarcity has transformed tactile and sensory touchpoints from functional requirements into high-value brand differentiators. When sound, scent, and visual rhythm align, they create a 'liminal resonance' that binds a consumer to a brand on a neurobiological level." }], markDefs: [] },
        { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Modern brands often suffer from sensory fragmentation. A luxury hotel may feature world-class architecture, yet be undermined by a generic audio atmosphere or an uncurated olfactory profile. Multisensory alignment is the process of synchronizing these disparate elements to forge a unified, atmospheric identity.' }], markDefs: [] },
        { _type: 'block', _key: 'b3', style: 'blockquote', children: [{ _type: 'span', _key: 's3', text: 'When every sense is engaged, your brand becomes more than just a memory of an interaction. It becomes a resonance, a feeling, an inspiration that people carry with them.' }], markDefs: [] },
      ],
    },
    {
      title: 'Olfactory Branding: Why Your Brand Needs a Signature Scent',
      slug: { _type: 'slug', current: 'olfactory-branding-signature-scent' },
      publishedAt: '2025-07-20T09:00:00.000Z',
      excerpt: 'Scent bypasses rational thought and speaks directly to emotion and memory. Brands that own a fragrance own a place in the mind of their customer.',
      category: 'Olfactory Design',
      readTime: 6,
      featured: false,
      author: 'Aaliyah Hamdoon',
      coverImg: 'Olfactory Branding.jpg',
      body: [
        { _type: 'block', _key: 'c1', style: 'normal', children: [{ _type: 'span', _key: 'cs1', text: "Consider the last time a smell transported you instantly to a specific place or moment. A hotel lobby, a grandmother's kitchen, a forest after rain. Scent bypasses the thalamus and connects directly to the limbic system, the seat of emotion and memory." }], markDefs: [] },
        { _type: 'block', _key: 'c2', style: 'blockquote', children: [{ _type: 'span', _key: 'cs2', text: 'Scent transforms perception — it makes luxury feel justified.' }], markDefs: [] },
      ],
    },
    {
      title: 'Sound as Architecture: How Sonic Design Shapes Space',
      slug: { _type: 'slug', current: 'sonic-design-shapes-space' },
      publishedAt: '2025-05-10T09:00:00.000Z',
      excerpt: "A room's acoustics are as much a design decision as its furniture. The brands that understand this are building experiences competitors cannot copy.",
      category: 'Experience Design',
      readTime: 5,
      featured: false,
      author: 'Juliana Mattar',
      coverImg: 'Sonic Branding.jpg',
      body: [
        { _type: 'block', _key: 'd1', style: 'normal', children: [{ _type: 'span', _key: 'ds1', text: 'Every space has an acoustic personality. Whether intentional or not, the sound environment of a retail store, hotel lobby, or airport terminal communicates something about the brand.' }], markDefs: [] },
        { _type: 'block', _key: 'd2', style: 'blockquote', children: [{ _type: 'span', _key: 'ds2', text: 'Sonic landscapes echo culture and mood. Music is more than background — it is the pulse of a space.' }], markDefs: [] },
      ],
    },
    {
      title: 'The Strategy of Stillness: Designing Negative Sensory Space',
      slug: { _type: 'slug', current: 'strategy-of-stillness' },
      publishedAt: '2025-03-01T09:00:00.000Z',
      excerpt: 'The most powerful sensory experiences often come from what is absent. Understanding sensory rest is as important as understanding sensory stimulation.',
      category: 'Brand Strategy',
      readTime: 7,
      featured: false,
      author: 'Aaliyah Hamdoon',
      coverImg: 'home-philosophy.jpg',
      body: [
        { _type: 'block', _key: 'e1', style: 'normal', children: [{ _type: 'span', _key: 'es1', text: 'There is a particular kind of luxury that expresses itself through restraint. The scent that is barely there. The music that resolves to silence. The space that asks nothing of you. This is not absence — it is negative space, deliberately designed.' }], markDefs: [] },
        { _type: 'block', _key: 'e2', style: 'blockquote', children: [{ _type: 'span', _key: 'es2', text: 'The most sophisticated sensory environments know when to stop.' }], markDefs: [] },
      ],
    },
  ];

  for (const post of posts) {
    const { coverImg, ...doc } = post;
    console.log(`\n  → ${doc.title}`);
    const coverImage = await uploadImage(coverImg);
    await client.create({ _type: 'post', ...doc, coverImage });
    console.log(`  ✓ "${doc.title}" created`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding Sanity — Motion Sensory Site (vlohz8nm)\n');
  try {
    await seedCaseStudies();
    await seedJournalPosts();
    console.log('\n✅ All content seeded successfully!\n');
  } catch (err) {
    console.error('\n❌ Seed error:', err.message || err);
    process.exit(1);
  }
}

main();
