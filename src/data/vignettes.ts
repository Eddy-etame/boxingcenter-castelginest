/**
 * CE QUE MONTRE LA VIGNETTE DE CHAQUE PAGE — la photo de la page, le sujet,
 * le lieu, le club et la ligne. Lu par pages/og/ (l'image) et par le layout
 * (le JSON-LD) : l'image annoncée et l'image servie sont la même.
 */
import { SITE, DESTINATION } from './verite';
import { ROLES } from './medias';
import { CONTENUS } from './contenus';
import { COMMUNES } from './communes';
import { MEILLEUR } from './transports';

export const VILLE_SITE: string = SITE.ville;
export const CLUB_VIGNETTE: string = DESTINATION.nom;
export const LIGNE_VIGNETTE: string = MEILLEUR.etapes.map((e) => e.code).join(' → ');

const SUJETS: Record<string, string> = {
  accueil: 'Club de boxe · MMA',
  'boxe-anglaise': 'Boxe anglaise',
  mma: 'Club MMA',
  'kick-boxing': 'Kick-boxing',
  'boxe-pieds-poings': 'Boxe pieds-poings',
  'boxe-thai': 'Boxe thaï · K1',
  'boxe-enfants': 'Boxe enfant',
  'boxing-fitness': 'Boxing fitness',
  'preparation-physique': 'Préparation physique',
  'premiere-seance': 'Première séance',
  'ta-seance': 'Ta séance',
  'quel-club': 'Quel club',
  transports: 'Y aller en bus',
  contact: 'Contact',
  plannings: 'Plannings',
  tarifs: 'Tarifs',
};
const DEPUIS = new Set(['transports', 'contact', 'quel-club', 'ta-seance']);

/** « BOXE ANGLAISE · PRÈS DE », « Y ALLER EN BUS · DEPUIS » : la ligne au-dessus du lieu. */
export function etiquetteDeLaRoute(id: string): string {
  return `${SUJETS[id] ?? 'Club de boxe · MMA'} · ${DEPUIS.has(id) ? 'depuis' : 'près de'}`;
}

export function photoDeLaRoute(id: string): string {
  const c = CONTENUS.find((x) => x.id === id);
  if (c) return c.photoHero;
  const m = COMMUNES.find((x) => x.id === id);
  if (m) return m.photo;
  if (id === 'contact' || id === 'premiere-seance') return ROLES.premiereSeance;
  if (id === 'quel-club') return ROLES.calme;
  if (id === 'transports') return ROLES.effort;
  return ROLES.hero;
}

/** Sur une page de commune, le lieu est la commune ; partout ailleurs, la ville du site. */
export function lieuDeLaRoute(id: string): string {
  return COMMUNES.find((x) => x.id === id)?.nom ?? VILLE_SITE;
}
