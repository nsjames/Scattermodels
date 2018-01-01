import { Network } from "./Network";
export declare class Message {
    type: string;
    payload: any;
    resolverId: string;
    network: Network;
    constructor(type?: any, payload?: any, resolverId?: any, network?: any);
    static placeholder(): Message;
    static payload(type: string, payload: any): Message;
    static signal(type: string): Message;
    static fromJson(json: any): any;
    respond(payload: any): Message;
}
export default Message;
