/**
 * REGISTRE DES COMMUNES SATELLITES.
 *
 * Une page par commune, et le contrat qui les rend légitimes : le test du
 * remplacement. Si l'on remplace le nom de la commune par un autre et que la
 * page reste vraie, la page n'a pas le droit d'exister.
 *
 * Chaque entrée porte sa population datée, son gentilé, son code INSEE, son
 * intercommunalité, ses VRAIES communes limitrophes, les lignes qui la relient
 * au club, et une information pratique qui sert à décider.
 *
 * Géographie relevée sur Wikipédia le 2026-09-09, lignes relevées sur les
 * fiches horaires Tisséo le même jour.
 */

import type { MediaSlug } from './medias';

export type CommuneId = 'saint-alban' | 'launaguet' | 'aucamville' | 'fenouillet';

export type Commune = {
  id: CommuneId;
  nom: string;
  gentile: string;
  codePostal: string;
  insee: string;
  population: string;
  intercommunalite: string;
  limitrophes: readonly string[];
  /** vrai si la commune touche celle du site */
  toucheLeClub: boolean;
  situation: string;
  route: string;
  transport: string;
  faitLocal: string;
  faitLocalEcho: string;
  photo: MediaSlug;
  cotes: readonly { cle: string; valeur: string }[];
  titre: string;
  description: string;
  faq: readonly { titre: string; texte: string }[];
  pont?: { texte: string; ancre: string; href: string };
};

export const COMMUNES: readonly Commune[] = [
  {
    id: 'saint-alban',
    nom: 'Saint-Alban',
    gentile: 'Saint-Albanais',
    codePostal: '31140',
    insee: '31467',
    population: '6 534 habitants (2023)',
    intercommunalite: 'Toulouse Métropole',
    limitrophes: ['Aucamville', 'Bruguières', 'Castelginest', 'Fenouillet', 'Fonbeauzard', 'Lespinasse'],
    toucheLeClub: true,
    situation:
      'Saint-Alban touche Castelginest, et le 60 démarre chez toi : son terminus s’appelle Saint-Alban Centre Commercial. Tu montes au départ, tu descends à Trois Cocus, sur le métro.',
    route:
      'Par la D820, puis le périphérique nord et la sortie 33b « Lalande ». Le club est sur l’avenue des États-Unis, juste après.',
    transport:
      'Le 60 part de Saint-Alban Centre Commercial et finit à Trois Cocus. Le L10, le 59, le 69 et le 113 desservent aussi la commune.',
    faitLocal:
      'Le terminus du 60 est ici. C’est la seule commune du secteur où tu montes dans le bus au départ : la place assise est garantie, et la direction est écrite sur le pare-brise.',
    faitLocalEcho:
      'À La Vache, le 59 prend le relais et longe l’avenue des États-Unis jusqu’au club.',
    photo: 'ring-de-boxe-castelginest',
    cotes: [
      { cle: 'Bus', valeur: '60, au terminus' },
      { cle: 'Route', valeur: 'D820 · périph. 33b' },
      { cle: 'Arrivée', valeur: 'États-Unis Fondeyre' },
      { cle: 'Le club', valeur: '1 200 m², 3 espaces' },
    ],
    titre: 'Club de boxe et MMA près de Saint-Alban (31140) | Boxing Center',
    description:
      'Le 60 part de Saint-Alban Centre Commercial et rejoint le métro ; le 59 finit avenue des États-Unis. Boxing Center y réunit boxe, MMA, grappling et préparation physique.',
    faq: [
      {
        titre: 'Depuis Saint-Alban, comment on y va ?',
        texte:
          'Le 60 démarre à Saint-Alban Centre Commercial et finit à Trois Cocus, sur le métro B. Une station plus loin, La Vache : le 59 y démarre et longe l’avenue des États-Unis. Descends à « États-Unis Fondeyre ». En voiture, la D820 puis le périphérique, sortie 33b « Lalande ».',
      },
      {
        titre: 'Saint-Alban et Castelginest, c’est le même club ?',
        texte:
          'Le même, et la même ligne pour y aller. Saint-Alban touche Castelginest, et le 60 relie les deux communes avant de rejoindre le métro.',
      },
      {
        titre: 'Qu’est-ce qu’on peut y pratiquer ?',
        texte:
          'La salle réunit toutes les disciplines du réseau : boxe anglaise et pieds-poings sur deux rings de compétition, MMA et grappling sur 400 m² de tatamis avec une cage surélevée, et un espace préparation physique avec seize sacs, musculation, cardio, cross-training et Hyrox.',
      },
      {
        titre: 'Mon enfant peut s’inscrire ?',
        texte:
          'Le club publie des cours enfants. Les jours et les tranches d’âge figurent sur ses plannings hebdomadaires — c’est la seule source à jour.',
      },
    ],
  },
  {
    id: 'launaguet',
    nom: 'Launaguet',
    gentile: 'Launaguetois',
    codePostal: '31140',
    insee: '31282',
    population: '9 173 habitants (2023)',
    intercommunalite: 'Toulouse Métropole',
    limitrophes: [
      'Aucamville',
      'Castelginest',
      'Fonbeauzard',
      'Saint-Geniès-Bellevue',
      'Saint-Loup-Cammas',
      'Toulouse',
      'L’Union',
    ],
    toucheLeClub: true,
    situation:
      'Launaguet touche Castelginest et touche Toulouse : le 60 passe chez toi en descendant vers le métro. Mairie Launaguet, Chalets, Mirabelles, Renée Aspe — quatre arrêts avant Trois Cocus.',
    route:
      'Par la route de Fronton et la D820, puis le périphérique nord, sortie 33b « Lalande ».',
    transport:
      'Le 60 dessert Launaguet en descendant vers Trois Cocus. Les lignes 26, 33, 42 et 61 relient aussi la commune à Borderouge, aux Argoulets et à Trois Cocus.',
    faitLocal:
      'Launaguet est la dernière commune avant Toulouse sur le tracé du 60. Tu montes déjà à mi-chemin : le bus arrive au métro peu après.',
    faitLocalEcho:
      'À La Vache, le 59 démarre et longe l’avenue des États-Unis jusqu’à « États-Unis Fondeyre ».',
    photo: 'sparring-boxe-castelginest',
    cotes: [
      { cle: 'Bus', valeur: '60, puis le métro' },
      { cle: 'Route', valeur: 'D820 · périph. 33b' },
      { cle: 'Arrivée', valeur: 'États-Unis Fondeyre' },
      { cle: 'Le club', valeur: '2 rings, 1 cage, 16 sacs' },
    ],
    titre: 'Club de boxe et MMA près de Launaguet (31140) | Boxing Center',
    description:
      'Le 60 dessert Launaguet et rejoint Trois Cocus ; le métro et le 59 finissent avenue des États-Unis. Boxing Center y réunit boxe, MMA, grappling et préparation physique.',
    faq: [
      {
        titre: 'Depuis Launaguet, comment on y va ?',
        texte:
          'Le 60 passe par Mairie Launaguet, Chalets, Mirabelles et Renée Aspe, puis finit à Trois Cocus, sur le métro B. Une station plus loin, à La Vache, le 59 démarre et longe l’avenue des États-Unis jusqu’à « États-Unis Fondeyre ».',
      },
      {
        titre: 'Launaguet touche Castelginest ?',
        texte:
          'Oui, et Toulouse aussi. La commune est entre les deux, et le 60 fait exactement ce trajet : Castelginest, Launaguet, puis le métro.',
      },
      {
        titre: 'Qu’est-ce qu’il y a dans la salle ?',
        texte:
          'Trois espaces de 400 m² : le MMA et le grappling avec une cage surélevée officielle, la boxe avec deux rings de compétition, et la préparation physique avec seize sacs de frappe, musculation, cardio et cross-training.',
      },
      {
        titre: 'Je n’ai jamais boxé.',
        texte:
          'C’est le cas de la plupart des gens qui poussent la porte. Une première séance se passe au sac, à la corde et aux pattes d’ours : tu frappes, personne ne te frappe.',
      },
    ],
  },
  {
    id: 'aucamville',
    nom: 'Aucamville',
    gentile: 'Aucamvillois',
    codePostal: '31140',
    insee: '31022',
    population: '9 623 habitants (2023)',
    intercommunalite: 'Toulouse Métropole',
    limitrophes: ['Fenouillet', 'Fonbeauzard', 'Launaguet', 'Saint-Alban', 'Toulouse'],
    toucheLeClub: false,
    situation:
      'Aucamville est la commune du secteur qui rejoint le club avec deux bus et rien d’autre. Le 69 relie Mairie Aucamville à La Vache, et c’est de La Vache que part le 59.',
    route:
      'Par la route de Fronton et la D820, puis le périphérique nord, sortie 33b « Lalande ».',
    transport:
      'Le 69 dessert Gaussen, Salvy, Église Aucamville, Mairie Aucamville, Favasse et Aucamville Collège, et finit à La Vache. Le L10, le 29, le 59 et le 169 desservent aussi la commune.',
    faitLocal:
      'Le 69 et le 59 se croisent à La Vache : tu descends d’un bus et tu montes dans l’autre au même endroit. C’est le seul trajet du secteur qui se fait entièrement en bus.',
    faitLocalEcho:
      'Le 59 longe ensuite l’avenue des États-Unis, et son troisième arrêt s’appelle « États-Unis Fondeyre ».',
    photo: 'preparation-physique-castelginest',
    cotes: [
      { cle: 'Bus', valeur: '69 puis 59' },
      { cle: 'Changement', valeur: 'un seul, à La Vache' },
      { cle: 'Arrivée', valeur: 'États-Unis Fondeyre' },
      { cle: 'Le club', valeur: '1 200 m², 3 espaces' },
    ],
    titre: 'Club de boxe et MMA près d’Aucamville (31140) | Boxing Center',
    description:
      'Le 69 relie Aucamville à La Vache, et le 59 y démarre pour longer l’avenue des États-Unis. Boxing Center y réunit boxe, MMA, grappling et préparation physique.',
    faq: [
      {
        titre: 'Depuis Aucamville, comment on y va ?',
        texte:
          'Deux bus. Le 69 relie Mairie Aucamville à La Vache, son terminus. Tu descends, tu prends le 59 qui démarre là, et son troisième arrêt s’appelle « États-Unis Fondeyre ». Le club est au 388 de cette avenue.',
      },
      {
        titre: 'Il faut prendre le métro ?',
        texte:
          'Le trajet se fait en bus de bout en bout : le 69, puis le 59, avec un seul changement à La Vache. Le métro reste une option si tu arrives de Toulouse, puisque La Vache est aussi une station de la ligne B.',
      },
      {
        titre: 'Qu’est-ce qu’on peut y pratiquer ?',
        texte:
          'Boxe anglaise et pieds-poings sur deux rings de compétition, MMA et grappling sur 400 m² de tatamis avec une cage surélevée officielle, et un espace préparation physique de 400 m² : seize sacs, musculation, cardio, cross-training et Hyrox.',
      },
      {
        titre: 'Je viens pour la forme, sans combattre.',
        texte:
          'C’est prévu. L’espace préparation physique se pratique sans jamais monter sur un ring : sacs, musculation, cardio, cage de cross-training, et un coach spécialisé en callisthénie sur les entraînements en accès libre.',
      },
    ],
  },
  {
    id: 'fenouillet',
    nom: 'Fenouillet',
    gentile: 'Fenouilletain',
    codePostal: '31150',
    insee: '31182',
    population: '5 784 habitants (2023)',
    intercommunalite: 'Toulouse Métropole',
    limitrophes: [
      'Aucamville',
      'Beauzelle',
      'Blagnac',
      'Gagnac-sur-Garonne',
      'Lespinasse',
      'Saint-Alban',
      'Seilh',
      'Toulouse',
    ],
    toucheLeClub: false,
    situation:
      'Fenouillet est la commune la mieux placée de tout le secteur : le 59 s’arrête à Fenouillet Centre Commercial, aux deux entrées, puis descend toute l’avenue des États-Unis. Un seul bus, du départ à l’arrivée.',
    route:
      'Par la D820, puis le périphérique nord et la sortie 33b « Lalande ». Le club est sur l’avenue des États-Unis, juste après.',
    transport:
      'Le 59 relie Fenouillet Centre Commercial à La Vache en longeant l’avenue des États-Unis. Le L10, le 113 et le 130 desservent aussi la commune.',
    faitLocal:
      'Le 59 fait tout le trajet. Tu montes à Fenouillet Centre Commercial, tu descends à « États-Unis Fondeyre » : c’est le seul itinéraire du secteur sans changement.',
    faitLocalEcho:
      'Le club est au 388 de cette avenue, à côté de la sortie 33b du périphérique.',
    photo: 'sac-de-frappe-castelginest',
    cotes: [
      { cle: 'Bus', valeur: '59, sans changement' },
      { cle: 'Route', valeur: 'D820 · périph. 33b' },
      { cle: 'Arrivée', valeur: 'États-Unis Fondeyre' },
      { cle: 'Le club', valeur: '2 rings, 1 cage, 16 sacs' },
    ],
    titre: 'Club de boxe et MMA près de Fenouillet (31150) | Boxing Center',
    description:
      'Le 59 relie Fenouillet Centre Commercial à l’avenue des États-Unis sans changement. Boxing Center y réunit boxe, MMA, grappling et préparation physique sur 1 200 m².',
    faq: [
      {
        titre: 'Depuis Fenouillet, comment on y va ?',
        texte:
          'Un seul bus : le 59. Il dessert Fenouillet Centre Commercial aux deux entrées, puis descend toute l’avenue des États-Unis. Tu descends à « États-Unis Fondeyre » et le club est au 388.',
      },
      {
        titre: 'Il y a un changement ?',
        texte:
          'Le 59 fait le trajet complet. C’est la ligne qui dessert à la fois Fenouillet et l’avenue où se trouve le club.',
      },
      {
        titre: 'Qu’est-ce qu’il y a dans la salle ?',
        texte:
          'Trois espaces de 400 m² : le MMA et le grappling avec une cage surélevée officielle, la boxe avec deux rings de compétition, et la préparation physique avec seize sacs de frappe, musculation, cardio et cross-training.',
      },
      {
        titre: 'Je suis débutant complet.',
        texte:
          'C’est le profil le plus fréquent chez les nouveaux inscrits. La même séance existe à trois intensités, et c’est le coach qui règle la tienne.',
      },
    ],
  },
] as const;

export const commune = (id: CommuneId): Commune => {
  const c = COMMUNES.find((x) => x.id === id);
  if (!c) throw new Error(`Commune inconnue : ${id}`);
  return c;
};

/** Les communes servies, pour `areaServed` de l'Organization. */
export const AIRE_SERVIE: readonly string[] = COMMUNES.map((c) => c.nom);
