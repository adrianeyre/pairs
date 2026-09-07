import { beforeEach, describe, expect, it } from 'vitest';

import Deck from '../src/deck';
import config from '../src/config/config';

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('holds two of every card in every suit', () => {
    expect(deck.cards).toHaveLength(config.suites * config.cards * 2);
  });

  it('pairs every card exactly once', () => {
    const counts = new Map<string, number>();

    for (const card of deck.cards) {
      const key = `${card.suite}${card.value}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    expect(counts.size).toBe(config.suites * config.cards);
    expect([...counts.values()].every((count) => count === 2)).toBe(true);
  });

  it('names the ace and the face cards rather than numbering them', () => {
    const values = new Set(deck.cards.map((card) => card.value));

    expect(values).toEqual(
      new Set(['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']),
    );
  });

  it('draws the first two suits in black and the rest in red', () => {
    const [spades, clubs, hearts, diamonds] = config.cardSuites.map((code) =>
      String.fromCharCode(code),
    );

    const colourOf = (suite: string | undefined) =>
      deck.cards.find((card) => card.suite === suite)?.colour;

    expect(colourOf(spades)).toBe('#000');
    expect(colourOf(clubs)).toBe('#000');
    expect(colourOf(hearts)).toBe('#FF0000');
    expect(colourOf(diamonds)).toBe('#FF0000');
  });

  it('lays every card out on the grid when shuffled', () => {
    expect(deck.cards.every((card) => card.x === 0 && card.y === 0)).toBe(true);

    deck.shuffle();

    expect(deck.cards.every((card) => card.x > 0 && card.y > 0)).toBe(true);
  });

  it('reorders the cards when shuffled', () => {
    const before = deck.cards.map((card) => `${card.suite}${card.value}`);

    deck.shuffle();

    // 104 cards, so the identity permutation is not a real risk.
    expect(deck.cards.map((card) => `${card.suite}${card.value}`)).not.toEqual(before);
  });

  describe('findCardByCoords', () => {
    beforeEach(() => {
      deck.shuffle();
    });

    it('finds the card under a click inside its box', () => {
      const target = deck.cards[10];
      expect(target).toBeDefined();

      expect(deck.findCardByCoords(target!.x, target!.y)).toBe(target);
    });

    it('finds nothing above the top row', () => {
      expect(deck.findCardByCoords(0, 0)).toBeUndefined();
    });
  });

  describe('foundCard', () => {
    it('marks a card in the deck as found', () => {
      const card = deck.cards[0];
      expect(card).toBeDefined();
      expect(card!.found).toBe(false);

      expect(deck.foundCard(card!)).toBe(card);
      expect(card!.found).toBe(true);
    });

    it('returns undefined for a card that is not in this deck', () => {
      const stranger = new Deck().cards[0];
      expect(stranger).toBeDefined();

      expect(deck.foundCard(stranger!)).toBeUndefined();
    });
  });
});
