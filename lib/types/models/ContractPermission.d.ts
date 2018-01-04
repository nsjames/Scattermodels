export declare class ContractPermission {
    domain: string;
    name: string;
    description: string;
    quantityProp: string;
    constructor(domain?: string, name?: string, description?: string, quantityProp?: any);
    isValid(): boolean;
}
export default ContractPermission;
