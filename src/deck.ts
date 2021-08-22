import Card from './card';

import IDeck from './interfaces/deck';
import ICard from './interfaces/card'

import config from './config/config';

export default class Deck implements IDeck {
	public cards: ICard[];

	constructor() {
		this.cards = [];

		for (let pair = 0; pair < 2; pair++) {
			for (let suiteIndex = 1; suiteIndex <= config.suites; suiteIndex ++) {
				for (let valueIndex = 1; valueIndex <= config.cards; valueIndex ++) {
					const suite = String.fromCharCode(config.cardSuites[suiteIndex - 1]);
					const value = valueIndex > 10 ? 'JQK'[valueIndex - 11] : valueIndex === 1 ? 'A' : valueIndex.toString();
					const colour = config.cardColours[suiteIndex - 1];
	
					this.cards.push(new Card({ suite, value, colour, cost: valueIndex, isBlack: suiteIndex < 3 }));
				}
			}
		}
	}

	public shuffle = (): ICard[] => {
		this.cards = this.cards.sort(() => Math.random() - 0.5);

		const amountOfCars = config.suites * config.cards * 2;
		const cardWidth = Math.ceil(Math.sqrt(amountOfCars * 1.5));

		this.cards.forEach((card, idx) => {
      const x = (idx % cardWidth * 55) + 30;
      const y = Math.floor(idx / cardWidth) * 100 + 50;
      card.setX(x);
      card.setY(y);
    })

		return this.cards;
	}

	public findCardByCoords = (x: number, y: number): ICard | undefined => this.cards.find((card: ICard) => x >= card.x - 15 && x <= card.x + 25 && y >= card.y - 20 && y <= card.y + 50);

	public foundCard = (card: ICard): ICard | undefined => {
		const foundCard = this.cards.find(cardInDeck => cardInDeck === card);
		if (!foundCard) return foundCard;

		foundCard.found = true;
		return foundCard;
	}
}
