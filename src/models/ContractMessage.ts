import {ContractAuthorization} from "./ContractAuthorization";

export class ContractMessage {

	code:string;
	type:string;
	authorization:Array<ContractAuthorization>;
	data:any;

	constructor(code = null, type = null, authorization = null, data = null){
		this.code = code;
		this.type = type;
		this.authorization = authorization;
		this.data = data;
	}

	public static placeholder():ContractMessage {
		return new ContractMessage('', '', [], {});
	}

	public static fromJson(json:any){
		let p = Object.assign(ContractMessage.placeholder(), json)
		if(json.hasOwnProperty('authorization')) p.authorization = json.authorization.map(x => ContractAuthorization.fromJson(x));
		return p;
	}

}

export default ContractMessage;




