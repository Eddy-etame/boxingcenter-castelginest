/**
 * REGISTRE DES TRANSPORTS — les itinéraires qui déposent au club.
 *
 * La règle est stricte : une ligne n'entre ici que si elle fait avancer
 * quelqu'un jusqu'au 388 avenue des États-Unis. Chaque étape a été relevée sur
 * la fiche horaire Tisséo de la ligne, le 2026-09-09 :
 *
 *   60  Trois Cocus ⇄ Saint-Alban Centre Commercial — six arrêts à
 *       Castelginest : École Castelginest, Alphonse Daudet, Tour Totier,
 *       Pradelle, Mairie Castelginest, Pont Vieil. Puis Launaguet.
 *   59  La Vache ⇄ Saint-Jory Collège — « États-Unis Fondeyre » est son
 *       troisième arrêt, et elle dessert Fenouillet Centre Commercial.
 *   15  Jeanne d'Arc ⇄ États-Unis Fondeyre — l'arrêt du club est son terminus,
 *       et elle passe par Barrière de Paris, station du métro B.
 *   69  La Vache ⇄ Bruguières Verger — par Aucamville.
 *
 * Ce qu'on n'écrit JAMAIS ici : un horaire, une fréquence à la minute, une
 * durée de trajet. Chaque étape porte le lien vers sa page officielle.
 */

export type Mode = 'bus' | 'metro' | 'train';

export type Etape = {
  mode: Mode;
  code: string;
  de: string;
  a: string;
  precision?: string;
  jours: string;
  href: string;
};

export type Itineraire = {
  id: string;
  onglet: string;
  titre: string;
  resume: string;
  mode: Mode;
  etapes: readonly Etape[];
  meilleur?: true;
};

export const RESEAU = {
  nom: 'Tisséo',
  site: 'https://www.tisseo.fr/',
  itineraire: 'https://www.tisseo.fr/se-deplacer/itineraires',
} as const;

export const LIBELLE_MODE: Record<Mode, string> = {
  bus: 'Bus',
  metro: 'Métro',
  train: 'Train',
};

export const ARRIVEE = {
  arret: 'États-Unis Fondeyre',
  rue: 'avenue des États-Unis',
  phrase: 'Tu descends à « États-Unis Fondeyre ». Le club est au 388 de cette avenue.',
} as const;

const LIGNE_60: Etape = {
  mode: 'bus',
  code: '60',
  de: 'Mairie Castelginest',
  a: 'Trois Cocus',
  precision: 'le 60 s’arrête six fois à Castelginest, puis finit au métro',
  jours: 'tous les jours',
  href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-60',
};

const LIGNE_59: Etape = {
  mode: 'bus',
  code: '59',
  de: 'La Vache',
  a: 'États-Unis Fondeyre',
  precision: 'troisième arrêt après le départ',
  jours: 'toute la semaine',
  href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-59',
};

const METRO_VACHE: Etape = {
  mode: 'metro',
  code: 'B',
  de: 'Trois Cocus',
  a: 'La Vache',
  precision: 'une seule station, et le 59 part de là',
  jours: 'sept jours sur sept',
  href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-b',
};

/** Le titre de la page, ligne par ligne. La dernière porte l'accent. */
export const TITRE = [
  'Le 60 t’amène au métro.',
  'Le 59 longe l’avenue',
  'et s’arrête au club.',
] as const;

/** Le chapeau : ce que fait le meilleur trajet, en une phrase. */
export const CHAPEAU =
  'Depuis Castelginest, le 60 s’arrête six fois dans la commune et finit à Trois Cocus. Une station de métro plus loin, à La Vache, le 59 démarre : il longe l’avenue des États-Unis et marque l’arrêt « États-Unis Fondeyre », dans le quartier du club. En voiture, c’est la D820 puis le périphérique, sortie 33b « Lalande ».';

export const ITINERAIRES: readonly Itineraire[] = [
  {
    id: 'soixante',
    onglet: 'Le 60, le métro, le 59',
    titre: 'De Castelginest à l’avenue des États-Unis.',
    resume:
      'Le 60 s’arrête six fois à Castelginest, de l’École à Pont Vieil, et finit à Trois Cocus sur le métro B. Une station plus loin, La Vache : le 59 y démarre, longe l’avenue des États-Unis, et son troisième arrêt s’appelle « États-Unis Fondeyre ».',
    mode: 'bus',
    meilleur: true,
    etapes: [LIGNE_60, METRO_VACHE, LIGNE_59],
  },
  {
    id: 'quinze',
    onglet: 'Le 60, le métro, le 15',
    titre: 'La variante qui finit à l’arrêt du club.',
    resume:
      'Même départ : le 60 jusqu’à Trois Cocus. Deux stations de métro cette fois, jusqu’à Barrière de Paris, où le 15 attend. Ce bus se termine à « États-Unis Fondeyre » — tu descends au terminus, tu ne peux pas le manquer. Il roule du lundi au samedi.',
    mode: 'bus',
    etapes: [
      LIGNE_60,
      {
        mode: 'metro',
        code: 'B',
        de: 'Trois Cocus',
        a: 'Barrière de Paris',
        precision: 'deux stations, et le 15 part de là',
        jours: 'sept jours sur sept',
        href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-b',
      },
      {
        mode: 'bus',
        code: '15',
        de: 'Barrière de Paris',
        a: 'États-Unis Fondeyre',
        precision: 'terminus de la ligne',
        jours: 'du lundi au samedi',
        href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-15',
      },
    ],
  },
  {
    id: 'fenouillet',
    onglet: 'Depuis Fenouillet : le 59 seul',
    titre: 'Un seul bus, de Fenouillet au club.',
    resume:
      'Le 59 dessert Fenouillet Centre Commercial, aux deux entrées, et descend ensuite toute l’avenue des États-Unis. Tu montes une fois, tu descends à « États-Unis Fondeyre ». C’est le trajet le plus court de tout le secteur.',
    mode: 'bus',
    etapes: [
      {
        mode: 'bus',
        code: '59',
        de: 'Fenouillet Ctre Cial',
        a: 'États-Unis Fondeyre',
        precision: 'sans changement',
        jours: 'toute la semaine',
        href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-59',
      },
    ],
  },
  {
    id: 'aucamville',
    onglet: 'Depuis Aucamville : deux bus',
    titre: 'Le 69 puis le 59, sans métro.',
    resume:
      'Le 69 part de La Vache et remonte par Gaussen, Salvy, Église Aucamville, Mairie Aucamville, Favasse et Aucamville Collège. Tu le prends dans l’autre sens jusqu’à La Vache, tu descends, et le 59 t’emmène avenue des États-Unis. Deux bus, pas de métro.',
    mode: 'bus',
    etapes: [
      {
        mode: 'bus',
        code: '69',
        de: 'Mairie Aucamville',
        a: 'La Vache',
        precision: 'terminus du 69, départ du 59',
        jours: 'du lundi au samedi',
        href: 'https://www.tisseo.fr/nos-mobilites/transports-en-commun/ligne-69',
      },
      LIGNE_59,
    ],
  },
];

export const itineraire = (id: string) => {
  const i = ITINERAIRES.find((x) => x.id === id);
  if (!i) throw new Error(`Itinéraire inconnu : ${id}`);
  return i;
};

export const MEILLEUR = ITINERAIRES.find((i) => i.meilleur) ?? ITINERAIRES[0];

export const RESUME = 'Le 60 jusqu’au métro, puis le 59 jusqu’à l’avenue des États-Unis';

export type Depart = { depuis: string; itineraire: string; texte: string };

export const DEPARTS: readonly Depart[] = [
  {
    depuis: 'Castelginest',
    itineraire: 'soixante',
    texte:
      'Le 60 passe par l’École, Alphonse Daudet, Tour Totier, Pradelle, la Mairie et Pont Vieil, puis finit à Trois Cocus. Une station de métro, et le 59 fait le reste.',
  },
  {
    depuis: 'Saint-Alban',
    itineraire: 'soixante',
    texte:
      'Le 60 démarre à Saint-Alban Centre Commercial : tu montes au terminus, tu restes assis jusqu’à Trois Cocus. Ensuite, une station de métro et le 59.',
  },
  {
    depuis: 'Launaguet',
    itineraire: 'soixante',
    texte:
      'Le 60 dessert Mairie Launaguet, Chalets, Mirabelles et Renée Aspe avant de rejoindre Trois Cocus. Même suite : le métro une station, puis le 59.',
  },
  {
    depuis: 'Aucamville',
    itineraire: 'aucamville',
    texte:
      'Le 69 relie Aucamville à La Vache, et le 59 y démarre. Deux bus, un seul changement, aucun métro.',
  },
  {
    depuis: 'Fenouillet',
    itineraire: 'fenouillet',
    texte:
      'Le 59 dessert Fenouillet Centre Commercial et descend toute l’avenue des États-Unis. Un seul bus, de bout en bout.',
  },
];

export const AVERTISSEMENT =
  'Les horaires changent d’une saison à l’autre. On te dit quelles lignes prendre ; pour l’heure exacte, ouvre la fiche Tisséo — le lien est juste à côté de chaque étape.';
