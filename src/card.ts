import ICard from './interfaces/card';
import ICardProps from './interfaces/card-props'

export default class Card implements ICard {
	public suite: string;
	public value: string;
	public cost: number;
	public colour: string;
	public isBlack: boolean;
	public x: number;
	public y: number;

	constructor(props: ICardProps) {
		this.suite = props.suite;
		this.value = props.value;
		this.cost = props.cost;
		this.colour = props.colour;
		this.isBlack = props.isBlack;
		this.x = 0;
		this.y = 0;
	}

	public setX = (x: number): number => this.x = x;
	public setY = (y: number): number => this.y = y;
}
