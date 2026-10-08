import { store } from './state';

export function updateStats(): void {
  const score = document.querySelector('[data-name="score"]');
  const tries = document.querySelector('[data-name="tries"]');
  const currentGame = store.getState();
  if (!(score && tries && currentGame)) return;
  score.textContent = String(currentGame.score);
  tries.textContent = String(currentGame.tries);
}
