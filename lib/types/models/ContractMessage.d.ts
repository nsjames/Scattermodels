import { ContractAuthorization } from "./ContractAuthorization";
export declare class ContractMessage {
    code: string;
    type: string;
    authorization: Array<ContractAuthorization>;
    data: any;
    constructor(code?: any, type?: any, authorization?: any, data?: any);
    static placeholder(): ContractMessage;
    static fromJson(json: any): any;
}
export default ContractMessage;
