import React from 'react';

import { observer } from "mobx-react";
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import SyncIcon from '@mui/icons-material/Sync';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import CardIcon from '@mui/icons-material/CreditCardOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';

import Header from './Header';

import ioc from '../../lib/ioc';

interface IScaffoldProps {
    children: React.ReactNode;
}

const FOOTER_HEIGHT = 50;

const useStyles = makeStyles({
    footer: {
        background: 'white !important',
        color: `${alpha('#fff', 0.23)} !important`,
        position: 'fixed',
        top: 'auto !important',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: FOOTER_HEIGHT,
        '& .MuiGrid-item': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& .MuiSvgIcon-root': {
            lineHeight: 1,
            color: alpha('#000', 0.23),
        },
    },
    adjust: {
        paddingTop: FOOTER_HEIGHT,
    },
})

export const Scaffold = ({
    children,
}: IScaffoldProps) => {
    const classes = useStyles();

    const handleClick = () => {
        ioc.alertService.notify('Lorem ipsum)');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            {ioc.layoutService.hasHeader && (
                <Header />
            )}
            <Box p={1}>
                <Grid component="main" container>
                    {children}
                </Grid>
            </Box>
            <Box className={classes.adjust} />
            {ioc.layoutService.hasFooter && (
                <AppBar className={classes.footer}>
                    <Toolbar variant='dense' disableGutters>
                        <Grid container>
                            <Grid item xs>
                                <IconButton onClick={handleClick} size="small" color="inherit">
                                    <HomeIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs>
                                <IconButton onClick={handleClick} size="small" color="inherit">
                                    <CardIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs>
                                <Fab onClick={handleClick} sx={{ marginTop: '-25px' }} size="small" color="primary" aria-label="add">
                                    <SyncIcon sx={{ color: 'white !important' }} />
                                </Fab>
                            </Grid>
                            <Grid item xs>
                                <IconButton onClick={handleClick} size="small" color="inherit">
                                    <Badge color="secondary" badgeContent="4">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid item xs>
                                <IconButton onClick={handleClick} size="small" color="inherit">
                                    <PersonIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            )}
        </Box>
    );
};

export default observer(Scaffold);
