import Network from "./Network";
export declare class Settings {
    currentNetwork: Network;
    networks: Array<Network>;
    currency: string;
    constructor();
    static placeholder(): Settings;
    static fromJson(json: any): any;
}
export default Settings;
