import { vi } from 'vitest';

// jsdom has no 2D context, and `getContext` logs a "not implemented" error and
// returns null. Everything in Canvas is guarded against a null context, so
// without a stub the drawing code would be skipped rather than exercised — the
// tests would pass while never running a `fillText`. This records the calls
// instead.
const stubContext = (): CanvasRenderingContext2D =>
  ({
    textAlign: 'start',
    textBaseline: 'alphabetic',
    font: '10px sans-serif',
    fillStyle: '#000',
    fillText: vi.fn(),
    clearRect: vi.fn(),
  }) as unknown as CanvasRenderingContext2D;

HTMLCanvasElement.prototype.getContext = vi.fn(
  stubContext,
) as unknown as HTMLCanvasElement['getContext'];
