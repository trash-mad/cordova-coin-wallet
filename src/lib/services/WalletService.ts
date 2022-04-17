import { makeAutoObservable, runInAction } from 'mobx';

import { inject } from 'react-declarative';

import ApiService from '../base/ApiService';
import LayoutService from '../base/LayoutService';

import IWallet from '../../model/IWallet';

import TYPES from '../types';

export class WalletService {

    readonly apiService = inject<ApiService>(TYPES.apiService);
    readonly layoutService = inject<LayoutService>(TYPES.layoutService);


    private walletMap = new Map<string, IWallet>();

    get walletList(): IWallet[] {
        return [...this.walletMap.values()];
    }

    constructor() {
        makeAutoObservable(this);
    }

    public loadWalletList = async () => {
        if (this.walletMap.size) {
            return;
        }
        this.layoutService.setLoader(true);
        try {
            const data = await this.apiService.get<Record<string, IWallet>>('/wallets.json');
            runInAction(() => {
                Object.entries(data).forEach(([abbr, wallet]) => {
                    this.walletMap.set(abbr, wallet);
                });
            });
        } finally {
            this.layoutService.setLoader(false);
        }
    };

};

export default WalletService;
