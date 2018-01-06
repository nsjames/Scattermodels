import { ContractMessage } from "./ContractMessage";
export declare class ContractTransaction {
    ref_block_num: string;
    ref_block_prefix: string;
    expiration: string;
    scope: Array<string>;
    messages: Array<ContractMessage>;
    signatures: Array<string>;
    constructor(block_num: any, block_prefix: any, expiration: any, scope: any, messages: any, signatures: any);
    static placeholder(): ContractTransaction;
    static fromJson(json: any): any;
    static replaceScatterProps(transaction: any, account: any): any;
}
