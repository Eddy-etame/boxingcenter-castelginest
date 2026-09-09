/**
 * LE GRAPHE RÉEL DES DISCIPLINES — ce que Toulouse États-Unis publie.
 *
 * Relevé le 10/09/2026 sur clubmma.fr, le site dédié du club : la page
 * « Disciplines » et les trois plannings (Salle Boxe, Boxing Fitness,
 * Salle MMA).
 *
 * Ce club est le seul du réseau à réunir toutes les disciplines en un lieu :
 * le club l'écrit lui-même, et c'est ce qui rend cette liste plus longue que
 * celle des autres salles.
 */

export type Famille =
  | 'boxe-anglaise'
  | 'kick-boxing'
  | 'thai'
  | 'mma'
  | 'grappling'
  | 'femme'
  | 'physique'
  | 'enfants';

export type Offre = {
  /** l'intitulé publié par le club, mot pour mot */
  intitule: string;
  famille: Famille;
  ages?: string;
  /** ce qui rend cette offre concrète, en une phrase */
  detail: string;
};

const SOURCE = 'https://clubmma.fr/disciplines/';

export const OFFRES: readonly Offre[] = [
  {
    intitule: 'Boxe Anglaise',
    famille: 'boxe-anglaise',
    detail: 'La discipline reine des poings : précision, vitesse de réaction, esquive et déplacement, sur l’un des deux rings de compétition.',
  },
  {
    intitule: 'Pieds-Poings / Kick',
    famille: 'kick-boxing',
    detail: 'Les jambes en plus des poings, au planning de la salle Boxe.',
  },
  {
    intitule: 'Full Contact',
    famille: 'kick-boxing',
    detail: 'Le règlement pieds-poings au-dessus de la ceinture, nouveau dans l’espace Boxe.',
  },
  {
    intitule: 'Muay Thai',
    famille: 'thai',
    detail: 'L’art des huit membres : poings, pieds, coudes, genoux, et le clinch.',
  },
  {
    intitule: 'MMA',
    famille: 'mma',
    detail: 'Debout, projections et sol, dans la cage officielle et sur 400 m² de tatamis. Les cours accueillent débutants et confirmés.',
  },
  {
    intitule: 'Grappling',
    famille: 'grappling',
    detail: 'Contrôle, projections, soumissions, sur les tatamis de la salle MMA.',
  },
  {
    intitule: 'Jiu-Jitsu Brésilien',
    famille: 'grappling',
    detail: 'Le sol, en kimono : le règlement exclut la frappe.',
  },
  {
    intitule: 'Lady Punch',
    famille: 'femme',
    detail: 'Le cours Boxing Lady : exclusivement féminin, sans opposition, au planning Fitness.',
  },
  {
    intitule: 'Hyrox',
    famille: 'physique',
    detail: 'Cours mixtes, du débutant au confirmé, dans l’espace préparation physique.',
  },
  {
    intitule: 'Boxing HIIT',
    famille: 'physique',
    detail: 'Le cardio de la boxe, en circuit, sans opposition.',
  },
  {
    intitule: 'Cross-Training',
    famille: 'physique',
    detail: 'Haltérophilie, gymnastique et cardio, en séance intense et fonctionnelle.',
  },
  {
    intitule: 'Street Workout',
    famille: 'physique',
    detail: 'La cage de cross-training et de callisthénie, en accès libre.',
  },
  {
    intitule: 'Accès libre',
    famille: 'physique',
    detail: 'Musculation, cardio et cross-training, six jours sur sept, pour les membres.',
  },
  {
    intitule: 'École de boxe',
    famille: 'enfants',
    ages: '3/6, 7/11 et 12/16 ans',
    detail: 'Trois groupes d’âge au planning de la salle Boxe, en touché contrôlé.',
  },
  {
    intitule: 'MMA jeunes',
    famille: 'enfants',
    ages: '10/16 ans',
    detail: 'Le créneau MMA des jeunes, au planning de la salle MMA.',
  },
] as const;

export const SOURCE_OFFRES = SOURCE;

export const offresDe = (f: Famille) => OFFRES.filter((o) => o.famille === f);

/** Les familles portées par chaque page de discipline du site. */
export const FAMILLES_PAR_PAGE = {
  'boxe-anglaise': ['boxe-anglaise'],
  mma: ['mma', 'grappling'],
  'boxe-pieds-poings': ['kick-boxing', 'thai'],
  'boxe-enfants': ['enfants'],
  'preparation-physique': ['physique', 'femme'],
} as const satisfies Record<string, readonly Famille[]>;

export type PageDiscipline = keyof typeof FAMILLES_PAR_PAGE;

export const offresDeLaPage = (page: PageDiscipline) =>
  OFFRES.filter((o) => (FAMILLES_PAR_PAGE[page] as readonly Famille[]).includes(o.famille));
