import Canvas from './canvas';
import Deck from './deck';

import IGame from './interfaces/game';
import ICanvas from './interfaces/canvas';
import IDeck from './interfaces/deck';

export default class Game implements IGame {
  private canvas: ICanvas;
  private deck: IDeck;

  private cardWidth = 15

  constructor() {
    this.canvas = new Canvas({ height: 700, width: 850 });
    this.deck = new Deck();
  }

  public play = () => {
    this.deck.shuffle();
    this.canvas.clear();
    this.drawCards();
    this.setupCanvas();
  }

  private drawCards = (): void => {
    this.deck.cards.forEach((card, idx) => {
      const x = (idx % this.cardWidth * 55) + 30;
      const y = Math.floor(idx / this.cardWidth) * 100 + 50;
      card.setX(x);
      card.setY(y);
      this.canvas.drawCard(card, x, y) 
    })

    this.canvas.publish();
  }

  private setupCanvas = (): void => {
		const canvas = document.getElementById('canvas');
		if (!canvas) throw Error('canvas not found!');
		canvas.addEventListener('mousedown', this.onMouseDown);

		this.canvas.publish();
	}

  private onMouseDown = (event: MouseEvent): void => {
    const card = this.deck.findCard(event.x, event.y)

    if (card) console.log(`card = ${card.suite}${card.value}`)
  }
}
