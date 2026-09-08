/**
 * REGISTRE DES MOTS-CLÉS — le territoire de recherche, page par page.
 *
 * Principe : plus de pertinence PAR page, pas plus de pages. Neuf pages de
 * fond, quatre pages de commune qui portent chacune une géographie réelle et
 * un itinéraire différent.
 *
 * Les prioritaires sont les composants naturels d'une expression — la requête
 * exacte vit dans le title et la description, où elle ne tord aucune phrase.
 * Le contrôle de build les vérifie dans le texte visible : chaque motif gardé
 * est une promesse d'écriture.
 */

import type { RouteId } from './routes';

export type Cluster = {
  page: RouteId;
  prioritaires: readonly string[];
  secondaires: readonly string[];
};

export const CONTEXTE_GEO = {
  ville: 'Castelginest',
  codePostal: '31780',
  gentile: 'Castelginestois',
  departement: 'Haute-Garonne',
  secteur: 'nord toulousain',
} as const;

export const CLUSTERS: readonly Cluster[] = [
  {
    page: 'accueil',
    prioritaires: ['club de boxe', 'Castelginest', 'sport de combat', 'grappling', 'États-Unis'],
    secondaires: [
      'boxe Castelginest',
      'club de boxe près de Castelginest',
      'salle de boxe près de Castelginest',
      'cours de boxe Castelginest',
      'boxe anglaise Castelginest',
      'MMA Castelginest',
      'boxe enfant Castelginest',
      '31780',
      'Castelginestois',
      'nord toulousain',
      'Trois Cocus',
      'La Vache',
      'ligne 60',
    ],
  },
  {
    page: 'boxe-anglaise',
    prioritaires: ['boxe anglaise', 'Castelginest', 'débutant'],
    secondaires: [
      'cours de boxe Castelginest',
      'club de boxe Castelginest',
      'ring de compétition',
      'compétiteurs amateurs',
      'apprendre à boxer',
      'pattes d’ours',
    ],
  },
  {
    page: 'mma',
    prioritaires: ['grappling', 'Castelginest', 'travail au sol', 'cage'],
    secondaires: [
      'MMA Castelginest',
      'club MMA Castelginest',
      'salle MMA Castelginest',
      'jiu-jitsu brésilien',
      'combat au sol',
      'tatamis',
      'cage control',
    ],
  },
  {
    page: 'boxe-pieds-poings',
    prioritaires: ['pieds-poings', 'Castelginest', 'full contact'],
    secondaires: [
      'boxe pieds poings Castelginest',
      'kick boxing Castelginest',
      'boxe thaï Castelginest',
      'striking',
      'low kick',
    ],
  },
  {
    page: 'boxe-enfants',
    prioritaires: ['boxe enfant', 'Castelginest', 'touché contrôlé'],
    secondaires: [
      'cours de boxe enfant Castelginest',
      'boxe ado Castelginest',
      'sport de combat enfant',
      'boxe éducative',
    ],
  },
  {
    page: 'preparation-physique',
    prioritaires: ['cross-training', 'Castelginest', 'musculation', 'Hyrox'],
    secondaires: [
      'salle de sport Castelginest',
      'boxing fitness Castelginest',
      'boxe femme Castelginest',
      'Boxing Lady',
      'street workout',
      'accès libre',
      'cardio',
      'seize sacs de frappe',
    ],
  },
  {
    page: 'premiere-seance',
    prioritaires: ['première séance', 'Castelginest', 'débutant'],
    secondaires: [
      'première séance boxe Castelginest',
      'séance d’essai',
      'commencer la boxe',
      'jamais fait de boxe',
      'que faut-il apporter',
    ],
  },
  {
    page: 'ta-seance',
    prioritaires: ['Castelginest', 'créneau', 'planning'],
    secondaires: [
      'planning boxe Castelginest',
      'horaires boxe Castelginest',
      'boxe le soir Castelginest',
      'boxe le midi',
      'boxe le samedi',
    ],
  },
  {
    page: 'saint-alban',
    prioritaires: [
      'club de boxe Saint-Alban',
      'boxe anglaise Saint-Alban',
      'club MMA Saint-Alban',
      'salle MMA Saint-Alban',
      'sport de combat Saint-Alban',
      'club kick boxing Saint-Alban',
      'boxe pieds poings Saint-Alban',
      'club boxe thaï Saint-Alban',
    ],
    secondaires: [
      'boxe Saint-Alban',
      'salle de boxe Saint-Alban',
      'boxe enfant Saint-Alban',
      'Saint-Albanais',
      '31140',
      'ligne 60',
    ],
  },
  {
    page: 'launaguet',
    prioritaires: [
      'club de boxe Launaguet',
      'boxe anglaise Launaguet',
      'club MMA Launaguet',
      'salle MMA Launaguet',
      'sport de combat Launaguet',
      'club kick boxing Launaguet',
      'boxe pieds poings Launaguet',
      'club boxe thaï Launaguet',
    ],
    secondaires: [
      'boxe Launaguet',
      'salle de boxe Launaguet',
      'boxe enfant Launaguet',
      'Launaguetois',
      '31140',
      'Trois Cocus',
    ],
  },
  {
    page: 'aucamville',
    prioritaires: [
      'club de boxe Aucamville',
      'boxe anglaise Aucamville',
      'club MMA Aucamville',
      'salle MMA Aucamville',
      'sport de combat Aucamville',
      'club kick boxing Aucamville',
      'boxe pieds poings Aucamville',
      'club boxe thaï Aucamville',
    ],
    secondaires: [
      'boxe Aucamville',
      'salle de boxe Aucamville',
      'boxe enfant Aucamville',
      'Aucamvillois',
      '31140',
      'ligne 69',
    ],
  },
  {
    page: 'fenouillet',
    prioritaires: [
      'club de boxe Fenouillet',
      'boxe anglaise Fenouillet',
      'club MMA Fenouillet',
      'salle MMA Fenouillet',
      'sport de combat Fenouillet',
      'club kick boxing Fenouillet',
      'boxe pieds poings Fenouillet',
      'club boxe thaï Fenouillet',
    ],
    secondaires: [
      'boxe Fenouillet',
      'salle de boxe Fenouillet',
      'boxe enfant Fenouillet',
      'Fenouilletain',
      '31150',
      'ligne 59',
    ],
  },
  {
    page: 'contact',
    prioritaires: ['Castelginest', 'contact'],
    secondaires: [
      'club de boxe près de Castelginest',
      'inscription boxe Castelginest',
      'séance d’essai boxe Castelginest',
    ],
  },
] as const;

export const cluster = (page: RouteId) => CLUSTERS.find((c) => c.page === page);

/**
 * Les motifs exacts, instanciés sur un lieu. Ils servent la liste de questions
 * des pages communes : à gauche la recherche telle qu'elle se tape, à droite
 * le fait qui y répond.
 */
export const motifs = (lieu: string) =>
  [
    `club de boxe ${lieu}`,
    `boxe anglaise ${lieu}`,
    `club MMA ${lieu}`,
    `salle MMA ${lieu}`,
    `sport de combat ${lieu}`,
    `club kick boxing ${lieu}`,
    `boxe pieds poings ${lieu}`,
    `club boxe thaï ${lieu}`,
  ] as const;
