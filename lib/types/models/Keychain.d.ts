import Wallet from "./Wallet";
export declare class Keychain {
    wallets: Array<Wallet>;
    locked: boolean;
    constructor();
    static placeholder(): Keychain;
    static fromJson(jsonOrEncryptedString: any): any;
    getOpenWallet(): Wallet;
}
export default Keychain;
