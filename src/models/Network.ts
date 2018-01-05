export class Network {
	name:string;
	host:string;
	port:number;

	constructor(name:string, host:string, port:number){
		this.name = name;
		this.host = host;
		this.port = port;
	}

	static placeholder():Network {
		let p = new Network("", "", -1);
		p.name = '';
		p.host = '';
		p.port = -1;
		return p;
	}

	static fromJson(json):Network {
		return Object.assign(this.placeholder(), json);
	}

	static testNet(){
		let p = this.placeholder();
		p.name = 'Test Net';
		p.host = 'testnet1.eos.io'
		p.port = 8888;
		return p;
	}

	toEndpoint(){ return `http://${this.host}:${this.port}` }
	clone(){ return Network.fromJson(Object.assign({}, this)); }
}

export default Network;