import React from 'react';

import { observer } from "mobx-react";
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import Restore from '@mui/icons-material/Restore';

import ioc from '../../lib/ioc';

const HEADER_HEIGHT = 50;

const useStyles = makeStyles(() => ({
    appBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 'auto',
        height: HEADER_HEIGHT,
        background: 'white !important',
        boxShadow: 'none !important',
        '& .MuiTypography-root': {
            lineHeight: 1,
            fontWeight: 'bold',
            color: alpha('#000', 0.8),
        },
        '& .MuiGrid-item': {
            display: 'flex',
            alignItems: 'center',
        }
    },
    loaderBar: {
        marginBottom: -4,
        marginTop: -2,
        zIndex: 9999,
    },
    grid: {
        margin: 0,
    },
    adjust: {
        paddingTop: HEADER_HEIGHT,
    }
}));

export const Header = () => {
    const classes = useStyles();

    const handleClick = () => {
        ioc.alertService.notify('Lorem ipsum)');
    };

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar variant='dense' disableGutters>
                    <Grid className={classes.grid} container>
                        <Grid item>
                            <Box pl={1}>
                                <Typography variant="h6">
                                    Coin Wallet
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Box pr={1}>
                                <IconButton onClick={handleClick} color="primary">
                                    <Restore />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
                {ioc.layoutService.hasLoader && (
                    <Box className={classes.loaderBar}>
                        <LinearProgress color="secondary" />
                    </Box>
                )}
            </AppBar>
            <div className={classes.adjust} />
        </>
    );
};

export default observer(Header);
