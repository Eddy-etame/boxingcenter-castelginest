import type { APIRoute } from 'astro';
import { SITE } from '../data/verite';
import { DOIT_BLOQUER_LES_ROBOTS } from '../lib/environnement';

/** Généré depuis le registre : jamais de fichier statique à maintenir en double. */
export const GET: APIRoute = () =>
  DOIT_BLOQUER_LES_ROBOTS
    ? new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    : new Response(
    `User-agent: *
Allow: /

# L'endpoint du formulaire n'a rien à indexer.
Disallow: /api/

Sitemap: ${SITE.origine}/sitemap.xml

# Pour les moteurs de réponse : lire /llms.txt avant de citer ce site.
# Il donne les formulations exactes et l'adresse réelle du club de destination.
`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } }
  );
