import KeyPairAccount from "./KeyPairAccount";
import { Network } from "./Network";
export declare class KeyPair {
    publicKey: string;
    privateKey: string;
    accounts: Array<KeyPairAccount>;
    network: Network;
    balance: number;
    reclaimed: boolean;
    removed: boolean;
    selfStake: boolean;
    constructor();
    static placeholder(): KeyPair;
    static fromJson(json: any): any;
    static fromPair(priv: any, pub: any): KeyPair;
    getHighestAuthority(): any;
    getHighestAuthorityName(): any;
    hasOwnerAuthority(): boolean;
    remove(): void;
    revertRemoval(): void;
    clone(): any;
    setAccounts(accounts: any): void;
    sortAccounts(accounts: any): any;
    truncateKey(): string;
    prepareForSaving(): void;
}
export default KeyPair;
