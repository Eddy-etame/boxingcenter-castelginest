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
    detail: 'Sur les deux rings de compétition : précision, esquive, déplacement et vitesse de réaction.',
  },
  {
    intitule: 'Pieds-Poings / Kick',
    famille: 'kick-boxing',
    detail: 'Poings et jambes ensemble, au planning de la salle Boxe.',
  },
  {
    intitule: 'Full Contact',
    famille: 'kick-boxing',
    detail: 'Pieds-poings sans coup sous la ceinture, ajouté à l’espace Boxe.',
  },
  {
    intitule: 'Muay Thai',
    famille: 'thai',
    detail: 'Poings, pieds, coudes, genoux et clinch : les huit armes de la boxe thaï.',
  },
  {
    intitule: 'MMA',
    famille: 'mma',
    detail: 'Frappe, projections et sol, sur 400 m² de tatamis et dans la cage officielle, du débutant au confirmé.',
  },
  {
    intitule: 'Grappling',
    famille: 'grappling',
    detail: 'Soumissions, contrôles et projections, sans aucune frappe, sur les tatamis MMA.',
  },
  {
    intitule: 'Jiu-Jitsu Brésilien',
    famille: 'grappling',
    detail: 'Le combat au sol en kimono, sans frappe par règlement.',
  },
  {
    intitule: 'Lady Punch',
    famille: 'femme',
    detail: 'Boxing Lady, réservé aux femmes et sans opposition, au planning Fitness.',
  },
  {
    intitule: 'Hyrox',
    famille: 'physique',
    detail: 'Préparation mixte au format Hyrox, tous niveaux, dans l’espace préparation physique.',
  },
  {
    intitule: 'Boxing HIIT',
    famille: 'physique',
    detail: 'Un circuit cardio construit sur les gestes de boxe, sans adversaire.',
  },
  {
    intitule: 'Cross-Training',
    famille: 'physique',
    detail: 'Haltères, gymnastique et cardio, enchaînés en séance intense.',
  },
  {
    intitule: 'Street Workout',
    famille: 'physique',
    detail: 'Tractions et poids du corps sur la cage de callisthénie, en accès libre.',
  },
  {
    intitule: 'Accès libre',
    famille: 'physique',
    detail: 'Musculation, cardio et cross-training ouverts aux membres, six jours sur sept.',
  },
  {
    intitule: 'École de boxe',
    famille: 'enfants',
    ages: '3/6, 7/11 et 12/16 ans',
    detail: 'Trois groupes, 3/6, 7/11 et 12/16 ans, en touché contrôlé au planning Boxe.',
  },
  {
    intitule: 'MMA jeunes',
    famille: 'enfants',
    ages: '10/16 ans',
    detail: 'Les 10/16 ans sur les tatamis de la salle MMA, à leur propre créneau.',
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
