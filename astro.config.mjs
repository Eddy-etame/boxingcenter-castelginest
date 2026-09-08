import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Statique par défaut. Seul /api/contact tourne à la demande : il relaie le
// formulaire vers Inlet (JSON + preuve de travail), ce qu'un <form> natif ne
// peut pas faire seul. Tout le reste est pré-rendu.
export default defineConfig({
  site: 'https://www.boxingcenter-castelginest.fr',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  redirects: {
    // Les requêtes que les gens tapent, ramenées sur les pages canoniques :
    // fabriquer /club-boxe-castelginest/ à côté de / serait le schéma de page
    // satellite que Google sanctionne.
    '/club-boxe-castelginest': '/',
    '/boxe-castelginest': '/',
    '/sport-combat-castelginest': '/',
    '/salle-de-boxe-castelginest': '/',
    '/boxe-anglaise-castelginest': '/boxe-anglaise/',
    '/club-mma-castelginest': '/mma/',
    '/salle-mma-castelginest': '/mma/',
    '/mma-castelginest': '/mma/',
    '/grappling-castelginest': '/mma/',
    '/club-boxe-thai-castelginest': '/boxe-pieds-poings/',
    '/boxe-thai-castelginest': '/boxe-pieds-poings/',
    '/club-kick-boxing-castelginest': '/boxe-pieds-poings/',
    '/kick-boxing-castelginest': '/boxe-pieds-poings/',
    '/kick-boxing': '/boxe-pieds-poings/',
    '/full-contact-castelginest': '/boxe-pieds-poings/',
    '/boxe-enfant-castelginest': '/boxe-enfants/',
    '/boxe-femme-castelginest': '/preparation-physique/',
    '/salle-de-sport-castelginest': '/preparation-physique/',
    '/musculation-castelginest': '/preparation-physique/',
    '/cross-training-castelginest': '/preparation-physique/',
    '/hyrox-castelginest': '/preparation-physique/',
    '/boxing-fitness': '/preparation-physique/',
    '/club-boxe-saint-alban': '/saint-alban/',
    '/salle-mma-saint-alban': '/saint-alban/',
    '/club-boxe-launaguet': '/launaguet/',
    '/salle-mma-launaguet': '/launaguet/',
    '/club-boxe-aucamville': '/aucamville/',
    '/salle-mma-aucamville': '/aucamville/',
    '/club-boxe-fenouillet': '/fenouillet/',
    '/salle-mma-fenouillet': '/fenouillet/',
    '/bus-castelginest-etats-unis': '/transports/',
    '/acces': '/transports/',
  },
});
