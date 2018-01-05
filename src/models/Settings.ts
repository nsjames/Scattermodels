import Network from "./Network";
export class Settings {
	currentNetwork:Network;
	networks:Array<Network>;
	currency:string;

	constructor(){
        this.currentNetwork = null;
        this.networks = null;
        this.currency = null;
	}

	static placeholder() {
		let p = new Settings();
		p.currentNetwork = Network.placeholder();
		p.networks = [];
		p.currency = '';
		return p;
	}

	static fromJson(json) {
		let p = Object.assign(this.placeholder(), json);
		p.currentNetwork = Network.fromJson(json.currentNetwork);
		p.networks = json.networks.map(x => Network.fromJson(x));
		return p;
	}
}

export default Settings;