import ICanvas from './interfaces/canvas';
import ICanvasProps from './interfaces/canvas-props';
import ICard from './interfaces/card';

import config from './config/config';

export default class Canvas implements ICanvas {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D | null;

	constructor(props: ICanvasProps) {
		this.canvas = document.createElement('canvas');
		this.canvas.id = 'canvas';
		this.canvas.width = screen.width;
		this.canvas.height = screen.height;
		this.canvas.style.backgroundColor = props.backgroundColour ? props.backgroundColour : config.defaultBackgroundColour;

		this.ctx = this.canvas.getContext('2d');
	}

	public drawCard = (card: ICard, x: number, y: number, show: boolean): void => {
		if (show) return this.drawFront(card, x, y);

		return this.drawBack(x, y);
	}

	public displayProgress = (pairs: number): void => {
		if (!this.ctx) return;

		this.drawText(5, 15, 20, '#000', `Remaining Pairs: ${ pairs }`, 'left');
	}

	public publish = (): HTMLCanvasElement => document.body.appendChild(this.canvas);

	public clear = (): void | null => this.ctx ? this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) : null;

	private drawFront = (card: ICard, x: number, y: number): void => {
		if (!this.ctx) return;

		this.drawText(x, y + 20, 59, config.defaultCardBackgroundColour, config.defaultCardBackground);
		this.drawText(x , y + 20, 55, config.defaultCardOutlineColour, config.defaultCardBackground);
		this.drawText(x - 13, y - 5, 15, card.colour, card.value);
		this.drawText(x + 13, y + 45, 15, card.colour, card.value);
		this.drawText(x, y + 18, 40, card.colour, card.suite);
	}

	private drawBack = (x: number, y: number): void => {
		this.drawText(x, y + 20 , 59, config.defaultCardBackgroundColour, config.defaultCardBackground);
		this.drawText(x , y + 20, 55, config.defaultCardOutlineColour, config.defaultCardBackground);
	}

	private drawText = (x: number, y: number, size: number, colour: string, text: string, textAlign: CanvasTextAlign = 'center'): void => {
		if (!this.ctx) return;

		this.ctx.textAlign = textAlign;
		this.ctx.textBaseline = 'middle';
		this.ctx.font = `${ size }px arial`;
		this.ctx.fillStyle = colour;
		this.ctx.fillText(text, x, y);
	}
}
