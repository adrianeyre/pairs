import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Game from '../src/game';
import type ICard from '../src/interfaces/card';

const canvasElement = (): HTMLCanvasElement => {
  const canvas = document.getElementById('canvas');
  if (!canvas) throw new Error('the game did not publish a canvas');

  return canvas as HTMLCanvasElement;
};

const click = (card: ICard): void => {
  canvasElement().dispatchEvent(
    new MouseEvent('mousedown', { clientX: card.x, clientY: card.y, bubbles: true }),
  );
};

// The deck is private, so the cards are read back off the game the way the
// click handler finds them: by asking the deck the game built.
const cardsOf = (game: Game): ICard[] =>
  (game as unknown as { deck: { cards: ICard[] } }).deck.cards;

const aMatchingPair = (cards: ICard[]): [ICard, ICard] => {
  const first = cards[0];
  if (!first) throw new Error('the deck is empty');

  const partner = cards.find(
    (card) => card !== first && card.suite === first.suite && card.value === first.value,
  );
  if (!partner) throw new Error('the deck has no partner for the first card');

  return [first, partner];
};

const aMismatchedPair = (cards: ICard[]): [ICard, ICard] => {
  const first = cards[0];
  if (!first) throw new Error('the deck is empty');

  const other = cards.find((card) => card.suite !== first.suite || card.value !== first.value);
  if (!other) throw new Error('every card in the deck is the same');

  return [first, other];
};

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    document.body.innerHTML = '';
    vi.useFakeTimers();

    game = new Game();
    game.play();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('publishes a canvas to the page', () => {
    expect(canvasElement().tagName).toBe('CANVAS');
  });

  it('deals every card face down', () => {
    expect(cardsOf(game).every((card) => !card.found)).toBe(true);
  });

  it('keeps a matching pair face up', () => {
    const [first, second] = aMatchingPair(cardsOf(game));

    click(first);
    click(second);

    expect(first.found).toBe(true);
    expect(second.found).toBe(true);
  });

  it('leaves a mismatched pair face down', () => {
    const [first, second] = aMismatchedPair(cardsOf(game));

    click(first);
    click(second);

    expect(first.found).toBe(false);
    expect(second.found).toBe(false);
  });

  it('turns a mismatched pair back over once the timer runs out', () => {
    const [first, second] = aMismatchedPair(cardsOf(game));

    click(first);
    click(second);
    vi.runOnlyPendingTimers();

    // Nothing was matched, so a third click starts a fresh turn rather than
    // being ignored as the third card of the last one.
    const third = cardsOf(game).find((card) => card !== first && card !== second);
    expect(third).toBeDefined();

    click(third!);
    expect(third!.found).toBe(false);
  });

  it('ignores the same card being clicked twice', () => {
    const [first] = aMatchingPair(cardsOf(game));

    click(first);
    click(first);

    expect(first.found).toBe(false);
  });
});
