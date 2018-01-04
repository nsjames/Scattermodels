export class CurrencyAction {

	from:string;
	to:string;
	quantity:number;

	constructor(from, to, quantity){
		this.from = from;
		this.to = to;
		this.quantity = quantity;
	}

}

export default CurrencyAction;