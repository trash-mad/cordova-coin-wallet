import React from 'react';
import { useEffect } from 'react';

import { observer } from 'mobx-react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ButtonBase from '@mui/material/ButtonBase';
import MatListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CircleIcon from '../components/common/CircleIcon';

import ArrowIcon from '@mui/icons-material/KeyboardArrowRight';

import IWallet from '../model/IWallet';

import roundTicks from '../utils/roundTicks';

import ioc from '../lib/ioc';

const cryptoTokens = new Set([
    "busd",
    "nrfx",
    "usdt",
]);

const fiatTokens = new Set([
    "eur",
    "usd",
    "rub",
    "uah",
]);

const ListItem = (wallet: IWallet) => {
    return (
        <MatListItem
            onClick={() => ioc.routerService.push(`/swap-view/${wallet.abbr}`)}
            component={ButtonBase}
            secondaryAction={
                <ArrowIcon />
            }
        >
            <ListItemIcon>
                <CircleIcon
                    url={wallet.icon}
                    gradient={wallet.gradient}
                />
            </ListItemIcon>
            <ListItemText
                primary={wallet.name}
                secondary={`${roundTicks(wallet.to_usd, wallet.maximum_fraction_digits)} USD`}
            />
        </MatListItem>
    );
};

export const WalletView = () => {

    useEffect(() => {
        ioc.layoutService.setHeader(true);
        ioc.layoutService.setFooter(true);
        return () => {
            ioc.layoutService.setHeader(false);
            ioc.layoutService.setFooter(false);
        };
    }, []);

    useEffect(() => {
        ioc.walletService.loadWalletList();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                '& .MuiListItem-root': {
                    width: '100%',
                }
            }}
        >
            <List
                subheader={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Crypto
                    </Typography>
                }
            >
                {ioc.walletService.walletList
                    .filter(({ abbr }) => cryptoTokens.has(abbr))
                    .map((wallet, idx) => (
                        <ListItem
                            key={idx}
                            {...wallet}
                        />
                    ))
                }
                {ioc.walletService.walletList.length === 0 && (
                    <MatListItem>
                        <ListItemText primary="Loading..." />
                    </MatListItem>
                )}
            </List>
            <List
                subheader={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Fiat
                    </Typography>
                }
            >
                {ioc.walletService.walletList
                    .filter(({ abbr }) => fiatTokens.has(abbr))
                    .map((wallet, idx) => (
                        <ListItem
                            key={idx}
                            {...wallet}
                        />
                    ))
                }
                {ioc.walletService.walletList.length === 0 && (
                    <MatListItem>
                        <ListItemText primary="Loading..." />
                    </MatListItem>
                )}
            </List>
        </Box>
    );
}

export default observer(WalletView);
