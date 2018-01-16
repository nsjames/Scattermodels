import { Network } from "./Network";
import { KeyPairAccount } from "./KeyPairAccount";
export declare class Identity {
    account: KeyPairAccount;
    network: Network;
    name: string;
    email: string;
    phone: number;
    age: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    constructor();
    static placeholder(): Identity;
    static fromJson(json: any): any;
    private static shippingProps();
    hasAccount(): boolean;
    hasProperties(props: Array<string>): boolean;
    shippingInfo(): string;
}
