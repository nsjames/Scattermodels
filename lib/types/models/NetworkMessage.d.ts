import { Network } from "./Network";
export declare class NetworkMessage {
    type: string;
    payload: any;
    resolverId: string;
    network: Network;
    constructor(type?: any, payload?: any, resolverId?: any, network?: any);
    static placeholder(): NetworkMessage;
    static payload(type: string, payload: any): NetworkMessage;
    static signal(type: string): NetworkMessage;
    static fromJson(json: any): any;
    respond(payload: any): NetworkMessage;
    error(payload: any): NetworkMessage;
}
export default NetworkMessage;
