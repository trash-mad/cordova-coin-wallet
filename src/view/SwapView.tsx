import React from 'react'

import { OneTyped, FieldType, TypedField } from 'react-declarative';
import { observer } from 'mobx-react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CloseIcon from '@mui/icons-material/Close';

import roundTicks from '../utils/roundTicks';

import ioc from '../lib/ioc';

interface ISwapViewProps {
    abbr: string
}

const fields: TypedField[] = [
    {
        type: FieldType.Typography,
        fieldRightMargin: '0',
        fieldBottomMargin: '0',
        typoVariant: 'h4',
        style: {
            color: '#1976d2',
            minHeight: '30vw',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
        },
        compute: ({ quantity, abbr }) => `${roundTicks(quantity / 100, 3)} ${abbr.toUpperCase()}`,
    },
    {
        type: FieldType.Slider,
        name: 'quantity',
        fieldRightMargin: '0',
        fieldBottomMargin: '0',
        defaultValue: 45.5,
        minSlider: 0,
        maxSlider: 100,
    },
];

export const SwapView = ({
    abbr = 'test',
}: ISwapViewProps) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                '& > *': {
                    width: '100%',
                },
            }}
        >
            <ListItem>
                <ListItemText
                    primary="Swap Currencies"
                    secondary={`From ${abbr.toUpperCase()} To USDT`}
                />
                <IconButton onClick={() => ioc.routerService.push('/wallet-view')}>
                    <CloseIcon />
                </IconButton>
            </ListItem>
            <OneTyped
                fields={fields}
                handler={() => ({ abbr })}
            />
        </Box>
    )
}

export default observer(SwapView);
