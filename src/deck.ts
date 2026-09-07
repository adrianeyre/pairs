import Card from './card';

import type IDeck from './interfaces/deck';
import type ICard from './interfaces/card';

import config from './config/config';

// A suit is a symbol and the colour it is drawn in. The config keeps those in
// two parallel arrays, so they are paired up once here rather than being
// indexed apart at every use.
const suits = config.cardSuites.slice(0, config.suites).map((charCode, index) => ({
  symbol: String.fromCharCode(charCode),
  colour: config.cardColours[index] ?? config.defaultCardOutlineColour,
  isBlack: index < 2,
}));

const faceValues = ['J', 'Q', 'K'];

const valueFor = (value: number): string => {
  if (value === 1) return 'A';
  if (value <= 10) return value.toString();

  return faceValues[value - 11] ?? value.toString();
};

export default class Deck implements IDeck {
  public cards: ICard[];

  constructor() {
    this.cards = [];

    for (let pair = 0; pair < 2; pair++) {
      for (const suit of suits) {
        for (let value = 1; value <= config.cards; value++) {
          this.cards.push(
            new Card({
              suite: suit.symbol,
              value: valueFor(value),
              colour: suit.colour,
              cost: value,
              isBlack: suit.isBlack,
            }),
          );
        }
      }
    }
  }

  public shuffle = (): ICard[] => {
    this.cards = this.cards.sort(() => Math.random() - 0.5);

    const amountOfCards = config.suites * config.cards * 2;
    const cardsPerRow = Math.ceil(Math.sqrt(amountOfCards * 1.5));

    this.cards.forEach((card, idx) => {
      card.setX((idx % cardsPerRow) * 55 + 30);
      card.setY(Math.floor(idx / cardsPerRow) * 100 + 50);
    });

    return this.cards;
  };

  public findCardByCoords = (x: number, y: number): ICard | undefined =>
    this.cards.find(
      (card: ICard) => x >= card.x - 15 && x <= card.x + 25 && y >= card.y - 20 && y <= card.y + 50,
    );

  public foundCard = (card: ICard): ICard | undefined => {
    const foundCard = this.cards.find((cardInDeck) => cardInDeck === card);
    if (!foundCard) return foundCard;

    foundCard.found = true;
    return foundCard;
  };
}
