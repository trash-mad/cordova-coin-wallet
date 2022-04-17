import { createTheme } from "@mui/material";

const THEME_LIGHT = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#1976d2',
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            default: "#fff",
            paper: "#f5f5f5",
        },
    }
});

export default THEME_LIGHT;
