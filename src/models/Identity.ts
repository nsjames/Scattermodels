import {Network} from "./Network";
import {KeyPairAccount} from "./KeyPairAccount";

export class Identity {

	name:string;

	// Associated account
	account:KeyPairAccount;
	network:Network;

	fullName:string;
	email:string;
	phone:number;
	age:number;

	address:string;
	city:string;
	state:string;
	country:string;
	zipcode:string;

	constructor(){}

	public static placeholder(){
		let p = new Identity();

		p.name = '';

		p.account = null;
		p.network = null;

		p.email = '';
		p.phone = -1;
		p.age = -1;

		p.address = '';
		p.city = '';
		p.state = '';
		p.country = '';
		p.zipcode = '';

		return p;
	}

	public static fromJson(json:any){
		let p = Object.assign(Identity.placeholder(), json);
		if(json.hasOwnProperty('account') && json.account) p.account = KeyPairAccount.fromJson(json.account);
		if(json.hasOwnProperty('network') && json.network) p.network = Network.fromJson(json.network);
		return p;
	}

	private static shippingProps(){ return ['address', 'city', 'state', 'country', 'zipcode', 'phone'] }

	public hasAccount():boolean { return this.account != null && this.network != null }

	/***
	 * Helper for websites to validate that all the information
	 * they require exists within an Identity
	 * @param props - A list of FILLED props. For example [account, name, address]
	 */
	public hasProperties(props:Array<string>):boolean {
		// Shorthand for shipping info.
		if(props.find(x => x === 'shipping')){
			const sprops = Identity.shippingProps();
			props = props.filter(x => !sprops.find(y => y === x));
			props = props.concat(sprops);
		}

		return props.map(prop => this[prop] != null).filter(x=>true).length === props.length
	}

	public shippingInfo(){
		return `
		Full Name: ${this.fullName}\r\n
		Phone Number: ${this.phone}\r\n
		Address: ${this.address} \r\n
		City: ${this.city}\r\n
		State: ${this.state}\r\n
		Country: ${this.country}\r\n
		Zipcode: ${this.zipcode}\r\n`
	}
}