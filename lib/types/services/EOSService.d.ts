export declare class EOSService {
    eos: any;
    constructor(endpoint?: string);
    getAccountsFromPublicKey(publicKey: any): Promise<{}>;
    abiJsonToBin(code: any, action: any, args: any): Promise<{}>;
    static sign(trx: any, privateKey: any): any;
    getLatestBlock(): Promise<{}>;
    pushTransaction(signedTransaction: any): Promise<{}>;
}
