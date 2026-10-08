import { createBoard } from './createBoard';
import { createHeader } from './createHeader';
import { createModal } from './createModal';
import { isGameOver } from './isGameOver';
import { store } from './state';
import { updateStats } from './updateScoreTries';

export function startApp() {
  createHeader(createBoard, createModal);
  createBoard();
  store.subscribe(updateStats);
  store.subscribe(isGameOver);
}
