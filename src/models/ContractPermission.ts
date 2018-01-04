
export class ContractPermission {
	domain:string;
	name:string;
	description:string;
	quantityProp:string;
	

	constructor(domain = '', name = '', description = '', quantityProp = null){
		this.domain = domain;
		this.name = name;
		this.description = description;
		this.quantityProp = quantityProp;
	}

	public isValid(){
		return this.domain.length > 3 && this.domain.indexOf('.') > -1 && this.domain.indexOf('//') === -1 &&
				this.name.length > 3 && this.description.length > 10 && this.description.length < 140
	}

}

export default ContractPermission;