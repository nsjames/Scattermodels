import Settings from "./Settings";
import Keychain from "./Keychain";
export declare class ScatterData {
    meta: Meta;
    data: Data;
    constructor();
    static placeholder(): ScatterData;
    static fromJson(json: any): any;
    lock(): void;
    unlock(): void;
    clone(): any;
    static update(scatter: any): Promise<{}>;
}
export default ScatterData;
export declare class Meta {
    version: string;
    constructor();
    static placeholder(): Meta;
    static fromJson(json: any): any;
}
export declare class Data {
    settings: Settings;
    keychain: Keychain;
    permissions: Array<string>;
    hash: string;
    constructor();
    static placeholder(): Data;
    static fromJson(json: any): any;
}
