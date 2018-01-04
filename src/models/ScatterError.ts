
export class ScatterError {
	type:string;
	message:string;

	constructor(type:string, message:string){
		this.type = type;
		this.message = message;
	}
}

export default ScatterError;