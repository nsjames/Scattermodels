// import CryptoJS from "crypto-js";
const CryptoJS = require('crypto-js');

export class AES {

    static encrypt(data:any, key:string):string {
        if(typeof data === 'object') data = JSON.stringify(data);
        return CryptoJS.AES.encrypt(data, key).toString()
    }

    static decrypt(encryptedData:string, key:string):any {
        let clear = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
        try { return JSON.parse(clear) } catch(e){ return clear; }
    }
}

export default AES;