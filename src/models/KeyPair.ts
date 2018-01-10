import KeyPairAccount from "./KeyPairAccount";
import {Network} from "./Network";

export class KeyPair {
	publicKey:string;
	privateKey:string;
	accounts:Array<KeyPairAccount>;
	network:Network;
	balance:number;
	reclaimed:boolean;
	removed:boolean;

	selfStake:boolean = false;
	
	constructor(){
        this.publicKey = null;
        this.privateKey = null;
        this.accounts = null;
        this.network = null;
        this.balance = null;
		this.reclaimed = null;

        this.removed = null;
	}

	static placeholder(){
		let p = new KeyPair();
		p.publicKey = '';
		p.privateKey = '';
		p.accounts = [];
		p.network = Network.placeholder();
		p.balance = 0;
		p.reclaimed = false;
		return p;
	}

	static fromJson(json) {
		let p = Object.assign(this.placeholder(), json);
		if(json.hasOwnProperty('network')) p.network = Network.fromJson(json.network);
		return p;
	}

	static fromPair(priv, pub) {
		let p = this.placeholder();
		p.privateKey = priv;
		p.publicKey = pub;
		return p;
	}

    getHighestAuthority(){
		return (this.accounts.length) ? this.sortAccounts(this.accounts)[0].authority.toLowerCase() : 'No account found';
	}

    getHighestAuthorityName(){
		return (this.accounts.length) ? this.sortAccounts(this.accounts)[0].name : 'No account found';
	}

	hasOwnerAuthority(){
    	return this.getHighestAuthority().toLowerCase() === 'owner';
	}

	remove(){ this.removed = true; }
	revertRemoval(){ this.removed = false; }
	clone(){ return KeyPair.fromJson(Object.assign({}, this)) }
	setAccounts(accounts){ this.accounts = this.sortAccounts(accounts); }

	sortAccounts(accounts){
		return Object.assign([], accounts).sort((a,b) => {
            return (Authorities[a.authority.toLowerCase()] || 0) < Authorities[b.authority.toLowerCase()] || 0;
        });
	}

	truncateKey(){ return (this.publicKey.length) ? this.publicKey.substr(0, 3) + '.....' + this.publicKey.substr(this.publicKey.length -4) : ''; }

	prepareForSaving(){
		delete (<any>this).tempName;
		delete (<any>this).selfStakeAccountName;
		delete (<any>this).selfStakePrivateKey;
	}
}

const Authorities = {owner:2, active:1};

export default KeyPair;
