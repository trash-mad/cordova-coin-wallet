import React from 'react';

import { ISwitchItem } from 'react-declarative';

import {
  NF_ERROR,
  NF_DENIED,
  NF_NOTFOUND,
  NF_OFFLINE,
} from './config';

import WalletView from './view/WalletView';
import SwapView from './view/SwapView';

const systemRoutes: ISwitchItem[] = [
  {
    path: NF_ERROR,
    element: () => <p>Произошла ошибка. Перезапустите приложение</p>,
  },
  {
    path: NF_DENIED,
    element: () => <p>Отказано в доступе. Перезапустите приложение</p>,
  },
  {
    path: NF_NOTFOUND,
    element: () => <p>Страница не найдена. Перезапустите приложение</p>,
  },
  {
    path: NF_OFFLINE,
    element: () => <p>Нет доступа к интернету. Перезапустите приложение</p>,
  },
]

export const routes: ISwitchItem[] = [
  {
    path: '/',
    redirect: '/wallet-view'
  },
  {
    path: '/wallet-view',
    element: WalletView,
  },
  {
    path: '/swap-view/:abbr',
    element: SwapView,
  },
  ...systemRoutes
];

export default routes;