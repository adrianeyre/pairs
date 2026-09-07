import { beforeEach, describe, expect, it } from 'vitest';

import Canvas from '../src/canvas';
import config from '../src/config/config';
import type ICard from '../src/interfaces/card';

const card: ICard = {
  suite: '♠',
  value: 'A',
  cost: 1,
  colour: '#000',
  isBlack: true,
  found: false,
  x: 30,
  y: 50,
  setX: (x: number) => x,
  setY: (y: number) => y,
};

const drawnText = (canvas: Canvas): string[] => {
  const ctx = (canvas as unknown as { ctx: CanvasRenderingContext2D }).ctx;

  return (ctx.fillText as unknown as { mock: { calls: unknown[][] } }).mock.calls.map(
    (call) => call[0] as string,
  );
};

describe('Canvas', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('uses the default background when none is given', () => {
    const canvas = new Canvas({});
    canvas.publish();

    expect(document.getElementById('canvas')?.style.backgroundColor).toBe('rgb(136, 205, 235)');
    expect(config.defaultBackgroundColour).toBe('#88CDEB');
  });

  it('honours a background colour that is passed in', () => {
    new Canvas({ backgroundColour: '#FFFFFF' }).publish();

    expect(document.getElementById('canvas')?.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('draws the suit and value on the front of a card', () => {
    const canvas = new Canvas({});
    canvas.drawCard(card, card.x, card.y, true);

    const text = drawnText(canvas);
    expect(text).toContain('♠');
    expect(text.filter((entry) => entry === 'A')).toHaveLength(2);
  });

  it('draws nothing but the card back when a card is face down', () => {
    const canvas = new Canvas({});
    canvas.drawCard(card, card.x, card.y, false);

    expect(new Set(drawnText(canvas))).toEqual(new Set([config.defaultCardBackground]));
  });

  it('reports the pairs still to find', () => {
    const canvas = new Canvas({});
    canvas.displayProgress(7);

    expect(drawnText(canvas)).toContain('Remaining Pairs: 7');
  });
});
