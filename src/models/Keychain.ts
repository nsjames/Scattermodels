import Wallet from "./Wallet";
import {Identity} from "./Identity";

export class Keychain {
	wallets:Array<Wallet>;
	identities:Array<Identity>;
	locked:boolean;

	constructor(){
        this.wallets = null;
        this.identities = null;
        this.locked = null;
	}

	static placeholder() {
		let p = new Keychain();
		p.wallets = [];
		p.identities = [];
        p.locked = true;
		return p;
	}

	static fromJson(jsonOrEncryptedString) {
		let p = Object.assign(this.placeholder(), jsonOrEncryptedString);
		p.wallets = jsonOrEncryptedString.wallets.map(x => Wallet.fromJson(x));
		p.identities = jsonOrEncryptedString.identities.map(x => Identity.fromJson(x));
		return p;
	}

	static hasUnreclaimedKey(wallets){ return wallets.filter(x => x.find(z => z.reclaimed)).length }

	getOpenWallet(){ return this.wallets.find(x => x.lastOpened) || Wallet.newWallet(); }
}

export default Keychain;