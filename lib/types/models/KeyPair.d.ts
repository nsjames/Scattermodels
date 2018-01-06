import KeyPairAccount from "./KeyPairAccount";
import { Network } from "./Network";
export declare class KeyPair {
    publicKey: string;
    privateKey: string;
    accounts: Array<KeyPairAccount>;
    network: Network;
    reclaimed: boolean;
    removed: boolean;
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
}
export default KeyPair;
