import React from 'react';

import Box from '@mui/material/Box';

interface ICircleIconProps {
    url: string;
    gradient: [string, string],
}

export const CircleIcon = ({
    url,
    gradient: [from, to]
}: ICircleIconProps) => {
    return (
        <Box
            sx={{
                background: `linear-gradient(
                    45deg,
                    ${from} 0%,
                    ${to} 100%
                )`,
                height: '42px',
                width: '42px',
                borderRadius: '50%',
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url("${url}")`,
                    backgroundPosition: '50%',
                    backgroundSize: 'contain',
                    height: 'inherit',
                    width: 'inherit',
                }}
            />
        </Box>
    )
};

export default CircleIcon;
