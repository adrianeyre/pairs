import ICard from './card';

export default interface IDeck {
	cards: ICard[]
	shuffle(): ICard[];
	findCard(x: number, y: number): ICard | undefined 
}
