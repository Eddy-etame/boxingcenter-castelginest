/**
 * MANIFESTE MÉDIA — la seule porte d'entrée des images.
 *
 * Nom de fichier : `<sujet>-castelginest` — le sujet est ce qu'on voit, la
 * ville est celle du site. Pas de « boxing-center » dans le nom, pas de numéro
 * d'origine.
 *
 * `alt` décrit la scène, jamais un lieu. `legende` dit ce qu'on voit puis le
 * club de destination du site.
 *
 * Aucune photo de ce site ne se retrouve sur un autre site de la famille : le
 * lot a été partagé, pas dupliqué.
 */

export type Media = {
  slug: string;
  source: string;
  alt: string;
  legende?: string;
  focus?: string;
};

const LOT = '../wetransfer_dsc_3218-jpg_2026-09-07_1104';
const EU = 'Boxing Center Toulouse États-Unis';

export const MEDIAS = [
  {
    slug: 'club-boxe-castelginest',
    source: 'DSC_3264.jpg',
    alt: 'Un boxeur en garde travaille aux pattes d’ours face à son coach, dans le ring.',
    legende: `Travail aux pattes, dans le ring — ${EU}`,
    focus: '55% 45%',
  },
  {
    slug: 'sparring-boxe-castelginest',
    source: 'DSC_3273.jpg',
    alt: 'Un coach et un boxeur face à face au centre du ring, pattes d’ours levées.',
    legende: `Le coach et son boxeur, au centre du ring — ${EU}`,
    focus: '50% 45%',
  },
  {
    slug: 'ring-de-boxe-castelginest',
    source: 'DSC_3095.jpg',
    alt: 'Vue large de la salle : le ring surélevé, la fresque murale, et un pratiquant qui observe depuis le bord.',
    legende: `La salle pendant un entraînement — ${EU}`,
    focus: '50% 50%',
  },
  {
    slug: 'preparation-physique-castelginest',
    source: 'DSC_2969.jpg',
    alt: 'Un pratiquant frappe un sac lourd dans un alignement de sacs suspendus.',
    legende: `L’alignement des sacs — ${EU}`,
    focus: '55% 45%',
  },
  {
    slug: 'sac-de-frappe-castelginest',
    source: 'DSC_3167.jpg',
    alt: 'Un boxeur enchaîne au sac pendant que d’autres pratiquants attendent leur tour, assis au bord du ring.',
    legende: `Le travail au sac — ${EU}`,
    focus: '45% 40%',
  },
  {
    slug: 'boxe-anglaise-castelginest',
    source: 'DSC_3299.jpg',
    alt: 'Un coach tient les pattes d’ours pendant qu’un boxeur arme un coup, devant la fresque de la salle.',
    legende: `Une série aux pattes d’ours — ${EU}`,
    focus: '55% 40%',
  },
  {
    slug: 'travail-aux-pattes-castelginest',
    source: 'DSC_3296.jpg',
    alt: 'Un boxeur et son coach en opposition contrôlée aux pattes d’ours, dans le ring.',
    legende: `La distance, corrigée à chaque coup — ${EU}`,
    focus: '55% 45%',
  },
  {
    slug: 'premiere-seance-castelginest',
    source: 'DSC_3174.jpg',
    alt: 'Un boxeur en garde haute, gants verts fermés devant le visage, concentré.',
    legende: `La garde, avant tout le reste — ${EU}`,
    focus: '50% 40%',
  },
  {
    slug: 'recuperation-boxe-castelginest',
    source: 'DSC_3218.jpg',
    alt: 'Un boxeur adossé aux cordes du ring, gants baissés, entre deux rounds.',
    legende: `Entre deux rounds — ${EU}`,
    focus: '50% 40%',
  },
  {
    slug: 'encadrement-boxe-castelginest',
    source: 'DSC_3256.jpg',
    alt: 'Un coach met les pattes d’ours en place face à un boxeur qui se remet en garde.',
    legende: `L’encadrement, à chaque série — ${EU}`,
    focus: '55% 45%',
  },
  {
    slug: 'entrainement-boxe-castelginest',
    source: 'DSC_3267.jpg',
    alt: 'Un boxeur en garde attend la consigne de son coach, pattes d’ours prêtes.',
    legende: `La consigne, entre deux séries — ${EU}`,
    focus: '55% 45%',
  },
  {
    slug: 'garde-boxe-castelginest',
    source: 'DSC_3265.jpg',
    alt: 'Un boxeur poings serrés en garde face à son coach, sous les projecteurs du ring.',
    legende: `La garde tenue jusqu’au bout de la série — ${EU}`,
    focus: '55% 45%',
  },
] as const satisfies readonly Media[];

export type MediaSlug = (typeof MEDIAS)[number]['slug'];

const INDEX = new Map(MEDIAS.map((m) => [m.slug, m as Media]));

export function media(slug: MediaSlug): Media {
  const m = INDEX.get(slug);
  if (!m) throw new Error(`Média inconnu : ${slug}`);
  return m;
}

export const DOSSIER_SOURCE = LOT;

/** Les photos par RÔLE, pas par nom de fichier. */
export const ROLES = {
  hero: 'club-boxe-castelginest',
  signature: 'sparring-boxe-castelginest',
  premiereSeance: 'premiere-seance-castelginest',
  effort: 'sac-de-frappe-castelginest',
  calme: 'recuperation-boxe-castelginest',
  salle: 'ring-de-boxe-castelginest',
} as const satisfies Record<string, MediaSlug>;
