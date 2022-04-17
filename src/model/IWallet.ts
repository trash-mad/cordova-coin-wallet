export interface IWallet {
    abbr: string;
    can_exchange: boolean;
    can_generate: boolean;
    color: string;
    gradient: [string, string]
    icon: string;
    is_exists: boolean;
    maximum_fraction_digits: number;
    name: string;
    to_usd: number;
    type: "crypto" | "fiat";
}

export default IWallet;
