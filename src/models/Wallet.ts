import RandomIdGenerator from '../cryptography/RandomIdGenerator';
import AES from '../cryptography/AES';
import KeyPair from "./KeyPair";
import {Network} from "./Network";

export class Wallet {
	name:string;
	keyPairs:Array<KeyPair>;
	lastOpened:boolean;
	uniqueKey:string;
	editing:boolean;


	constructor(){
        this.name = null;
        this.keyPairs = null;
        this.lastOpened = null;
        this.uniqueKey = null;

        this.editing = false;
	}

	static placeholder() {
		let p = new Wallet();
		p.name = '';
		p.keyPairs = [];
		p.lastOpened = false;
		p.uniqueKey = '';
		return p;
	}

	static fromJson(json) {
		let p = Object.assign(this.placeholder(), json);
		if(json.hasOwnProperty('keyPairs')) p.keyPairs = json.keyPairs.map(x => KeyPair.fromJson(x));
		return p;
	}

	static newWallet(){
		let p = this.placeholder();
		p.name = '';
		p.editing = true;
        p.name = '';
        p.lastOpened = true;
        p.uniqueKey = RandomIdGenerator.generate(24);
		return p;
	}

	edit(){ this.editing = true; }
	stopEditing(){ this.editing = false; }
	clone(){ return Wallet.fromJson(Object.assign({}, this)); }
	hasKey(publicKey, network){ return this.keyPairs.filter(x => x.publicKey === publicKey && x.network.unique() === network.unique()).length > 0 }
	hasUnreclaimedKey(){ return this.keyPairs.filter(x => !x.reclaimed).length }
	hasAccount(accounts){
		return this.keyPairs.filter(x => {
			return x.accounts.map(z => `${z.name}::${z.authority}`).filter(z => accounts.map(z => `${z.name}::${z.permission}`).indexOf(z) > -1).length
		}).length
	}
	prepareForSaving(){ this.keyPairs = this.keyPairs.filter(x => !x.removed); }
	decrypt(passkey){ this.keyPairs.map(x => x.privateKey = AES.decrypt(x.privateKey, passkey)) }
	encrypt(passkey){
		this.keyPairs.map(x => (x.privateKey.length < 80) ? x.privateKey = AES.encrypt(x.privateKey, passkey) : x.privateKey)
        this.editing = false;
	}

	keyPairsInNetwork(network:Network){ return this.keyPairs.filter(x => `${x.network.host}:${x.network.port}` === `${network.host}:${network.port}`) }
	networkBalance(network){ return this.keyPairsInNetwork(network).map(kp => kp.balance).reduce((a,b) => a+b, 0); }
	networkAccountMap(){
		return this.keyPairs.map(x => { return {network:x.network, accounts:x.accounts.map(x => x.name).reduce((a,b) => (a.indexOf(b) > -1) ? a : a.concat(b), [])}})
			.reduce((a,b) => {
				if(!a[b.network.toEndpoint()]) a[b.network.toEndpoint()] = [];
				a[b.network.toEndpoint()].push(b.accounts);
				return a;
			}, []);
	}
}

export default Wallet;