import Eos = require('eosjs');
import ecc = require('eosjs-ecc');
import {KeyPairAccount} from '../models/KeyPairAccount';



export class EOSService {
	eos:any;

	constructor(endpoint:string = 'http://192.168.56.101:8888'){
		this.eos = Eos.Localnet({
			httpEndpoint:endpoint
		})
	}

	// TODO: There's an issue with testnet that it sometimes rejects requests.
	// For important stuff like this is might be worthwhile to hit the endpoint
	// a few times to verify that there is indeed nothing there.
	public getAccountsFromPublicKey(publicKey){
		console.log("Searching for accounts for: " + publicKey)
		console.log(this.eos);
		return new Promise((resolve, reject) => {
			this.eos.getKeyAccounts(publicKey).then(res => {
				if(!res.hasOwnProperty('account_names')){ resolve([]); return false; }
				Promise.all(res.account_names.map(name => this.eos.getAccount(name).catch(e => console.log("Inner error: ", e)))).then(multires => {
					let accounts = [];
					multires.filter(x => x).map((account:any) => {
						account.permissions.map(permissions => {
							accounts.push({name:account.account_name, auth:permissions.perm_name, keys:permissions.required_auth.keys.map(x => x.key)});
						});
					});
					accounts = accounts.filter(x => x.keys.indexOf(publicKey) > -1);
					resolve(accounts.map(account => KeyPairAccount.fromJson({name:account.name, authority:account.auth})))
				}).catch(e => {
					console.log("Error getting accounts from public key: ", e);
					resolve([]);
				});
			});
		})
	}


	public abiJsonToBin(code, action, args){
		return new Promise((resolve, reject) => {
			this.eos.abiJsonToBin({code, action, args})
				.then(res => resolve(res.binargs))
				.catch(e => reject(e))
		})
	}


	static sign(trx, privateKey){
		return ecc.sign(trx, privateKey);
	}

	public getLatestBlock(){
		return new Promise((resolve, reject) => {
			this.eos.getInfo({}).then(info => {
				// TODO: ERROR(?)
				if(!info) return;

				this.eos.getBlock({block_num_or_id: info.head_block_num}).then(block => {
					// TODO: ERROR(?)
					if(!block) return;

					resolve(block);
				});
			})
		})
	}

	public pushTransaction(signedTransaction){
		return new Promise((resolve, reject) => {
			this.eos.pushTransaction(signedTransaction).then(trx => {
				console.log("TRX?", trx)
				resolve(trx);
			});
		})
	}

}