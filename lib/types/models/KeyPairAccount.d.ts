export declare class KeyPairAccount {
    name: string;
    authority: string;
    constructor();
    static placeholder(): KeyPairAccount;
    static fromJson(json: any): any;
}
export default KeyPairAccount;
