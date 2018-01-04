export class ContractAuthorization {
	account:string;
	permission:string;

	constructor(account = null, permission = null){
		this.account = account;
		this.permission = permission;
	}

	public static placeholder():ContractAuthorization {
		return new ContractAuthorization('', '');
	}

	public static fromJson(json:any){
		return Object.assign(ContractAuthorization.placeholder(), json)
	}
}

export default ContractAuthorization;