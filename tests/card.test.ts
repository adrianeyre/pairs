import { describe, expect, it } from 'vitest';

import Card from '../src/card';

const props = {
  suite: '♠',
  value: 'A',
  cost: 1,
  colour: '#000',
  isBlack: true,
};

describe('Card', () => {
  it('starts face down at the origin', () => {
    const card = new Card(props);

    expect(card.found).toBe(false);
    expect(card.x).toBe(0);
    expect(card.y).toBe(0);
  });

  it('carries the properties it was built with', () => {
    expect(new Card(props)).toMatchObject(props);
  });

  it('takes a position', () => {
    const card = new Card(props);

    expect(card.setX(85)).toBe(85);
    expect(card.setY(150)).toBe(150);
    expect(card.x).toBe(85);
    expect(card.y).toBe(150);
  });
});
