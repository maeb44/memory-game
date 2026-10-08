import { createBoard } from './createBoard';
import { store } from './state';

export function createModal(title: string): void {
  // <div class="modal modal--open" id="modal">
  const modal = document.createElement('div');
  modal.className = 'modal modal--open';
  modal.id = 'modal';

  // <div class="modal__overlay"></div>
  const overlay = document.createElement('div');
  overlay.className = 'modal__overlay';

  // <div class="modal__window">
  const window_ = document.createElement('div');
  window_.className = 'modal__window';

  // <h2 class="modal__title">Leaderboard</h2>
  const heading = document.createElement('h2');
  heading.className = 'modal__title';
  heading.textContent = title;

  // <div class="modal__body"></div>
  const body = document.createElement('div');
  body.className = 'modal__body';
  fillLeaderboard(body, store.getState().leaderboard);

  // <button class="modal__close" type="button">Закрыть</button>
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal__close';
  closeBtn.type = 'button';
  closeBtn.textContent = 'Закрыть';

  const tries = document.createElement('p');
  tries.className = 'modal__txt';
  tries.textContent = `Tries: ${store.getState().tries}`;

  document.body.classList.add('hidden');

  const newGameBtn = document.createElement('button');
  newGameBtn.className = 'modal__new-game';
  newGameBtn.type = 'button';
  newGameBtn.textContent = 'New Game';
  newGameBtn.addEventListener('click', () => {
    createBoard();
    document.body.classList.remove('hidden');
    modal.remove();
  });
  // Закрытие по кнопке
  closeBtn.addEventListener('click', () => {
    modal.remove();
    document.body.classList.remove('hidden');
    document.removeEventListener('keydown', handleEsc);
  });

  // Закрытие по клику на overlay
  overlay.addEventListener('click', () => {
    modal.remove();
    document.body.classList.remove('hidden');
    document.removeEventListener('keydown', handleEsc);
  });
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.body.classList.remove('hidden');
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);

  // Сборка
  if (title === 'Leaderboard') {
    window_.append(heading, body, closeBtn);
  } else {
    window_.append(heading, tries, newGameBtn, closeBtn);
  }

  modal.append(overlay, window_);

  document.body.append(modal);
}

function createLeaderRow(
  entry: { date: string; tries: number },
  index: number,
): HTMLElement {
  // <div class="modal__leader">
  const row = document.createElement('div');
  row.className = 'modal__leader';

  // <p>1.</p>  — место в рейтинге
  const place = document.createElement('p');
  place.textContent = `${index + 1}.`;

  // <p class="modal__txt">Tries: 12</p>
  const tries = document.createElement('p');
  tries.className = 'modal__txt';
  tries.textContent = `Tries: ${entry.tries}`;

  // <p class="modal__txt">Date:03.02.2025</p>
  const date = document.createElement('p');
  date.className = 'modal__txt';
  date.textContent = `Date: ${entry.date}`;

  row.append(place, tries, date);
  return row;
}
function fillLeaderboard(
  body: HTMLElement,
  leaderboard: { date: string; tries: number }[],
): void {
  body.replaceChildren();
  if (leaderboard.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'modal__txt';
    empty.textContent = 'Empty';

    body.append(empty); // ← передаём узел, а не строку
    return;
  }
  leaderboard.forEach((entry, index) => {
    if (index > 9) return;
    body.appendChild(createLeaderRow(entry, index));
  });
}
