/**
 * REGISTRE DES ROUTES — une page = une question que quelqu'un se pose vraiment.
 *
 * Aucune URL n'est écrite en dur ailleurs : on passe par `route('mma')`.
 * Titres et descriptions vivent ici parce qu'ils font partie de
 * l'architecture de recherche, pas de la mise en page.
 *
 * Ce club ne publie pas de grille tarifaire mais une séance d'essai : c'est
 * elle qui prend la place du lien « Tarifs » dans la navigation.
 *
 * La page pieds-poings porte le nom de ce que le club publie — « Boxe
 * pieds-poings » et « Full contact ». On ne titre pas une page sur une
 * discipline que la salle n'annonce pas.
 */

import { DESTINATION } from './verite';

export type RouteId =
  | 'accueil'
  | 'boxe-anglaise'
  | 'mma'
  | 'boxe-pieds-poings'
  | 'boxe-enfants'
  | 'preparation-physique'
  | 'premiere-seance'
  | 'ta-seance'
  | 'transports'
  | 'saint-alban'
  | 'launaguet'
  | 'aucamville'
  | 'fenouillet'
  | 'contact'
  | 'merci'
  | 'introuvable'
  | 'mentions-legales'
  | 'confidentialite';

export type Route = {
  id: RouteId;
  chemin: string;
  nav: string;
  question: string;
  titre: string;
  description: string;
  menu: boolean;
  index: boolean;
  commune?: true;
  promo?: true;
};

export const ROUTES: readonly Route[] = [
  {
    id: 'accueil',
    chemin: '/',
    nav: 'Accueil',
    question: 'Où boxer quand on habite Castelginest ?',
    titre: 'Club de boxe et MMA près de Castelginest | Boxing Center',
    description:
      'Boxe, MMA, grappling et sports de combat à proximité de Castelginest : le 60 rejoint le métro, le 59 finit avenue des États-Unis, où Boxing Center occupe 1 200 m².',
    menu: true,
    index: true,
  },
  {
    id: 'boxe-anglaise',
    chemin: '/boxe-anglaise/',
    nav: 'Boxe anglaise',
    question: 'À quoi ressemble un cours de boxe anglaise, et est-ce que je peux commencer ?',
    titre: 'Boxe anglaise près de Castelginest | Boxing Center',
    description:
      'Cours de boxe anglaise accessibles depuis Castelginest, sur deux rings de compétition. Aucun niveau demandé, et une école de boxe pour les enfants dès 3 ans.',
    menu: true,
    index: true,
  },
  {
    id: 'mma',
    chemin: '/mma/',
    nav: 'MMA',
    question: 'Où faire du MMA et du grappling quand on part de Castelginest ?',
    titre: 'Club MMA et grappling près de Castelginest | Boxing Center',
    description:
      'Salle MMA près de Castelginest : le MMA s’entraîne dans une cage officielle et sur 400 m² de tatamis, avec le grappling et le jiu-jitsu brésilien.',
    menu: true,
    index: true,
  },
  {
    id: 'boxe-pieds-poings',
    chemin: '/boxe-pieds-poings/',
    nav: 'Pieds-poings',
    question: 'Je veux frapper avec les jambes aussi. Où ?',
    titre: 'Kick-boxing et boxe thaï près de Castelginest | Boxing Center',
    description:
      'Pieds-poings, Muay Thai et full contact, sur deux rings de compétition et 400 m² de tapis. Accessible depuis Castelginest par le 60, le métro et le 59.',
    menu: true,
    index: true,
  },
  {
    id: 'boxe-enfants',
    chemin: '/boxe-enfants/',
    nav: 'Boxe enfants',
    question: 'Quelle boxe pour mon enfant, et est-ce que c’est sans danger ?',
    titre: 'Boxe enfant près de Castelginest | Boxing Center',
    description:
      'À un trajet de Castelginest, le club de l’avenue des États-Unis enseigne la boxe aux enfants en touché contrôlé ; jours et âges sur ses plannings de la semaine.',
    menu: true,
    index: true,
  },
  {
    id: 'preparation-physique',
    chemin: '/preparation-physique/',
    nav: 'Prépa physique',
    question: 'Je veux la forme, la muscu et le cardio, sans combattre.',
    titre: 'Cross-training près de Castelginest | Boxing Center',
    description:
      'Seize sacs de frappe, une cage de cross-training, musculation, cardio, Hyrox et Boxing Lady, sur 400 m². Accessible depuis Castelginest, avenue des États-Unis.',
    menu: true,
    index: true,
  },
  {
    id: 'premiere-seance',
    chemin: '/premiere-seance/',
    nav: 'Première séance',
    question: 'Je n’ai jamais boxé. Qu’est-ce qui va m’arriver ?',
    titre: 'Première séance de boxe près de Castelginest | Boxing Center',
    description:
      'Ce qu’il faut apporter, ce que tu vas faire et ce que tu ne feras pas : le déroulé d’un premier cours pour un débutant venu de Castelginest.',
    menu: false,
    index: false,
  },
  {
    id: 'ta-seance',
    chemin: '/ta-seance/',
    nav: 'Ta séance',
    question: 'Quelle discipline, à quel moment, pour moi ?',
    titre: 'Trouver ta séance depuis Castelginest | Boxing Center',
    description:
      'Deux réponses et tu sais quel cours viser avenue des États-Unis, et à quel moment de la semaine y aller depuis Castelginest.',
    menu: true,
    index: false,
  },
  {
    id: 'transports',
    chemin: '/transports/',
    nav: 'Transports',
    question: 'Comment j’y vais si je n’ai pas de voiture ?',
    titre: 'Y aller en bus et en métro depuis Castelginest | Boxing Center',
    description:
      'Le 60 rejoint Trois Cocus, le métro B descend à La Vache, et le 59 longe l’avenue des États-Unis jusqu’à l’arrêt « États-Unis Fondeyre ».',
    menu: true,
    index: true,
    promo: true,
  },
  {
    id: 'saint-alban',
    chemin: '/saint-alban/',
    nav: 'Saint-Alban',
    question: 'Et si je pars de Saint-Alban ?',
    titre: 'Club de boxe et MMA près de Saint-Alban (31140) | Boxing Center',
    description:
      'Le 60 part de Saint-Alban Centre Commercial et rejoint le métro ; le 59 finit avenue des États-Unis. Boxing Center y réunit boxe, MMA, grappling et prépa physique.',
    menu: false,
    index: true,
    commune: true,
  },
  {
    id: 'launaguet',
    chemin: '/launaguet/',
    nav: 'Launaguet',
    question: 'Et si je pars de Launaguet ?',
    titre: 'Club de boxe et MMA près de Launaguet (31140) | Boxing Center',
    description:
      'Le 60 dessert Launaguet et rejoint Trois Cocus ; le métro et le 59 finissent avenue des États-Unis. Boxe, MMA, grappling et préparation physique sur 1 200 m².',
    menu: false,
    index: true,
    commune: true,
  },
  {
    id: 'aucamville',
    chemin: '/aucamville/',
    nav: 'Aucamville',
    question: 'Et si je pars d’Aucamville ?',
    titre: 'Club de boxe et MMA près d’Aucamville (31140) | Boxing Center',
    description:
      'Le 69 relie Aucamville à La Vache, et le 59 y démarre pour longer l’avenue des États-Unis. Deux bus, un seul changement, et le club au bout.',
    menu: false,
    index: true,
    commune: true,
  },
  {
    id: 'fenouillet',
    chemin: '/fenouillet/',
    nav: 'Fenouillet',
    question: 'Et si je pars de Fenouillet ?',
    titre: 'Club de boxe et MMA près de Fenouillet (31150) | Boxing Center',
    description:
      'Le 59 relie Fenouillet Centre Commercial à l’avenue des États-Unis sans changement. Boxing Center y occupe 1 200 m² en trois espaces.',
    menu: false,
    index: true,
    commune: true,
  },
  {
    id: 'contact',
    chemin: '/contact/',
    nav: 'Contact',
    question: 'Je veux poser ma question à quelqu’un.',
    titre: 'Contact | Boxing Center depuis Castelginest',
    description:
      'Une question avant de te déplacer depuis Castelginest ? Écris-nous, on te répond avec le cours et le créneau qui correspondent. Téléphone : 09 39 03 67 48.',
    menu: true,
    index: false,
  },
  {
    id: 'merci',
    chemin: '/merci/',
    nav: 'Merci',
    question: 'Message envoyé.',
    titre: 'Message bien reçu | Boxing Center Castelginest',
    description: 'Ta demande est partie. On te répond rapidement.',
    menu: false,
    index: false,
  },
  {
    id: 'introuvable',
    chemin: '/404/',
    nav: 'Page introuvable',
    question: 'Cette adresse ne mène nulle part.',
    titre: 'Page introuvable | Boxing Center depuis Castelginest',
    description: 'Cette page n’existe pas ou a changé d’adresse. Voilà les pages du site.',
    menu: false,
    index: false,
  },
  {
    id: 'mentions-legales',
    chemin: '/mentions-legales/',
    nav: 'Mentions légales',
    question: 'Qui édite ce site ?',
    titre: 'Mentions légales | Boxing Center Castelginest',
    description: 'Mentions légales du site boxingcenter-castelginest.fr.',
    menu: false,
    index: false,
  },
  {
    id: 'confidentialite',
    chemin: '/confidentialite/',
    nav: 'Confidentialité',
    question: 'Qu’est-ce que vous faites de mes données ?',
    titre: 'Politique de confidentialité | Boxing Center Castelginest',
    description: 'Ce que devient une demande envoyée depuis boxingcenter-castelginest.fr.',
    menu: false,
    index: false,
  },
] as const;

export function route(id: RouteId): Route {
  const r = ROUTES.find((x) => x.id === id);
  if (!r) throw new Error(`Route inconnue : ${id}`);
  return r;
}

export const MENU = ROUTES.filter((r) => r.menu);

/** Les entrées de navigation ordinaires, hors pages mises en avant. */
export const MENU_SIMPLE = MENU.filter((r) => !r.promo);

/** La page mise en avant, s'il y en a une. */
export const PROMO = ROUTES.find((r) => r.promo);

/** Les pages de communes satellites, dans l'ordre du pied de page. */
export const ROUTES_COMMUNES = ROUTES.filter((r) => r.commune);

/**
 * Ce qui vit chez le club. Ici il ne publie pas de grille tarifaire : la porte
 * d'entrée qu'il met en avant est la séance d'essai. C'est donc elle qu'on
 * met dans la navigation, à sa place.
 */
export const LIENS_CLUB = [
  { nav: 'Plannings', href: DESTINATION.plannings, titre: `Voir les plannings ${DESTINATION.nom}` },
  { nav: 'Séance d’essai', href: DESTINATION.tarifs, titre: `Réserver une séance d’essai` },
] as const;
