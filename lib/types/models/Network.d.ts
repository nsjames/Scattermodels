export declare class Network {
    name: string;
    host: string;
    port: number;
    constructor(name: string, host: string, port: number);
    static placeholder(): Network;
    static fromJson(json: any): Network;
    static testNet(): Network;
    toEndpoint(): string;
}
export default Network;
