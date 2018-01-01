import LocalStream from '../streams/LocalStream';
import Settings from "./Settings";
import Keychain from "./Keychain";

export class ScatterData {
	meta:Meta;
	data:Data;

	constructor(){
        this.meta = null;
        this.data = null;
	}

	static placeholder() {
		let p = new ScatterData();
		p.meta = Meta.placeholder();
		p.data = Data.placeholder();
		return p;
	}

	static fromJson(json) {
		let p = Object.assign(this.placeholder(), json);
		if(!json) return p;
		if(json.hasOwnProperty('meta')) p.meta = Meta.fromJson(json.meta);
		if(json.hasOwnProperty('data')) p.data = Data.fromJson(json.data);
		return p;
	}
	lock(){ this.data.keychain.locked = true; }
    unlock(){ this.data.keychain.locked = false; }
    clone(){ return ScatterData.fromJson(Object.assign({}, this)) }

    static update(scatter){
        return new Promise((resolve, reject) => {
            LocalStream.send({msg:'update', scatter}).then(response => {
                resolve(response);
            })
		})
    }

}

export default ScatterData;

export class Meta {
	version:string;

	constructor(){
		this.version = null;
	}

	static placeholder() {
		let p = new Meta();
		p.version = '';
		return p;
	}

	static fromJson(json) {
		return Object.assign(this.placeholder(), json);
	}
}

export class Data {
	settings:Settings;
	keychain:Keychain;
	permissions:Array<string>;
	hash:string;

	constructor(){
        this.settings = null;
        this.keychain = null;
        this.permissions = [];
        this.hash = "";
	}

	static placeholder() {
		let p = new Data();
		p.settings = Settings.placeholder();
		p.keychain = Keychain.placeholder();
		p.permissions = [];
		p.hash = '';
		return p;
	}

	static fromJson(json) {
		let p = Object.assign(this.placeholder(), json);
		p.settings = Settings.fromJson(json.settings);
		p.keychain = Keychain.fromJson(json.keychain);
		// p.permissions = DomainPermissions.fromJson(json.keychain);
		return p;
	}
}