import Wallet from "./Wallet";

export class Keychain {
	wallets:Array<Wallet>;
	locked:boolean;

	constructor(){
        this.wallets = null;
        this.locked = null;
	}

	static placeholder() {
		let p = new Keychain();
		p.wallets = [];
        p.locked = true;
		return p;
	}

	static fromJson(jsonOrEncryptedString) {
		if(typeof jsonOrEncryptedString === 'object') {
            let p = Object.assign(this.placeholder(), jsonOrEncryptedString);
            p.wallets = jsonOrEncryptedString.wallets.map(x => Wallet.fromJson(x));
            return p;
        } else return jsonOrEncryptedString;
	}

	getOpenWallet(){ return this.wallets.find(x => x.lastOpened) || Wallet.newWallet(); }
}

export default Keychain;