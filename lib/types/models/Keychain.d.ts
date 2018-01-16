import Wallet from "./Wallet";
import { Identity } from "./Identity";
export declare class Keychain {
    wallets: Array<Wallet>;
    identities: Array<Identity>;
    locked: boolean;
    constructor();
    static placeholder(): Keychain;
    static fromJson(jsonOrEncryptedString: any): any;
    static hasUnreclaimedKey(wallets: any): any;
    getOpenWallet(): Wallet;
}
export default Keychain;
