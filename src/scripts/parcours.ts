/**
 * LE PARCOURS — le moteur du site.
 *
 * À Colomiers, l'incertitude était le club : deux destinations, il fallait
 * trancher. Ici il n'y en a qu'une, et elle est acquise dès la première
 * seconde. Ce qui se mérite change donc de sujet : ce n'est plus *où*, c'est
 * *quoi* et *quand*. Le parcours devient une ligne de temps.
 *
 * Trois responsabilités, et rien d'autre :
 *   1. retenir ce que le visiteur a décidé, d'une page à l'autre ;
 *   2. en déduire sa séance — un intitulé réel du club, jamais une invention ;
 *   3. tendre le trait à proportion de ce qui est réellement établi.
 *
 * Aucun score, aucun pourcentage de compatibilité : chaque conclusion se lit
 * comme une phrase et se justifie par un fait publié par le club.
 */

import { OFFRES, FAMILLES_PAR_PAGE, type Famille, type PageDiscipline } from '../data/offres';
import { SITE } from '../data/verite';

export type Creneau = 'midi' | 'apres-midi' | 'soir' | 'samedi';

export type Parcours = {
  discipline?: PageDiscipline;
  creneau?: Creneau;
  /** dernière écriture, pour périmer un parcours oublié */
  t?: number;
};

/* La clé porte le domaine : deux sites de la famille ouverts dans le même
   navigateur ne se marchent jamais dessus. */
const CLE = `bc-${SITE.ville.toLowerCase().replace(/[^a-z]/g, '')}-parcours`;
/** Un parcours vieux de plus de trente jours ne dit plus rien d'utile. */
const PEREMPTION = 30 * 24 * 60 * 60 * 1000;

export const LIBELLE_DISCIPLINE: Record<PageDiscipline, string> = {
  'boxe-anglaise': 'Boxe anglaise',
  mma: 'MMA & grappling',
  'boxe-pieds-poings': 'Boxe pieds-poings',
  'boxe-enfants': 'Boxe enfants',
  'preparation-physique': 'Préparation physique',
};

/** La même discipline ne s'écrit pas pareil dans un titre et dans une phrase. */
const DANS_UNE_PHRASE: Record<PageDiscipline, string> = {
  'boxe-anglaise': 'de la boxe anglaise',
  mma: 'du MMA',
  'boxe-pieds-poings': 'de la boxe pieds-poings',
  'boxe-enfants': 'un cours de boxe pour mon enfant',
  'preparation-physique': 'de la préparation physique',
};

export const LIBELLE_CRENEAU: Record<Creneau, string> = {
  midi: 'Le midi',
  'apres-midi': "L'après-midi",
  soir: 'Le soir',
  samedi: 'Le samedi',
};

const CRENEAU_PHRASE: Record<Creneau, string> = {
  midi: 'le midi',
  'apres-midi': "l'après-midi",
  soir: 'le soir',
  samedi: 'le samedi',
};

/* ─────────────────────────────  Mémoire  ───────────────────────────── */

function lire(): Parcours {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return {};
    const p = JSON.parse(brut) as Parcours;
    if (p.t && Date.now() - p.t > PEREMPTION) return {};
    return p;
  } catch {
    // Navigation privée, stockage refusé, quota plein : on continue sans
    // mémoire plutôt que de casser la page.
    return {};
  }
}

function ecrire(p: Parcours) {
  try {
    localStorage.setItem(CLE, JSON.stringify({ ...p, t: Date.now() }));
  } catch {
    /* sans mémoire, le site reste entièrement utilisable */
  }
}

let etat: Parcours = {};

export const parcours = (): Parcours => ({ ...etat });

/* ─────────────────────────────  La séance  ───────────────────────────── */

export type Seance = {
  /** les intitulés réels publiés par le club pour cette discipline */
  intitules: string[];
  creneau?: Creneau;
  /** la phrase qui justifie, sans jamais inventer d'horaire */
  pourquoi: string;
};

/**
 * On ne fabrique jamais un horaire. Le club publie son planning ; nous, on
 * dit quelle pratique viser et à quel moment de la journée regarder. La
 * précision appartient à la source.
 */
export function seance(p: Parcours): Seance | null {
  if (!p.discipline) return null;

  const familles = FAMILLES_PAR_PAGE[p.discipline] as readonly Famille[];
  const intitules = OFFRES.filter((o) => familles.includes(o.famille)).map((o) => o.intitule);

  if (!p.creneau) {
    return {
      intitules,
      pourquoi:
        intitules.length > 1
          ? `Le club publie ${intitules.length} créneaux pour cette pratique. Dis-nous quand tu peux : on te dit lequel regarder en premier.`
          : 'Dis-nous quand tu peux t’entraîner, et on te dit quoi regarder sur le planning du club.',
    };
  }

  const quand = CRENEAU_PHRASE[p.creneau];
  const pourquoi =
    p.creneau === 'soir'
      ? `C’est le moment le plus fréquenté, et le plus vivant : ${quand}, il y a du monde à qui se mesurer. Le planning du club donne l’heure exacte de chaque cours.`
      : p.creneau === 'midi'
        ? `${LIBELLE_CRENEAU.midi} est le créneau le plus calme du club — la meilleure façon de débuter sans public.`
        : p.creneau === 'samedi'
          ? 'Le samedi, c’est le créneau des familles et de ceux dont la semaine est trop pleine. Une séance tenue toute l’année vaut mieux que trois abandonnées en mars.'
          : 'L’après-midi, la salle est disponible et les coachs sont là : idéal en horaires décalés, en étudiant ou en travail de nuit.';

  return { intitules, creneau: p.creneau, pourquoi };
}

/* ─────────────────────────────  Rendu  ───────────────────────────── */

function peindre() {
  const barre = document.querySelector<HTMLElement>('[data-parcours]');
  if (!barre) return;

  const s = seance(etat);
  const valeurs: Record<string, string> = {
    discipline: etat.discipline ? LIBELLE_DISCIPLINE[etat.discipline] : '',
    creneau: etat.creneau ? LIBELLE_CRENEAU[etat.creneau] : '',
    seance: s?.creneau ? s.intitules[0] : '',
  };

  let acquis = 1; // le départ est toujours acquis : la ville du site
  for (const [cle, valeur] of Object.entries(valeurs)) {
    const etape = barre.querySelector<HTMLElement>(`[data-etape="${cle}"]`);
    if (!etape) continue;
    const cible = etape.querySelector<HTMLElement>('.parcours__valeur');
    if (cible) cible.textContent = valeur;
    etape.classList.toggle('est-acquis', Boolean(valeur));
    if (valeur) acquis++;
  }

  // Le trait se tend exactement à proportion de ce qui est établi. Il ne
  // devance jamais la certitude.
  barre.style.setProperty('--tension', String((acquis - 1) / 3));
  barre.hidden = acquis === 1;

  document.dispatchEvent(new CustomEvent('parcours:maj', { detail: parcours() }));
}

/* ─────────────────────────────  API  ───────────────────────────── */

const identique = (a: Parcours, b: Parcours) =>
  a.discipline === b.discipline && a.creneau === b.creneau;

export function definir(partiel: Partial<Parcours>) {
  const suivant = { ...etat, ...partiel };
  if (identique(etat, suivant)) return;
  etat = suivant;
  ecrire(etat);
  peindre();
}

export function effacer() {
  etat = {};
  try {
    localStorage.removeItem(CLE);
  } catch {
    /* rien à faire */
  }
  peindre();
}

/** Phrase lisible du parcours, réutilisée telle quelle dans le message envoyé. */
export function enPhrase(p: Parcours = etat): string {
  const bouts = [`Je pars de ${SITE.ville}`];
  if (p.discipline) bouts.push(`je cherche ${DANS_UNE_PHRASE[p.discipline]}`);
  if (p.creneau) bouts.push(`je peux m’entraîner ${CRENEAU_PHRASE[p.creneau]}`);
  return bouts.join(', ') + '.';
}

/* ─────────────────────────────  Démarrage  ───────────────────────────── */

export function demarrer() {
  etat = lire();

  // Visiter une page de discipline EST une décision : elle renseigne le parcours.
  const d = document.body.dataset.discipline as PageDiscipline | undefined;
  if (d && etat.discipline !== d) {
    etat.discipline = d;
    ecrire(etat);
  }

  peindre();
  document.querySelector('[data-effacer]')?.addEventListener('click', effacer);

  // N'importe quel élément renseigne le parcours avec data-choix="creneau:soir".
  // Aucun composant n'a besoin d'importer ce module.
  document.addEventListener('click', (e) => {
    const cible = (e.target as HTMLElement)?.closest<HTMLElement>('[data-choix]');
    if (!cible) return;
    const [cle, valeur] = (cible.dataset.choix ?? '').split(':');
    if (!cle || !valeur) return;
    definir({ [cle]: valeur } as Partial<Parcours>);
  });
}
