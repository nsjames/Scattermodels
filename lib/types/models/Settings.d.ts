import Network from "./Network";
export declare class Settings {
    provider: Network;
    providers: Array<Network>;
    currency: string;
    constructor();
    static placeholder(): Settings;
    static fromJson(json: any): any;
}
export default Settings;
