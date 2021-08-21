export default interface ICard {
	suite: string;
	value: string;
	cost: number;
	colour: string;
	isBlack: boolean;
	found: boolean;
	x: number;
	y: number;
	setX(x: number): number;
	setY(y: number): number;
}
