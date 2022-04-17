
import { inject } from 'react-declarative';

import RouterService from "./base/RouterService";
import AlertService from "./base/AlertService";
import SessionService from "./base/SessionService";
import ErrorService from "./base/ErrorService";
import ApiService from "./base/ApiService";
import LayoutService from './base/LayoutService';

import WalletService from './services/WalletService';

import { NF_DENIED } from "../config";
import { NF_ERROR } from "../config";
import { NF_OFFLINE } from "../config";

import "./config"

import TYPES from "./types";

const systemServices = {
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    sessionService: inject<SessionService>(TYPES.sessionService),
    errorService: inject<ErrorService>(TYPES.errorService),
    apiService: inject<ApiService>(TYPES.apiService),
    layoutService: inject<LayoutService>(TYPES.layoutService),
};

const appServices = {
    walletService: inject<WalletService>(TYPES.walletService),
};

export const ioc = {
    ...systemServices,
    ...appServices,
};

ioc.errorService.permissionsSubject.subscribe(() => {
    ioc.routerService.push(NF_DENIED);
});

ioc.errorService.offlineSubject.subscribe(() => {
    ioc.routerService.push(NF_OFFLINE);
});

ioc.errorService.dieSubject.subscribe(() => {
    ioc.routerService.push(NF_ERROR);
});

window.addEventListener('unhandledrejection', () => ioc.errorService.die());
window.addEventListener('error', () => ioc.errorService.die());

(window as any).ioc = ioc;

export default ioc;
