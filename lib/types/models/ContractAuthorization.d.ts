export declare class ContractAuthorization {
    account: string;
    permission: string;
    constructor(account?: any, permission?: any);
    static placeholder(): ContractAuthorization;
    static fromJson(json: any): any;
}
export default ContractAuthorization;
