/**
 * LE GRAPHE RÉEL DES DISCIPLINES — ce que Toulouse États-Unis publie.
 *
 * Relevé le 09/09/2026 sur la page de la salle, boxingcenter.fr.
 *
 * Ce club est le seul du réseau à réunir toutes les disciplines en un lieu :
 * le club l'écrit lui-même, et c'est ce qui rend cette liste plus longue que
 * celle des autres salles.
 */

export type Famille =
  | 'boxe-anglaise'
  | 'kick-boxing'
  | 'grappling'
  | 'competition'
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

const SOURCE =
  'https://clubmma.fr/';

export const OFFRES: readonly Offre[] = [
  {
    intitule: 'Boxe anglaise',
    famille: 'boxe-anglaise',
    detail: 'Les poings, la garde, les déplacements, sur l’un des deux rings de compétition.',
  },
  {
    intitule: 'Boxe pieds-poings',
    famille: 'kick-boxing',
    detail: 'Les jambes en plus des poings, en garde haute et sur appuis.',
  },
  {
    intitule: 'Full contact',
    famille: 'kick-boxing',
    detail: 'Le règlement pieds-poings au-dessus de la ceinture. Nouveau dans cette salle.',
  },
  {
    intitule: 'Travail au Sol',
    famille: 'grappling',
    detail: 'Le grappling, sur 400 m² de tatamis, avec une cage surélevée officielle.',
  },
  {
    intitule: 'Compétiteurs amateurs',
    famille: 'competition',
    detail: 'Le groupe qui prépare les combats, sur les deux rings.',
  },
  {
    intitule: 'Boxing Lady',
    famille: 'femme',
    detail: 'Le geste de boxe et le cardio, entre femmes.',
  },
  {
    intitule: 'Boxing Fitness',
    famille: 'physique',
    detail: 'La boxe en travail cardio, sans opposition, sur seize sacs de frappe.',
  },
  {
    intitule: 'Cross-training',
    famille: 'physique',
    detail: 'Force, souffle, gainage — et une cage de cross-training pour le poids du corps.',
  },
  {
    intitule: 'Hyrox',
    famille: 'physique',
    detail: 'La préparation au format de course en salle.',
  },
  {
    intitule: 'Street Workout',
    famille: 'physique',
    detail: 'Le travail au poids du corps, avec un coach spécialisé en callisthénie.',
  },
  {
    intitule: 'Musculation',
    famille: 'physique',
    detail: 'Le plateau de charges, dans l’espace préparation physique.',
  },
  {
    intitule: 'Cardio',
    famille: 'physique',
    detail: 'Vélo, rameur et machines, dans le même espace.',
  },
  {
    intitule: 'Accès Libre',
    famille: 'physique',
    detail: 'L’espace préparation physique, en dehors des cours.',
  },
  {
    intitule: 'Cours Enfants',
    famille: 'enfants',
    detail: 'La boxe pour les plus jeunes, en touché contrôlé.',
  },
] as const;

export const SOURCE_OFFRES = SOURCE;

export const offresDe = (f: Famille) => OFFRES.filter((o) => o.famille === f);

/** Les familles portées par chaque page de discipline du site. */
export const FAMILLES_PAR_PAGE = {
  'boxe-anglaise': ['boxe-anglaise', 'competition'],
  mma: ['grappling'],
  'boxe-pieds-poings': ['kick-boxing'],
  'boxe-enfants': ['enfants'],
  'preparation-physique': ['physique', 'femme'],
} as const satisfies Record<string, readonly Famille[]>;

export type PageDiscipline = keyof typeof FAMILLES_PAR_PAGE;

export const offresDeLaPage = (page: PageDiscipline) =>
  OFFRES.filter((o) => (FAMILLES_PAR_PAGE[page] as readonly Famille[]).includes(o.famille));
