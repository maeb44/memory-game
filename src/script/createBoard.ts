import { createCard } from './createCard';
import { store } from './state';

export function createBoard(): void {
  store.setState({
    score: 0,
    tries: 0,
    firstCard: null,
    secondCard: null,
    isGameOver: false,
  });
  const values = ['🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍑', '🍍'];
  const cards = [...values, ...values].sort(() => Math.random() - 0.5);

  const main = document.createElement('main');
  main.className = 'board';

  cards.forEach((card, index) => {
    main.append(createCard(card, index));
  });
  if (document.querySelector('.board')) {
    document.querySelector('.board')?.remove();
  }
  document.body.append(main);
}
