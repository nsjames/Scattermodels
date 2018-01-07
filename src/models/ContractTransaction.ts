
import {ContractMessage} from "./ContractMessage";
export class ContractTransaction {
	ref_block_num:string;
	ref_block_prefix:string;
	expiration:string;
	scope:Array<string>;
	messages:Array<ContractMessage>;
	signatures:Array<string>;

	constructor(block_num, block_prefix, expiration, scope, messages, signatures){
		this.ref_block_num = block_num;
		this.ref_block_prefix = block_prefix;
		this.expiration = expiration;
		this.scope = scope;
		this.messages = messages;
		this.signatures = signatures;
	}

	public static placeholder(){
		return new ContractTransaction('', '', '', [], [], []);
	}

	public static fromJson(json:any){
		let p = Object.assign(ContractTransaction.placeholder(), json);
		p.messages = json.messages.map(x => ContractMessage.fromJson(x));
		return p;
	}

	public static replaceScatterProps(transaction, account){
		console.log('Rplace props: ', transaction, account)
		function morphScatterProps(obj){
			Object.keys(obj).map(key => {
				if(obj[key] === '[scatter]') obj[key] = account.name;
			});
		}

		transaction.scope.push(account.name);
		transaction.messages.map(msg => {
			morphScatterProps(msg.data);
			msg.authorization = msg.authorization.concat([{account:account.name, permission:account.authority}])
		});
		if(transaction.hasOwnProperty('data')) morphScatterProps(transaction.data);
		return transaction;
	}
}