import KeyPairAccount from "./KeyPairAccount";
export declare class KeyPair {
    publicKey: string;
    privateKey: string;
    accounts: Array<KeyPairAccount>;
    removed: boolean;
    constructor();
    static placeholder(): KeyPair;
    static fromJson(json: any): any;
    static fromPair(priv: any, pub: any): KeyPair;
    getHighestAuthority(): string;
    hasOwnerAuthority(): boolean;
    remove(): void;
    revertRemoval(): void;
    clone(): any;
    setAccounts(accounts: any): void;
    sortAccounts(accounts: any): any;
}
export default KeyPair;
