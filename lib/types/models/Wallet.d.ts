import KeyPair from "./KeyPair";
import { Network } from "./Network";
export declare class Wallet {
    name: string;
    keyPairs: Array<KeyPair>;
    lastOpened: boolean;
    uniqueKey: string;
    editing: boolean;
    constructor();
    static placeholder(): Wallet;
    static fromJson(json: any): any;
    static newWallet(): Wallet;
    edit(): void;
    stopEditing(): void;
    clone(): any;
    hasKey(publicKey: any, network: any): boolean;
    hasUnreclaimedKey(): number;
    hasAccount(accounts: any): number;
    prepareForSaving(): void;
    decrypt(passkey: any): void;
    encrypt(passkey: any): void;
    keyPairsInNetwork(network: Network): KeyPair[];
    networkBalance(network: any): number;
    networkAccountMap(inNetwork?: any): any[];
}
export default Wallet;
