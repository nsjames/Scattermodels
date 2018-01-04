import {Network} from "./Network";
import {NetworkMessageTypes} from "./NetworkMessageTypes";

export class NetworkMessage {
	type:string;
	payload:any;
	resolverId:string;
	network:Network;

	constructor(type = null, payload = null, resolverId = null, network = null){
		this.type = type;
		this.payload = payload;
		this.resolverId = resolverId;
		this.network = network;
	}

	public static placeholder():NetworkMessage {
		let p = new NetworkMessage();
		p.type = '';
		p.payload = {};
		p.resolverId = '';
		p.network = Network.placeholder();
		return p;
	}

	public static payload(type:string, payload:any){
		let p = this.placeholder();
		p.type = type;
		p.payload = payload;
		return p;
	}

	public static signal(type:string){
		let p = this.placeholder();
		p.type = type;
		return p;
	}

	public static fromJson(json:any){ return Object.assign(new NetworkMessage("",{},"", null), json); }
	public respond(payload:any){ return new NetworkMessage(this.type, payload, this.resolverId); }
	public error(payload:any){ return new NetworkMessage(NetworkMessageTypes.ERROR, payload, this.resolverId); }
}
export default NetworkMessage;