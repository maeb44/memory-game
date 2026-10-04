export function createHeader(
  createBoard: () => void,
  createModal: (title: string) => void,
): void {
  const header = document.createElement('header');
  header.className = 'menu';
  const spanForTries = document.createElement('span');
  spanForTries.dataset.name = 'tries';
  spanForTries.textContent = '0';

  const spanForScore = document.createElement('span');
  spanForScore.dataset.name = 'score';
  spanForScore.textContent = '0';

  // <button class="menu__title">New Game</button>
  const newGameBtn = document.createElement('button');
  newGameBtn.className = 'menu__title';
  newGameBtn.textContent = 'New Game';
  newGameBtn.onclick = createBoard;
  header.append(newGameBtn);

  // <button class="menu__title">Leaderboard</button>
  const leaderboardBtn = document.createElement('button');
  leaderboardBtn.className = 'menu__title';
  leaderboardBtn.textContent = 'Leaderboard';
  leaderboardBtn.onclick = () => createModal('Leaderboard');
  header.append(leaderboardBtn);

  const scoreBoard = document.createElement('div');
  scoreBoard.className = 'menu__title';
  scoreBoard.textContent = 'Score:\u00A0';
  scoreBoard.append(spanForScore);
  header.append(scoreBoard);

  const triesBoard = document.createElement('div');
  triesBoard.className = 'menu__title';
  triesBoard.textContent = 'Tries:\u00A0';
  triesBoard.append(spanForTries);
  header.append(triesBoard);

  document.body.append(header);
}
