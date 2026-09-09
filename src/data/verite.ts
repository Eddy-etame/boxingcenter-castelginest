/**
 * REGISTRE DE VÉRITÉ — Boxing Center depuis Castelginest.
 *
 * Un fait s'écrit ICI une fois, avec sa source et sa date, puis se projette
 * dans le HTML, les métadonnées, le JSON-LD, llms.txt, le formulaire et le
 * moteur. Aucun composant n'écrit un horaire, une adresse ou une URL en dur —
 * le contrôle de build le refuse.
 *
 * Un point d'attention sur ce site : le club de Toulouse États-Unis ne publie
 * PAS d'horaires d'ouverture, seulement trois plannings hebdomadaires. On ne
 * publie donc aucune heure. Les champs d'ouverture restent vides et le JSON-LD
 * n'annonce pas d'amplitude : inventer une heure enverrait quelqu'un devant
 * une porte fermée.
 */

export type Source = 'site-club' | 'wikipedia' | 'tisseo' | 'cahier-des-charges' | 'a-verifier';

export type Fait<T = string> = { valeur: T; source: Source; verifie: string };

/** Décidé par le client (Eddy, 2026-09-10) : le numéro et l'adresse que ce site affiche. */
const CDC = (v: string): Fait => ({ valeur: v, source: 'cahier-des-charges', verifie: '2026-09-10' });
const CLUB = (v: string): Fait => ({ valeur: v, source: 'site-club', verifie: '2026-09-09' });
const WIKI = (v: string): Fait => ({ valeur: v, source: 'wikipedia', verifie: '2026-09-09' });
const TISSEO = (v: string): Fait => ({ valeur: v, source: 'tisseo', verifie: '2026-09-09' });

/* ─────────────────────────────  LE SITE  ───────────────────────────── */

export const SITE = {
  origine: 'https://www.boxingcenter-castelginest.fr',
  nom: 'Boxing Center — depuis Castelginest',
  nomCourt: 'Boxing Center Castelginest',
  langue: 'fr-FR',
  /** Castelginest est le point de départ du visiteur, jamais une adresse de club. */
  ville: 'Castelginest',
  codePostal: '31780',
  gentile: 'Castelginestois',
  departement: 'Haute-Garonne',
  secteur: 'nord toulousain',
  /** L'accès en trois mots, pour le pied de hero. Jamais une distance. */
  accesCourt: 'Le 60, puis le 59',
  /** Le formulaire Inlet de CE site : une demande arrive triée par ville. */
  formulaire: '4b2768a2-0002-40c1-9a08-be9e4f50ac39',
} as const;

/* ─────────────────────────────  CONTACT  ───────────────────────────── */

export const CONTACT = {
  telephone: CDC('09 39 03 67 48'),
  telephoneLien: CDC('+33939036748'),
  email: CDC('boxingcenter31@gmail.com'),
} as const;

/* ─────────────────────────────  LE CLUB  ───────────────────────────── */

export type Club = {
  id: 'etats-unis';
  nom: string;
  nomCourt: string;
  ville: string;
  codePostal: string;
  adresse: string;
  telephone: string;
  telephoneLien: string;
  site: string;
  activites: string;
  plannings: string;
  /** ici, la porte d'entrée n'est pas une grille tarifaire mais la séance d'essai */
  tarifs: string;
  /** ce que le club publie à la place d'une amplitude : trois plannings */
  horaires: Fait;
  horairesCourt: string;
  /** vides : le club ne publie pas d'heures d'ouverture. On n'en invente pas. */
  ouverture: string;
  fermeture: string;
  ouvertureTexte: string;
  fermetureTexte: string;
  acces: string;
  singularite: string;
  faits: readonly { cle: string; valeur: string; source: string }[];
  angle: string;
};

export const CLUBS: readonly Club[] = [
  {
    id: 'etats-unis',
    nom: 'Boxing Center Toulouse États-Unis',
    nomCourt: 'Toulouse États-Unis',
    ville: 'Toulouse',
    codePostal: '31200',
    adresse: '388 avenue des États-Unis, 31200 Toulouse',
    telephone: '09 39 03 67 48',
    telephoneLien: '+33939036748',
    site: 'https://clubmma.fr/',
    activites:
      'https://clubmma.fr/disciplines/',
    plannings: 'https://clubmma.fr/planning/',
    tarifs: 'https://clubmma.fr/abonnements/',
    horaires: CLUB('sur trois plannings hebdomadaires — Boxe, Fitness et Sol'),
    horairesCourt: '3 plannings : Boxe · Fitness · Sol',
    ouverture: '',
    fermeture: '',
    ouvertureTexte: '',
    fermetureTexte: '',
    acces:
      'En bus, le 60 rejoint le métro à Trois Cocus ; une station plus loin, à La Vache, le 59 démarre et longe l’avenue des États-Unis jusqu’à l’arrêt « États-Unis Fondeyre ». En voiture, la D820 puis le périphérique, sortie 33b « Lalande ».',
    singularite:
      'La plus grande salle de France dédiée aux sports de combat, selon le club : 1 200 m² d’entraînement en trois zones de 400 m².',
    faits: [
      { cle: 'Bus', valeur: '60 puis 59', source: 'Tisséo' },
      { cle: 'Surface', valeur: '1 200 m²', source: 'boxingcenter.fr' },
      { cle: 'Espaces', valeur: '3 zones de 400 m²', source: 'boxingcenter.fr' },
      { cle: 'Équipement', valeur: '2 rings, 1 cage, 16 sacs', source: 'boxingcenter.fr' },
      { cle: 'Plannings', valeur: '3 publiés', source: 'boxingcenter.fr' },
    ],
    angle:
      'Le club qui réunit toutes les disciplines du réseau en un seul lieu : un espace striking et sol avec cage surélevée, un espace boxe à deux rings, un espace préparation physique à seize sacs.',
  },
] as const;

export const club = (id: Club['id'] = 'etats-unis'): Club => {
  const c = CLUBS.find((x) => x.id === id);
  if (!c) throw new Error(`Club inconnu : ${id}`);
  return c;
};

/** Le club de destination du site. Une seule destination ici. */
export const DESTINATION = CLUBS[0];

/* ──────────────────────  CASTELGINEST, LES FAITS  ───────────────────── */

export const VILLE = {
  population: WIKI('11 271 habitants (2023)'),
  statut: WIKI('commune de Toulouse Métropole'),
  distance: WIKI('au nord de Toulouse, sur l’axe de la D820'),
  rivieres: WIKI('l’Hers-Mort, qui traverse la commune'),
  routes: WIKI('la D820, et l’A62 à la sortie 11 « Saint-Jory »'),
  bus: TISSEO('les lignes Tisséo 26, 60, 69 et 113'),
  /** Le fait local qui donne son identité au site. */
  figure: WIKI('le pigeonnier du parc de Mauvezin'),
  histoire: WIKI(
    'le fort du village naît d’un accord passé en 1368 entre la communauté d’habitants et l’abbé de Saint-Sernin ; l’église Saint-Étienne, élevée en 1542, a été restaurée entre 2010 et 2013'
  ),
} as const;

/**
 * La phrase qui relie le secteur au club, quand un fait honnête le permet.
 */
export const NOTE_SECTEUR =
  'Le 60 part de Castelginest et finit au métro. À La Vache, le 59 prend le relais et longe l’avenue des États-Unis, où se trouve le club.';

/** Les sept communes limitrophes. */
export const LIMITROPHES: readonly { nom: string; note?: string }[] = [
  { nom: 'Bruguières' },
  { nom: 'Fonbeauzard' },
  { nom: 'Gratentour' },
  { nom: 'Launaguet', note: 'sur le trajet du 60' },
  { nom: 'Pechbonnieu' },
  { nom: 'Saint-Alban', note: 'au terminus du 60' },
  { nom: 'Saint-Loup-Cammas' },
] as const;

/* ─────────────────────────  CE QU'ON NE DIT PAS  ───────────────────── */

/** Laisser croire qu'une salle est DANS Castelginest. Refusé au build. */
export const INTERDIT: readonly string[] = [
  'salle de Castelginest',
  'notre salle à Castelginest',
  'notre club à Castelginest',
  'situé à Castelginest',
  'située à Castelginest',
  'basé à Castelginest',
  'Boxing Center Castelginest vous accueille',
];

/** Vendre l'absence. La faute la plus coûteuse. Refusée au build. */
export const VENTE_NEGATIVE: readonly string[] = [
  'pas de salle',
  'pas de club',
  'aucune salle',
  'aucun club',
  'n’existe pas de salle',
  "n'existe pas de salle",
];

/** Formulations justes, à reprendre telles quelles. */
export const FORMULATIONS = [
  'club de boxe à proximité de Castelginest',
  'club de MMA près de Castelginest',
  'cours accessibles depuis Castelginest',
  'Boxing Center accueille les Castelginestois dans son club de Toulouse États-Unis',
] as const;
