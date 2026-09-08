/**
 * CONTRÔLE QUALITÉ du build — générique pour toute la famille de sites.
 *
 * Il ne connaît rien du site en dur : il lit `src/data/verite.ts`,
 * `routes.ts`, `mots-cles.ts` et `medias.ts`. Le même fichier sert aux six
 * sites ; c'est le registre qui change.
 *
 * Il tourne sur le HTML réellement produit, pas sur les sources : il voit ce
 * que verront Google et le visiteur. Il échoue le build quand une règle est
 * violée, pour qu'une régression ne parte jamais en ligne sur la foi d'une
 * relecture humaine.
 *
 *   node scripts/verifier.mjs
 *
 * Ce qu'il vérifie :
 *   1. aucune formulation interdite (laisser croire à une salle dans la ville)
 *   2. aucune vente négative (mettre en avant ce qui manque)
 *   3. aucune heure de fermeture écrite hors du registre
 *   4. aucun lien interne cassé
 *   5. un H1 unique par page, hiérarchie de titres sans saut
 *   6. aucune image sans texte alternatif ; noms de fichiers conformes
 *   7. titles et descriptions présents, uniques, de longueur tenable
 *   8. canonique et JSON-LD présents et parsables
 *   9. les liens sortants vers le club sont bien là et pointent sur ses vraies pages
 *  10. chaque page porte ses mots-clés prioritaires dans son texte visible
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = existsSync(join(RACINE, '.vercel/output/static'))
  ? join(RACINE, '.vercel/output/static')
  : join(RACINE, 'dist');

const lireSrc = (f) => readFileSync(join(RACINE, 'src', 'data', f), 'utf8');

/* ─────────────────────  Le registre du site  ───────────────────── */

const verite = lireSrc('verite.ts');
const routesTs = lireSrc('routes.ts');

const extraireListe = (src, nom) => {
  const bloc = new RegExp(`${nom}[^=]*=\\s*\\[([\\s\\S]*?)\\n\\]`).exec(src);
  return bloc ? [...bloc[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map((m) => m[1] ?? m[2]) : [];
};

const VILLE = /ville:\s*'([^']+)'/.exec(verite)?.[1] ?? '';
/** Toutes les heures de fermeture du registre : un site peut viser deux clubs. */
const FERMETURES = [...verite.matchAll(/fermetureTexte:\s*'([^']+)'/g)].map((m) => m[1]);
const FERMETURE = FERMETURES.join(' ou ');
const INTERDIT = extraireListe(verite, 'INTERDIT');
const VENTE_NEGATIVE = extraireListe(verite, 'VENTE_NEGATIVE');

/** Les hôtes du ou des clubs de destination, et leurs pages obligatoires. */
const CLUBS = [...verite.matchAll(/site:\s*'(https?:\/\/[^']+)'/g)].map((m) => m[1]);
const PLANNINGS = [...verite.matchAll(/plannings:\s*'(https?:\/\/[^']+)'/g)].map((m) => m[1]);
const TARIFS = [...verite.matchAll(/tarifs:\s*'(https?:\/\/[^']+)'/g)].map((m) => m[1]);

/** Les heures de fermeture qui ne sont PAS celle du registre. */
const HEURES_INTERDITES = ['21h00', '21h15', '21h30', '21h45', '22h00', '22h30'].filter(
  (h) => !FERMETURES.includes(h) && !FERMETURES.includes(h.replace('h00', 'h'))
);

/** Les routes déclarées, pour vérifier les liens internes. */
const CHEMINS = [...routesTs.matchAll(/chemin:\s*'([^']+)'/g)].map((m) => m[1]);

/** Les clusters de mots-clés, page par page. */
function lireClusters() {
  if (!existsSync(join(RACINE, 'src', 'data', 'mots-cles.ts'))) return [];
  const src = lireSrc('mots-cles.ts');
  const out = [];
  const re = /page:\s*'([^']+)',\s*\n?\s*prioritaires:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = re.exec(src))) {
    out.push({ page: m[1], mots: [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]) });
  }
  return out;
}

/** id de route → chemin, pour associer un cluster à sa page. */
const CHEMIN_PAR_ID = Object.fromEntries(
  [...routesTs.matchAll(/id:\s*'([^']+)',\s*\n\s*chemin:\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
);

/* ─────────────────────────  Outils  ───────────────────────── */

const erreurs = [];
const avertissements = [];
const textesParRoute = new Map();

const plat = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const texteVisible = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

function pages(dir, base = '') {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...pages(p, `${base}/${e}`));
    else if (e === 'index.html') out.push([`${base}/` || '/', p]);
    else if (e.endsWith('.html')) out.push([`${base}/${e}`, p]);
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error(`  Aucun build trouvé (${DIST}). Lance « npm run build ».`);
  process.exit(1);
}

const toutes = pages(DIST);
const routesConnues = new Set(toutes.map(([r]) => (r.endsWith('/') ? r : r + '/')));
for (const c of CHEMINS) routesConnues.add(c);

const titres = new Map();
const descriptions = new Map();

/* ─────────────────────────  Les contrôles  ───────────────────────── */

for (const [route, fichier] of toutes) {
  const html = readFileSync(fichier, 'utf8');
  const txt = texteVisible(html);
  const bas = plat(txt);
  textesParRoute.set(route, txt);
  const ou = (m) => `${route.padEnd(24)} ${m}`;

  // 1 — laisser croire qu'une salle est DANS la ville du site
  for (const f of INTERDIT) {
    if (bas.includes(plat(f))) erreurs.push(ou(`formulation interdite : « ${f} »`));
  }

  // 2 — vendre l'absence. On dit ce qui existe, jamais ce qui manque.
  for (const f of VENTE_NEGATIVE) {
    let i = bas.indexOf(plat(f));
    while (i !== -1) {
      const phrase = bas.slice(Math.max(0, i - 140), i + 140);
      if (new RegExp(`${plat(VILLE)}|boxing center|salle|club`).test(phrase)) {
        erreurs.push(ou(`vente négative : « ${f} » — dire ce qui existe, pas ce qui manque`));
        break;
      }
      i = bas.indexOf(plat(f), i + 1);
    }
  }

  // 3 — une heure de fermeture écrite ailleurs que dans le registre
  for (const h of HEURES_INTERDITES) {
    if (txt.includes(h)) {
      erreurs.push(ou(`heure de fermeture en dur : « ${h} » — le registre dit ${FERMETURE}`));
    }
  }

  // 3 bis — une distance en kilomètres. On mesure le trajet en lignes, pas en
  // kilomètres : un chiffre en km éloigne, un numéro de ligne rapproche. La
  // règle vaut aussi contre le texte hérité d'un autre site de la famille.
  for (const m of txt.matchAll(/\d{1,3}\s?km/g)) {
    erreurs.push(ou(`distance en kilomètres : « ${m[0]} » — dire la ligne, pas la distance`));
  }

  // 4 — liens internes
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    let cible = m[1];
    if (cible.startsWith('/api/') || /\.[a-z0-9]{2,5}$/i.test(cible)) continue;
    if (!cible.endsWith('/')) cible += '/';
    if (!routesConnues.has(cible)) erreurs.push(ou(`lien interne cassé : ${m[1]}`));
  }

  // 5 — titres
  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 === 0) erreurs.push(ou('aucun <h1>'));
  if (h1 > 1) erreurs.push(ou(`${h1} <h1> — il en faut exactement un`));

  const niveaux = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < niveaux.length; i++) {
    if (niveaux[i] - niveaux[i - 1] > 1) {
      avertissements.push(ou(`saut de titre h${niveaux[i - 1]} → h${niveaux[i]}`));
      break;
    }
  }

  // 6 — images : alt obligatoire, nom de fichier conforme, hero assez large
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const balise = m[0];
    if (!/\salt=/.test(balise)) {
      erreurs.push(ou(`<img> sans alt : ${balise.slice(0, 70)}…`));
    }
    const src = /src="\/photos\/([^"]+)"/.exec(balise)?.[1];
    if (src) {
      const nom = src.replace(/-\d+\.(avif|webp|jpg)$/, '');
      // Une ville peut porter une apostrophe (« L'Union ») : le nom de fichier
      // la perd. On accepte donc les deux formes, avec tiret ou sans rien.
      const VILLE_SLUG = plat(VILLE).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const VILLE_COMPACT = plat(VILLE).replace(/[^a-z0-9]+/g, '');
      const attendu = new RegExp(`^[a-z0-9-]+-(${VILLE_SLUG}|${VILLE_COMPACT})(-[2-9])?$`);
      if (!attendu.test(plat(nom))) {
        erreurs.push(ou(`nom de fichier non conforme : ${nom} (attendu <sujet>-${VILLE_COMPACT})`));
      }
      if (/fetchpriority="high"/.test(balise)) {
        const w = Number(/width="(\d+)"/.exec(balise)?.[1] ?? 0);
        if (w && w < 2000) avertissements.push(ou(`image prioritaire de ${w} px (2000 attendus)`));
      }
    }
  }

  // 7 — title et description
  const t = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const d = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!t) erreurs.push(ou('<title> vide'));
  if (!d) erreurs.push(ou('meta description absente'));
  if (t && titres.has(t)) erreurs.push(ou(`<title> en double avec ${titres.get(t)}`));
  if (d && descriptions.has(d)) erreurs.push(ou(`description en double avec ${descriptions.get(d)}`));
  titres.set(t, route);
  descriptions.set(d, route);
  if (t.length > 65) avertissements.push(ou(`title de ${t.length} caractères (tronqué au-delà de ~60)`));
  if (d.length > 165) avertissements.push(ou(`description de ${d.length} caractères`));

  // 8 — canonique et données structurées
  if (!/rel="canonical"/.test(html)) erreurs.push(ou('lien canonique absent'));
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!ld) erreurs.push(ou('JSON-LD absent'));
  else {
    try {
      JSON.parse(ld);
    } catch {
      erreurs.push(ou('JSON-LD invalide'));
    }
  }

  // 9 — aucun nom de photographe ne doit apparaître
  if (/derewiany|domenech/i.test(html)) erreurs.push(ou('nom de photographe dans le HTML'));
}

/* 10 — les liens sortants vers le club, présents sur toutes les pages */
for (const [route, fichier] of toutes) {
  if (route === '/404.html' || route === '/merci/') continue;
  const html = readFileSync(fichier, 'utf8');
  for (const [nom, liste] of [['plannings', PLANNINGS], ['tarifs', TARIFS]]) {
    if (liste.length && !liste.some((u) => html.includes(u))) {
      avertissements.push(`${route.padEnd(24)} aucun lien vers la page ${nom} du club`);
    }
  }
}

/* 11 — chaque page porte ses mots-clés prioritaires */
for (const { page, mots } of lireClusters()) {
  const chemin = CHEMIN_PAR_ID[page];
  if (!chemin) {
    erreurs.push(`cluster « ${page} » : aucune route de ce nom`);
    continue;
  }
  const txt = textesParRoute.get(chemin);
  if (!txt) {
    erreurs.push(`${chemin.padEnd(24)} page absente du build — mots-clés invérifiables`);
    continue;
  }
  const plan = plat(txt);
  for (const mot of mots) {
    if (!plan.includes(plat(mot))) {
      erreurs.push(`${chemin.padEnd(24)} mot-clé prioritaire absent du texte visible : « ${mot} »`);
    }
  }
}

/* ───────────────  La source : ce qu'elle n'a pas le droit de savoir  ───────────────
   Les contrôles ci-dessus lisent le HTML produit. Deux défauts leur échappent
   parce qu'ils vivent dans la source : une heure écrite en dur dans un script
   qui ne s'exécute qu'au clic, et une règle CSS qui nomme un identifiant du
   registre — elle compile, elle passe, et elle n'affiche rien.
   Voir la loi commune §13.9. */

function fichiersSource(dossier) {
  const out = [];
  for (const e of readdirSync(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) out.push(...fichiersSource(chemin));
    else if (/\.(ts|astro|mjs|js)$/.test(e.name)) out.push(chemin);
  }
  return out;
}

const DOSSIER_SRC = join(RACINE, 'src');
if (existsSync(DOSSIER_SRC)) {
  /* Les identifiants que le registre des transports connaît, s'il existe. */
  const cheminTransports = join(RACINE, 'src', 'data', 'transports.ts');
  const idsItineraires = existsSync(cheminTransports)
    ? [...readFileSync(cheminTransports, 'utf8').matchAll(/^\s{4}id:\s*'([^']+)'/gm)].map((m) => m[1])
    : [];

  for (const fichier of fichiersSource(DOSSIER_SRC)) {
    const rel = fichier.slice(RACINE.length + 1).replace(/\\/g, '/');
    const estRegistre = rel.startsWith('src/data/');
    const src = readFileSync(fichier, 'utf8');

    /* A — une heure en dur hors du registre. Le registre est la seule source
       d'une heure : un club qui change d'amplitude ne doit pas laisser une
       phrase fausse dans un script. */
    if (!estRegistre) {
      for (const m of src.matchAll(/\b\d{1,2}\s?h\s?\d{2}\b/g)) {
        const ligne = src.slice(0, m.index).split('\n').length;
        erreurs.push(`${rel}:${ligne} — heure en dur : « ${m[0]} ». Une heure vit dans src/data/.`);
      }
    }

    /* B — une règle CSS qui nomme un identifiant d'itinéraire. Ces règles se
       génèrent depuis le registre, sinon un identifiant renommé laisse un
       onglet muet. */
    for (const m of src.matchAll(/#trajet-([a-z0-9-]+):checked/g)) {
      if (src.slice(Math.max(0, m.index - 400), m.index).includes('${')) continue;
      const ligne = src.slice(0, m.index).split('\n').length;
      erreurs.push(
        `${rel}:${ligne} — règle CSS écrite à la main pour « ${m[1]} ». ` +
          `Génère-la depuis ITINERAIRES (loi commune §13.9).`
      );
    }

    /* C — un nombre en lettres devant un décompte que le registre connaît. */
    const NOMBRES_ECRITS =
      /\b(deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|vingt)\s+(intitulés|trajets|itinéraires|disciplines publiées)\b/gi;
    for (const m of src.matchAll(NOMBRES_ECRITS)) {
      const ligne = src.slice(0, m.index).split('\n').length;
      avertissements.push(`${rel}:${ligne} — « ${m[0]} » : ce nombre se compte depuis le registre.`);
    }
  }

  /* D — chaque itinéraire du registre doit avoir sa règle d'affichage. */
  if (idsItineraires.length) {
    const transportsAstro = join(RACINE, 'src', 'components', 'Transports.astro');
    if (existsSync(transportsAstro)) {
      const c = readFileSync(transportsAstro, 'utf8');
      if (!c.includes('CSS_PANNEAUX')) {
        erreurs.push(
          'src/components/Transports.astro — les règles d’affichage des panneaux ne sont pas générées depuis le registre.'
        );
      }
    }
  }
}

/* ─────────────────────────  Rapport  ───────────────────────── */

console.log(`\n  ${toutes.length} pages analysées dans ${DIST.replace(RACINE, '.')}\n`);
for (const a of avertissements) console.log(`  ⚠  ${a}`);
for (const e of erreurs) console.log(`  ✗  ${e}`);

if (!erreurs.length && !avertissements.length) console.log('  Rien à signaler.\n');
else console.log(`\n  ${erreurs.length} erreur(s), ${avertissements.length} avertissement(s)\n`);

process.exit(erreurs.length ? 1 : 0);
