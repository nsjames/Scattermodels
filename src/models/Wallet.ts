import RandomIdGenerator from '../cryptography/RandomIdGenerator';
import AES from '../cryptography/AES';
import KeyPair from "./KeyPair";
import {Network} from "./Network";

export class Wallet {
	name:string;
	keyPairs:Array<KeyPair>;
	balance:number;
	lastKnownConversionRate:number;
	defaultPublicKey:string;
	lastOpened:boolean;
	uniqueKey:string;
	editing:boolean;


	constructor(){
        this.name = null;
        this.keyPairs = null;
        this.balance = null;
        this.lastKnownConversionRate = null;
        this.defaultPublicKey = null;
        this.lastOpened = null;
        this.uniqueKey = null;

        this.editing = false;
	}

	static placeholder() {
		let p = new Wallet();
		p.name = '';
		p.keyPairs = [];
		p.balance = 0;
		p.lastKnownConversionRate = 0.00;
		p.defaultPublicKey = '';
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
	getDefaultKeyPair(){ return (this.defaultPublicKey.length) ? this.keyPairs.filter(x => x.publicKey === this.defaultPublicKey)[0] : this.keyPairs[0]; }
	setDefaultKeyPair(keyPair){ this.defaultPublicKey = keyPair.publicKey; }
	hasKey(publicKey, network){ return this.keyPairs.filter(x => x.publicKey === publicKey && x.network.unique() === network.unique()).length > 0 }
	hasUnreclaimedKey(){ return this.keyPairs.filter(x => !x.reclaimed).length }
	hasAccount(accounts){
		let acc = accounts.map(z => `${z.name}::${z.permission}`);

		return this.keyPairs.filter(x => {
			return x.accounts.map(z => `${z.name}::${z.authority}`).filter(z => acc.indexOf(z) > -1).length
		}).length
	}
	prepareForSaving(){
		let removedKeys = this.keyPairs.filter(x => x.removed).map(x => x.publicKey);
		this.keyPairs = this.keyPairs.filter(x => !x.removed);
		if(removedKeys.indexOf(this.defaultPublicKey) > -1) this.defaultPublicKey = '';
        if(!this.defaultPublicKey.length) this.defaultPublicKey = this.keyPairs[0].publicKey;
	}

	//TODO: Change back to waterfall
	encrypt(passkey){
		this.keyPairs.map(x => (x.privateKey.length < 80) ? x.privateKey = AES.encrypt(x.privateKey, passkey) : x.privateKey)
        this.editing = false;
	}
	decrypt(passkey){
		this.keyPairs.map(x => x.privateKey = AES.decrypt(x.privateKey, passkey))
	}

	keyPairsInNetwork(network:Network){
		return this.keyPairs.filter(x => `${x.network.host}:${x.network.port}` === `${network.host}:${network.port}`)
	}

}

export default Wallet;