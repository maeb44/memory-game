import { isGameOver } from './isGameOver';
import { store } from './state';

export function createCard(card: string, index: number) {
  const button = document.createElement('button');
  button.className = 'card';
  button.type = 'button';
  button.dataset.id = String(index);

  const inner = document.createElement('div');
  inner.className = 'card__inner';

  const front = document.createElement('div');
  front.className = 'card__front';
  front.textContent = '?'; // рубашка карточки

  const back = document.createElement('div');
  back.className = 'card__back';
  back.textContent = card; // значение карточки

  inner.append(front);
  inner.append(back);
  button.append(inner);

  button.addEventListener('click', () => {
    const firstCard = store.getState().firstCard;

    if (!firstCard) {
      store.setState({ firstCard: { card, index } });
      button.classList.add('card__inner--active');
      return;
    }
    if (firstCard.index === index) {
      store.setState({
        firstCard: null,
        secondCard: null,
      });
      button.classList.remove('card__inner--active');
      return;
    }

    const secondCard = { card, index };
    store.setState({ secondCard });

    const firstButton = document.querySelector(
      `[data-id="${firstCard.index}"]`,
    );
    const secondButton = document.querySelector(`[data-id="${index}"]`);
    secondButton?.classList.add('card__inner--active');

    if (checkMatch(firstCard.card, secondCard.card)) {
      firstButton?.classList.add('card__inner--solved');
      secondButton?.classList.add('card__inner--solved');
      if (store.getState().score >= 8) store.setState({ isGameOver: true });
    } else {
      const board = document.querySelector('.board');
      if (!board) return;
      board.classList.add('board--disabled');
      setTimeout(() => {
        board.classList.remove('board--disabled');
        firstButton?.classList.remove('card__inner--active');
        secondButton?.classList.remove('card__inner--active');
      }, 1000);
    }
  });
  return button;
}

function checkMatch(firstCard: string, secondCard: string) {
  const state = store.getState();
  if (firstCard === secondCard) {
    store.setState({
      firstCard: null,
      secondCard: null,
      tries: state.tries + 1,
      score: state.score + 1,
    });
    return true;
  }
  store.setState({ firstCard: null, secondCard: null, tries: state.tries + 1 });
  return false;
}
