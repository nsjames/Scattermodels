import KeyPair from "./KeyPair";
import { Network } from "./Network";
export declare class Wallet {
    name: string;
    keyPairs: Array<KeyPair>;
    balance: number;
    lastKnownConversionRate: number;
    defaultPublicKey: string;
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
    getDefaultKeyPair(): KeyPair;
    setDefaultKeyPair(keyPair: any): void;
    hasKey(publicKey: any, network: any): boolean;
    hasUnreclaimedKey(): number;
    hasAccount(accounts: any): number;
    prepareForSaving(): void;
    encrypt(passkey: any): void;
    decrypt(passkey: any): void;
    keyPairsInNetwork(network: Network): KeyPair[];
}
export default Wallet;
