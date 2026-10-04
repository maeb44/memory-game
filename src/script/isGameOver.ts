import { store } from './state';
import { createModal } from './createModal';

let handled = false;

export function isGameOver() {
  const state = store.getState();

  if (!state.isGameOver) {
    handled = false;
    return;
  }

  if (handled) return;
  handled = true;

  const date = new Date().toLocaleDateString('ru-RU');
  const updated = [...state.leaderboard, { date, tries: state.tries }].sort(
    (a, b) => a.tries - b.tries,
  );

  store.setState({ leaderboard: updated });

  createModal('You Win');
}
