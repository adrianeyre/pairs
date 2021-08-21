import { isEqual } from 'lodash';

import Canvas from './canvas';
import Deck from './deck';

import IGame from './interfaces/game';
import ICanvas from './interfaces/canvas';
import IDeck from './interfaces/deck';
import ICard from './interfaces/card'

export default class Game implements IGame {
  private readonly DEFAULT_TIMER_INTERVAL: number = 3000;

  private canvas: ICanvas;
  private deck: IDeck;
  private selected: ICard[] = [];
  private timer: any;

  constructor() {
    this.canvas = new Canvas({ height: 700, width: 850 });
    this.deck = new Deck();
  }

  public play = () => {
    this.deck.shuffle();
    this.drawCards();
    this.setupCanvas();
  }

  private drawCards = (): void => {
    this.canvas.clear();

    this.deck.cards.forEach(card => {
      const show = card.found || !!this.selected.find(cardInHand => cardInHand === card);
      this.canvas.drawCard(card, card.x, card.y, show)
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
    const card = this.deck.findCardByCoords(event.x, event.y)
    if (this.selected.length > 1) return this.resetSelected();
    if (!card || this.selected.indexOf(card) > -1 || this.selected.length > 1) return;
 
    this.selected.push(card);
    this.startTimer();
    this.checkHasWon();
    this.drawCards();
  }

  private resetSelected = (): void => {
    this.selected = [];
    this.drawCards();
  }

  private checkHasWon = (): boolean => {
    if (this.selected.length < 1) return false;

    const checkedCards = this.selected.map(card => ({ suite: card.suite, value: card.value }))
    const hasWon = isEqual(checkedCards[0], checkedCards[1]);
    if (!hasWon) return false;

    this.selected.forEach(card => card.found = true);
    this.selected = [];

    return hasWon;
  }

  private timerDone = (): void => {
    if (this.selected.length < 2) return;

    this.resetSelected();
  }

  private startTimer = (): void => {
    setTimeout(() => this.timerDone(), this.DEFAULT_TIMER_INTERVAL)
	}
}
