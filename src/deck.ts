import IDeck from './interfaces/deck';
import ICard from './interfaces/card'
import Card from './card';

export default class Deck implements IDeck {
	private readonly CARD_COLOUR = ['#000', '#000', '#FF0000', '#FF0000'];
	private readonly CARD_SUITES = [9824, 9827, 9829, 9830];

	public cards: ICard[];

	constructor() {
		this.cards = [];

		for (let pair = 0; pair < 2; pair++) {
			for (let suiteIndex = 1; suiteIndex <= 4; suiteIndex ++) {
				for (let valueIndex = 1; valueIndex <= 13; valueIndex ++) {
					const suite = String.fromCharCode(this.CARD_SUITES[suiteIndex - 1]);
					const value = valueIndex > 10 ? 'JQK'[valueIndex - 11] : valueIndex === 1 ? 'A' : valueIndex.toString();
					const colour = this.CARD_COLOUR[suiteIndex - 1];
	
					this.cards.push(new Card({ suite, value, colour, cost: valueIndex, isBlack: suiteIndex < 3 }));
				}
			}
		}
	}

	public shuffle = (): ICard[] => this.cards = this.cards.sort(() => Math.random() - 0.5);

	public findCard = (x: number, y: number): ICard | undefined => this.cards.find((card: ICard) => x >= card.x - 15 && x <= card.x + 25 && y >= card.y - 30 && y <= card.y + 40);
}
