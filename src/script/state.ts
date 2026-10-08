type LeaderboardEntry = { date: string; tries: number };
type State = {
  leaderboard: LeaderboardEntry[];
  score: number;
  tries: number;
  firstCard: { card: string; index: number } | null;
  secondCard: { card: string; index: number } | null;
  isGameOver: boolean;
};
function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem('leaders');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
const initialState: State = {
  leaderboard: loadLeaderboard(),
  score: 0,
  tries: 0,
  firstCard: null,
  secondCard: null,
  isGameOver: false,
};

function createStore<S>(initial: S) {
  let state: S = initial;
  const listeners = new Set<(state: S) => void>();
  const getState = (): S => ({ ...state });
  const setState = (patch: Partial<S>) => {
    state = { ...state, ...patch };
    listeners.forEach((fn) => fn(state));
  };
  const subscribe = (fn: (state: S) => void) => {
    listeners.add(fn);
    fn(state);
    return () => listeners.delete(fn);
  };
  return { getState, setState, subscribe };
}

export const store = createStore(initialState);
store.subscribe((state) => {
  localStorage.setItem('leaders', JSON.stringify(state.leaderboard));
});
