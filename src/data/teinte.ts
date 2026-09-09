/**
 * LA TEINTE DU SITE — les mêmes valeurs que `styles/jetons.css`, lisibles
 * depuis un script de build : la vignette OG et le favicon se dessinent avec
 * la couleur du site, pas avec une couleur retapée.
 *
 * Une valeur change ici ET dans jetons.css, jamais dans un seul des deux.
 */
export const TEINTE = {
  papier: '#f2eff5',
  papierCreuse: '#e6e0ec',
  papierVif: '#faf8fc',
  encre: '#241a3a',
  graphite: '#61557e',
  trait: 'rgba(36, 26, 58, 0.16)',
  signal: '#8353bf',
  signalTexte: '#6a3aa0',
  signalProfond: '#4b2775',
} as const;
