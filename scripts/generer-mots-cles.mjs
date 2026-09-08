/**
 * Génère un BROUILLON de src/data/mots-cles.ts pour un site satellite, depuis
 * le registre de motifs (seo-keywords-satellites.json) et le registre de
 * vérité du site (src/data/verite.ts).
 *
 *   node scripts/generer-mots-cles.mjs ../boxing-center-muret
 *
 * Le résultat est écrit dans <site>/src/data/mots-cles.genere.ts et doit être
 * RELU avant de remplacer mots-cles.ts : on garde 3 à 5 prioritaires et 8 à 15
 * secondaires par page. Un registre de 60 motifs par page n'est pas du SEO,
 * c'est du bruit — et le contrôle de build vérifie chaque prioritaire dans le
 * texte visible, donc chaque motif gardé est une promesse d'écriture.
 *
 * Le script ne lit pas TypeScript : il extrait par expressions régulières
 * villeOrigine, secteur, gentilé, les communes, les clubs et les familles
 * d'offres, comme build-images.mjs lit le manifeste média.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = dirname(fileURLToPath(import.meta.url));
const CANDIDATS = [join(ICI, '..', 'seo-keywords-satellites.json'), join(ICI, 'seo-keywords-satellites.json'), join(ICI, '..', '..', 'seo-keywords-satellites.json')];
const cheminRegistre = CANDIDATS.find((p) => existsSync(p));
if (!cheminRegistre) {
  console.error('Registre seo-keywords-satellites.json introuvable (dépôt du site ou racine Deployment).');
  process.exit(1);
}
const REGISTRE = JSON.parse(readFileSync(cheminRegistre, 'utf8'));

const site = resolve(process.argv[2] ?? '.');
const verite = join(site, 'src', 'data', 'verite.ts');
const offres = join(site, 'src', 'data', 'offres.ts');
const motsCles = join(site, 'src', 'data', 'mots-cles.ts');
for (const f of [verite, offres]) {
  if (!existsSync(f)) {
    console.error(`Introuvable : ${f}`);
    process.exit(1);
  }
}

const src = readFileSync(verite, 'utf8');
const prendre = (re, defaut = '') => src.match(re)?.[1] ?? defaut;

const ville = prendre(/villeOrigine:\s*'([^']+)'/);
const secteur = existsSync(motsCles) ? readFileSync(motsCles, 'utf8').match(/secteur:\s*'([^']+)'/)?.[1] ?? '' : '';
const clubs = [...src.matchAll(/nomCourt:\s*'([^']+)'/g)].map((m) => m[1]);
const acces = [...src.matchAll(/acces:\s*'([^']+)'/g)].map((m) => m[1]);
const communes = [...src.matchAll(/\{\s*nom:\s*'([^']+)',\s*cp:/g)].map((m) => m[1]);
const familles = new Set([...readFileSync(offres, 'utf8').matchAll(/famille:\s*'([^']+)'/g)].map((m) => m[1]));

if (!ville) {
  console.error('villeOrigine introuvable dans verite.ts');
  process.exit(1);
}

/** Remplit les fentes d'un motif ; renvoie une liste (une par commune si {commune}). */
function instancier(motif, commune) {
  return motif
    .replace(/\{ville\}/g, ville)
    .replace(/\{commune\}/g, commune ?? ville)
    .replace(/\{secteur\}/g, secteur || 'agglomération toulousaine')
    .replace(/\{club\}/g, clubs[0] ?? 'Boxing Center')
    .replace(/\{transport\}/g, acces[0] ?? '')
    .replace(/\{sortie\}/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Une page n'existe que si le club publie la famille correspondante. */
const pageExiste = (page) => {
  if (page.includes('kick-boxing')) return familles.has('kick-boxing') || familles.has('thai');
  if (page.includes('boxing-fitness')) return familles.has('femme') || familles.has('fitness') || familles.has('physique');
  if (page.includes('mma')) return familles.has('mma') || familles.has('grappling');
  return true;
};

const parPage = new Map();
const ajouter = (page, role, motif) => {
  if (!motif || motif.includes('{')) return;
  const p = page.split(/\s*\/\s*|\s+ou\s+/)[0].trim();
  if (!parPage.has(p)) parPage.set(p, { prioritaires: new Set(), secondaires: new Set() });
  parPage.get(p)[role === 'prioritaire' ? 'prioritaires' : 'secondaires'].add(motif);
};

// 1 — les motifs imposés par le brief : ville ET communes
for (const m of REGISTRE.motifs_imposes_par_le_brief.liste) {
  if (!pageExiste(m.page)) continue;
  ajouter(m.page, m.role, instancier(m.motif));
  for (const v of m.variantes ?? []) ajouter(m.page, 'secondaire', instancier(v));
  for (const c of communes) ajouter(`commune:${c}`, 'prioritaire', instancier(m.motif.replace('{ville}', '{commune}'), c));
}

// 2 — les motifs élargis
for (const [nom, bloc] of Object.entries(REGISTRE.motifs_elargis)) {
  if (!bloc.liste || nom === 'images') continue;
  if (!pageExiste(bloc.page)) continue;
  for (const motif of bloc.liste) {
    if (motif.includes('{commune}')) {
      for (const c of communes) ajouter(`commune:${c}`, bloc.role === 'prioritaire' ? 'prioritaire' : 'secondaire', instancier(motif, c));
    } else {
      ajouter(bloc.page, bloc.role === 'prioritaire' ? 'prioritaire' : 'secondaire', instancier(motif));
    }
  }
}

// 3 — écriture du brouillon
const lignes = [
  '/**',
  ` * BROUILLON généré le ${new Date().toISOString().slice(0, 10)} par scripts/generer-mots-cles.mjs`,
  ` * depuis seo-keywords-satellites.json pour ${ville} (${clubs.join(', ')}).`,
  ' *',
  ' * À RELIRE ET À COUPER : 3 à 5 prioritaires, 8 à 15 secondaires par page.',
  ' * Chaque prioritaire gardé est vérifié au build dans le texte visible.',
  ' */',
  '',
  "import type { RouteId } from './routes';",
  '',
  'export type Cluster = { page: string; prioritaires: readonly string[]; secondaires: readonly string[] };',
  '',
  'export const CLUSTERS_GENERES: readonly Cluster[] = [',
];
for (const [page, { prioritaires, secondaires }] of parPage) {
  lignes.push('  {');
  lignes.push(`    page: '${page}',`);
  lignes.push(`    prioritaires: [${[...prioritaires].map((m) => `'${m.replace(/'/g, '\\u2019')}'`).join(', ')}],`);
  lignes.push(`    secondaires: [${[...secondaires].map((m) => `'${m.replace(/'/g, '\\u2019')}'`).join(', ')}],`);
  lignes.push('  },');
}
lignes.push('];', '');

const sortie = join(site, 'src', 'data', 'mots-cles.genere.ts');
writeFileSync(sortie, lignes.join('\n'), 'utf8');

let total = 0;
for (const [page, { prioritaires, secondaires }] of parPage) {
  total += prioritaires.size + secondaires.size;
  console.log(`  ${page.padEnd(28)} ${String(prioritaires.size).padStart(3)} prioritaires  ${String(secondaires.size).padStart(3)} secondaires`);
}
console.log(`\n  ${total} motifs pour ${ville} → ${sortie.replace(site, '.')}\n  Relire, couper, puis remplacer mots-cles.ts.\n`);
