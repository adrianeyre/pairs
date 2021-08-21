import ICard from './card';

export default interface IDeck {
	cards: ICard[]
	shuffle(): ICard[];
	findCardByCoords(x: number, y: number): ICard | undefined;
	foundCard(card: ICard): ICard | undefined;
}
