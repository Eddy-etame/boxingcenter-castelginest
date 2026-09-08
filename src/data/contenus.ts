/**
 * CONTENU ÉDITORIAL des pages disciplines.
 *
 * Comment on écrit ici : des phrases courtes, adressées au lecteur, dans
 * l'ordre où il se pose les questions. Ce que c'est, où c'est, ce qui va lui
 * arriver, comment il y va. Pas d'images, pas de formules — de l'information.
 *
 * Deux règles de la loi commune s'appliquent ligne à ligne : aucune figure de
 * style, et aucune réponse qui s'ouvre sur une négation. Une réponse commence
 * par ce qui est vrai.
 *
 * Aucun fait volatil dans ce fichier. Et aucune heure : ce club publie trois
 * plannings hebdomadaires, pas une amplitude d'ouverture. On renvoie donc
 * toujours au planning.
 */

import type { MediaSlug } from './medias';
import type { PageDiscipline } from './offres';

export type Bloc = { titre: string; texte: string };

export type Contenu = {
  id: PageDiscipline;
  h1: string;
  chapeau: string;
  photoHero: MediaSlug;
  photoSecondaire: MediaSlug;
  promesse: string;
  blocs: readonly Bloc[];
  seance: readonly string[];
  faq: readonly Bloc[];
};

export const CONTENUS: readonly Contenu[] = [
  {
    id: 'boxe-anglaise',
    h1: 'Cours de boxe anglaise à proximité de Castelginest',
    chapeau:
      'La boxe anglaise se pratique aux poings, avec des gants, encadré. Aucun niveau n’est demandé pour commencer. Depuis Castelginest, le 60 t’amène au métro et le 59 finit avenue des États-Unis, dans un espace boxe de 400 m² équipé de deux rings de compétition.',
    photoHero: 'boxe-anglaise-castelginest',
    photoSecondaire: 'encadrement-boxe-castelginest',
    promesse: 'Apprendre à boxer, encadré, sans rien avoir à prouver à personne.',
    blocs: [
      {
        titre: 'Quatre coups à apprendre',
        texte:
          'Le direct, le crochet, l’uppercut, et le jab qui prépare tout le reste. Ça paraît peu, et c’est ce qui rend la boxe dense : avec quatre coups, tout se joue dans les appuis, la distance et la garde. C’est un sport de placement plus que de puissance.',
      },
      {
        titre: 'Le premier jour, tu frappes et c’est tout',
        texte:
          'L’opposition arrive plus tard, et seulement si tu la veux. Un débutant travaille au sac, à la corde, aux pattes d’ours avec un coach, et sur le déplacement à vide. Beaucoup s’entraînent des mois en restant sur ce format.',
      },
      {
        titre: 'Deux rings de compétition',
        texte:
          'L’espace boxe fait 400 m², avec deux rings et du tapis d’entraînement autour. Deux rings, ça veut dire que le cours avance sans file d’attente : le groupe compétiteurs amateurs peut travailler pendant que le reste de la salle enchaîne.',
      },
      {
        titre: 'Comment tu y vas',
        texte:
          'En bus, le 60 rejoint Trois Cocus. Une station de métro plus loin, à La Vache, le 59 démarre et longe l’avenue des États-Unis jusqu’à « États-Unis Fondeyre ». En voiture, la D820 puis le périphérique, sortie 33b « Lalande ».',
      },
    ],
    seance: [
      'Échauffement : corde, mobilité, déplacements à vide',
      'Technique : un geste, décomposé, répété lentement puis en rythme',
      'Sac ou pattes d’ours : l’application, avec correction du coach',
      'Renforcement : gainage, abdominaux, poids du corps',
      'Retour au calme et étirements',
    ],
    faq: [
      {
        titre: 'Où ça se passe exactement ?',
        texte:
          'Au 388 avenue des États-Unis, à Toulouse, à côté de la sortie 33b « Lalande » du périphérique. La salle fait 1 200 m² répartis en trois espaces de 400 m².',
      },
      {
        titre: 'Je suis débutant complet, à 40 ans passés. C’est trop tard ?',
        texte:
          'C’est le profil le plus fréquent chez les nouveaux inscrits. La même séance existe à trois intensités, et c’est le coach qui règle la tienne. Ce qui compte, c’est le nombre de fois où tu reviens.',
      },
      {
        titre: 'Où sont les horaires ?',
        texte:
          'Le club publie trois plannings hebdomadaires : Boxe, Fitness et Sol. C’est là que se trouvent les jours et les heures de chaque cours, et c’est la seule source à jour.',
      },
      {
        titre: 'C’est quoi le groupe compétiteurs ?',
        texte:
          'Un créneau publié pour les compétiteurs amateurs, qui préparent les combats. On y va si on le décide : c’est un choix, jamais un passage obligé.',
      },
    ],
  },
  {
    id: 'mma',
    h1: 'Grappling et travail au sol à proximité de Castelginest',
    chapeau:
      'Le travail au sol, c’est le contrôle, les projections et les soumissions — aucune frappe. Depuis Castelginest, il se pratique avenue des États-Unis, sur 400 m² de tatamis, avec une cage surélevée officielle et des panneaux de séparation pour travailler le cage control.',
    photoHero: 'sparring-boxe-castelginest',
    photoSecondaire: 'ring-de-boxe-castelginest',
    promesse: 'Le combat, sans l’impact — sur les plus grands tatamis du réseau.',
    blocs: [
      {
        titre: 'Le grappling, coups exclus',
        texte:
          'Contrôle, projections, soumissions. Le règlement exclut la frappe, du début à la fin. C’est la porte d’entrée de beaucoup de gens qui veulent le combat sans l’impact — et c’est aussi ce qui décide la majorité des combats de MMA.',
      },
      {
        titre: 'À quoi sert la cage',
        texte:
          'La paroi fait partie du jeu. On y travaille les appuis contre le grillage, les relevés, les sorties de contrôle. La salle est équipée d’une cage surélevée officielle et de panneaux de séparation, pour travailler ces situations sans mobiliser toute la cage.',
      },
      {
        titre: '400 m² de tatamis',
        texte:
          'C’est ce qui change tout sur un cours au sol : la place. Plusieurs binômes travaillent en même temps avec de la marge autour, et le coach circule vraiment. L’espace est aussi protégé aux murs.',
      },
      {
        titre: 'Comment tu y vas',
        texte:
          'Le 60 depuis Castelginest, le métro B sur une station, puis le 59 jusqu’à « États-Unis Fondeyre ». En voiture, la D820 et le périphérique, sortie 33b « Lalande ».',
      },
    ],
    seance: [
      'Échauffement spécifique : nuque, hanches, déplacements au sol',
      'Chutes et relevés, décomposés',
      'Un contrôle : la position, les appuis, la sortie',
      'Une soumission, montrée puis répétée par deux',
      'Mise en situation encadrée, puis retour au calme',
    ],
    faq: [
      {
        titre: 'Où est la salle de grappling la plus proche de Castelginest ?',
        texte:
          'Au 388 avenue des États-Unis, à Toulouse. L’espace dédié fait 400 m² de tatamis, avec une cage surélevée officielle.',
      },
      {
        titre: 'On peut débuter sans rien connaître ?',
        texte:
          'Oui. Un débutant apprend à chuter, à se relever, à tenir une position. L’intensité se règle, et le règlement exclut la frappe. C’est le cours le plus simple à essayer quand on arrive d’un autre sport.',
      },
      {
        titre: 'Grappling ou boxe : par lequel commencer ?',
        texte:
          'Si l’idée de recevoir un coup te bloque, commence par le sol. Si c’est la frappe qui t’attire, va sur l’espace boxe. La salle réunit les deux, tu peux changer d’avis en restant dans le même club.',
      },
      {
        titre: 'C’est quoi le cage control ?',
        texte:
          'Tout ce qui se joue contre la paroi : plaquer, tenir, se relever, sortir. La salle a des panneaux de séparation pour travailler ces situations en dehors de la cage.',
      },
    ],
  },
  {
    id: 'boxe-pieds-poings',
    h1: 'Boxe pieds-poings et full contact à proximité de Castelginest',
    chapeau:
      'La boxe pieds-poings ajoute les jambes aux poings. Le club publie aussi le full contact, un règlement où les coups restent au-dessus de la ceinture. Les deux se pratiquent avenue des États-Unis, sur deux rings de compétition.',
    photoHero: 'sac-de-frappe-castelginest',
    photoSecondaire: 'club-boxe-castelginest',
    promesse: 'Ajouter les jambes, en gardant la garde. Le travail debout le plus complet.',
    blocs: [
      {
        titre: 'Les jambes en plus des poings',
        texte:
          'Ajouter les jambes multiplie la difficulté. La distance change, la garde doit descendre en restant fermée, et l’appui devient un problème permanent puisqu’on frappe sur une jambe. C’est ce qui rend le pieds-poings si fatigant la première fois.',
      },
      {
        titre: 'Le full contact, en quelques mots',
        texte:
          'C’est un règlement pieds-poings où les coups restent au-dessus de la ceinture : le low kick en sort. Le club l’a ajouté avec l’ouverture de cette salle. À l’entraînement, la différence tient à quelques consignes ; au sac et à la technique, le travail est le même.',
      },
      {
        titre: 'Il faut être souple ?',
        texte:
          'La souplesse vient avec les séances. Les premières semaines, les coups de pied restent bas, et la hauteur arrive toute seule avec les étirements de fin de séance.',
      },
      {
        titre: 'Où trouver les horaires',
        texte:
          'Sur le planning Boxe du club, l’un des trois qu’il publie chaque semaine avec Fitness et Sol. C’est la seule source à jour, et c’est pour ça qu’on t’y envoie plutôt que de recopier une grille.',
      },
    ],
    seance: [
      'Échauffement : corde, mobilité de hanche, chevilles',
      'Technique : une combinaison poings-jambes, décomposée puis enchaînée',
      'Sac et paos : puissance et placement, avec correction',
      'Renforcement du bas du corps et gainage',
      'Étirements longs — indispensables quand on frappe avec les jambes',
    ],
    faq: [
      {
        titre: 'Où faire du pieds-poings près de Castelginest ?',
        texte:
          'Au 388 avenue des États-Unis, dans l’espace boxe de 400 m². Deux rings de compétition, et du tapis d’entraînement autour. Le 60 puis le 59 t’y amènent.',
      },
      {
        titre: 'C’est réservé aux jeunes ?',
        texte:
          'Le cours accueille tous les âges d’adultes et tous les niveaux. Beaucoup y arrivent après quelques mois de boxe anglaise, d’autres commencent directement là.',
      },
      {
        titre: 'Il faut acheter des protège-tibias ?',
        texte:
          'Pour découvrir, une tenue de sport suffit. Si tu continues, le club te dira quel matériel prendre et à quelle taille.',
      },
      {
        titre: 'Et la boxe thaï ?',
        texte:
          'Cette salle publie la boxe pieds-poings et le full contact. Si tu cherches précisément le Muay Thaï, avec les coudes et les genoux, dis-le dans ton message : on te répond avec ce qui se pratique réellement dans le réseau.',
      },
    ],
  },
  {
    id: 'boxe-enfants',
    h1: 'Boxe enfant à proximité de Castelginest',
    chapeau:
      'Le club publie des cours enfants, en touché contrôlé. Ils ont lieu avenue des États-Unis, dans la plus grande salle de sports de combat du réseau. Les jours et les tranches d’âge figurent sur les plannings hebdomadaires du club.',
    photoHero: 'entrainement-boxe-castelginest',
    photoSecondaire: 'garde-boxe-castelginest',
    promesse: 'Un cadre, une règle, et un enfant qui apprend à se contenir avant de frapper.',
    blocs: [
      {
        titre: 'Ce qu’un enfant apprend d’abord',
        texte:
          'Se tenir, regarder, attendre son tour, et s’arrêter net quand on le lui demande. La frappe vient après, et toujours contrôlée. Les parents qui viennent chercher un défouloir repartent souvent surpris : ce que la boxe installe en premier, c’est un cadre.',
      },
      {
        titre: 'Le touché contrôlé, en pratique',
        texte:
          'Le travail se fait en touché contrôlé : on cible, on effleure, on dose. Les protections sont adaptées à la taille, et ces créneaux se déroulent entièrement sous consigne du coach.',
      },
      {
        titre: 'De la place, et ça compte',
        texte:
          'La salle fait 1 200 m² en trois espaces. Pour un cours enfants, ça veut dire un groupe qui garde ses distances, un coach qui voit tout le monde, et du matériel disponible pour chacun.',
      },
      {
        titre: 'Le trajet, pour un parent',
        texte:
          'En voiture, la D820 puis le périphérique et la sortie 33b « Lalande ». Depuis Castelginest, c’est le même axe du début à la fin. Deux allers-retours par semaine, c’est tenable une année entière.',
      },
    ],
    seance: [
      'Échauffement en jeu : déplacements, réactions, coordination',
      'Rappel de la règle : la garde, la distance, le signal d’arrêt',
      'Technique : un geste simple, répété, corrigé un par un',
      'Application au sac ou aux pattes, en touché contrôlé',
      'Retour au calme, et le mot du coach sur la séance',
    ],
    faq: [
      {
        titre: 'À partir de quel âge ?',
        texte:
          'Le club publie des cours enfants et donne les tranches d’âge sur ses plannings hebdomadaires. Elles peuvent bouger d’une saison à l’autre : c’est la seule source à jour, et c’est pour ça qu’on t’y envoie.',
      },
      {
        titre: 'Mon enfant est très timide. Ça peut aller ?',
        texte:
          'C’est souvent lui qui en tire le plus. On travaille par deux, sur une consigne précise, et le coach circule. Beaucoup d’enfants réservés y trouvent leur premier sport où l’on garde son calme sans passer devant tout le monde.',
      },
      {
        titre: 'Et si c’est justement pour canaliser trop d’énergie ?',
        texte:
          'C’est le cas de figure le plus courant, et il fonctionne — à une condition : que l’enfant accepte la règle. La boxe donne beaucoup à ceux qui ont trop d’énergie, et elle commence par leur demander de s’arrêter au signal.',
      },
      {
        titre: 'Il faut acheter des gants tout de suite ?',
        texte:
          'Pour découvrir, une tenue de sport et une bouteille d’eau suffisent. Si ton enfant continue, le club te dira quel matériel prendre et à quelle taille.',
      },
    ],
  },
  {
    id: 'preparation-physique',
    h1: 'Cross-training, Hyrox et musculation à proximité de Castelginest',
    chapeau:
      'Un espace de 400 m² pour la condition physique : seize sacs de frappe, une cage de cross-training, de la musculation, du cardio, l’Hyrox et le street workout. Le Boxing Fitness et le Boxing Lady s’y pratiquent aussi, en travail individuel.',
    photoHero: 'preparation-physique-castelginest',
    photoSecondaire: 'sac-de-frappe-castelginest',
    promesse: 'La forme et le défoulement, en restant au sol si tu préfères.',
    blocs: [
      {
        titre: 'De la boxe, en solo',
        texte:
          'Le Boxing Fitness reprend tout ce que fait un boxeur : la corde, les déplacements, le sac, les combinaisons, le gainage. La partie opposition en sort. Avec seize sacs, chacun garde le sien pendant tout le circuit.',
      },
      {
        titre: 'Boxing Lady, entre femmes',
        texte:
          'Un créneau publié sous ce nom, pensé pour un groupe de femmes. Le contenu reste entier : c’est le même travail technique, dans un groupe où chacune se reconnaît dans les autres.',
      },
      {
        titre: 'Le cross-training et l’Hyrox',
        texte:
          'Le club publie le cross-training et l’Hyrox, la préparation au format de course en salle. L’espace est équipé d’une cage de cross-training et de street workout, avec un coach spécialisé en callisthénie présent sur les entraînements en accès libre.',
      },
      {
        titre: 'L’accès libre',
        texte:
          'L’espace préparation physique est ouvert en dehors des cours : musculation, cardio, machines, vélo, rameur. Les conditions font partie de l’abonnement — demande-les au club.',
      },
    ],
    seance: [
      'Échauffement cardio : corde, vélo ou rameur',
      'Technique : une combinaison de boxe, apprise puis enchaînée',
      'Circuit au sac : séries chronométrées, intensité choisie',
      'Renforcement : gainage, poids du corps, charges',
      'Étirements et retour au calme',
    ],
    faq: [
      {
        titre: 'Je vais devoir combattre ?',
        texte:
          'Le Boxing Fitness, le Boxing Lady et le cross-training se pratiquent en travail individuel, du début à la fin. Tu peux pratiquer des années sur ce format.',
      },
      {
        titre: 'C’est quoi le street workout ici ?',
        texte:
          'Du travail au poids du corps sur une cage prévue pour ça, avec un coach spécialisé en callisthénie présent pendant les entraînements en accès libre.',
      },
      {
        titre: 'L’Hyrox, c’est pour qui ?',
        texte:
          'Pour ceux qui préparent ce format de course en salle, et plus largement pour ceux qui veulent une préparation physique structurée. Le planning Fitness du club donne les créneaux.',
      },
      {
        titre: 'J’ai un genou fragile, je peux venir ?',
        texte:
          'Dis-le au coach dès la première séance : c’est une information utile. Beaucoup d’exercices se substituent — le sac remplace le saut, le rameur remplace la course. En cas de suivi médical, l’avis de ton médecin passe avant le nôtre.',
      },
    ],
  },
] as const;

export const contenu = (id: PageDiscipline): Contenu => {
  const c = CONTENUS.find((x) => x.id === id);
  if (!c) throw new Error(`Contenu inconnu : ${id}`);
  return c;
};
