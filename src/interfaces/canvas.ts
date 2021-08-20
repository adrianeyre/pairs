import ICard from './card';

export default interface ICanvas {
	publish(): HTMLCanvasElement;
	clear(): void | null;
	drawCard(card: ICard, x: number, y: number): void;
}
