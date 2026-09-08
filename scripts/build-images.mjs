/**
 * Pipeline image : le lot WeTransfer brut → AVIF + WebP + JPEG de repli,
 * quatre largeurs, nommés d'après le manifeste (`<sujet>-<ville>`).
 *
 * On pré-cuit ici plutôt qu'au build Astro : les sources sont des JPEG plein
 * capteur (6720 px, 6 à 8 Mo). Les faire traverser chaque déploiement coûterait
 * des minutes pour un résultat identique.
 *
 *   node scripts/build-images.mjs          # ne refait que ce qui manque
 *   node scripts/build-images.mjs --force  # tout refaire
 */

import { mkdirSync, existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const SORTIE = join(RACINE, 'public', 'photos');
const LARGEURS = [480, 768, 900, 1440, 2000];
const FORCE = process.argv.includes('--force');

/** Lit le manifeste TypeScript sans compilateur : slug, source, dossier. */
function lireManifeste() {
  const src = readFileSync(join(RACINE, 'src', 'data', 'medias.ts'), 'utf8');
  const lot = /const LOT = '([^']+)'/.exec(src)?.[1];
  if (!lot) throw new Error('Dossier source introuvable dans medias.ts (const LOT).');
  const entrees = [];
  const re = /slug:\s*'([^']+)',\s*\n\s*source:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) entrees.push({ slug: m[1], source: m[2] });
  return { lot: join(RACINE, lot), entrees };
}

const ko = (n) => (n / 1024 < 1000 ? `${(n / 1024).toFixed(0)} ko` : `${(n / 1048576).toFixed(1)} Mo`);

async function main() {
  const { lot, entrees } = lireManifeste();
  if (!entrees.length) throw new Error('Manifeste vide.');
  if (!existsSync(lot)) throw new Error(`Dossier source absent : ${lot}`);
  mkdirSync(SORTIE, { recursive: true });

  let avant = 0;
  let apres = 0;
  let faits = 0;
  let sautes = 0;
  const infos = {};

  for (const { slug, source } of entrees) {
    const chemin = join(lot, source);
    if (!existsSync(chemin)) {
      console.warn(`  MANQUANT  ${source}`);
      continue;
    }
    avant += statSync(chemin).size;

    const meta = await sharp(chemin, { limitInputPixels: false }).rotate().metadata();

    for (const l of LARGEURS) {
      if (l > meta.width) continue;
      for (const [ext, opts] of [
        ['avif', { quality: 52, effort: 5 }],
        ['webp', { quality: 74 }],
        ['jpg', { quality: 78, mozjpeg: true, progressive: true }],
      ]) {
        const dest = join(SORTIE, `${slug}-${l}.${ext}`);
        if (!FORCE && existsSync(dest)) {
          apres += statSync(dest).size;
          sautes++;
          continue;
        }
        await sharp(chemin, { limitInputPixels: false })
          .rotate()
          .resize(l, null, { withoutEnlargement: true })
          .toFormat(ext === 'jpg' ? 'jpeg' : ext, opts)
          .toFile(dest);
        apres += statSync(dest).size;
        faits++;
      }
    }

    // Aperçu flou en base64 : pas de trou blanc pendant le chargement, et
    // aucune requête réseau de plus.
    const flou = await sharp(chemin, { limitInputPixels: false })
      .rotate()
      .resize(20, null)
      .blur(1.2)
      .webp({ quality: 30 })
      .toBuffer();

    infos[slug] = {
      lqip: `data:image/webp;base64,${flou.toString('base64')}`,
      w: meta.width,
      h: meta.height,
      ratio: +(meta.width / meta.height).toFixed(4),
    };
    console.log(`  ${slug.padEnd(34)} ${meta.width}×${meta.height}`);
  }

  writeFileSync(join(RACINE, 'src', 'data', 'photos.json'), JSON.stringify(infos, null, 2) + '\n');
  console.log(
    `\n  ${faits} fichiers générés, ${sautes} déjà à jour.` +
      `\n  source ${ko(avant)} → web ${ko(apres)} (${((1 - apres / avant) * 100).toFixed(1)} % de moins)\n`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
