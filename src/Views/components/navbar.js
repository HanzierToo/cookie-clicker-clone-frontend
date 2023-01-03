import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';
import {createTheme, ThemeProvider} from "@mui/material";
import HandleLoad from "../../Hooks/HandleLoad"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Tooltip title="Menu" placement="right" arrow>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Cookie Clicker Clone
                        </Typography>
                        <Tooltip title="Save Game" placement="left" arrow>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="save"
                                component="label"
                                sx={{ mr: 1.4 }}
                                // onClick={}
                            >
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Load Save" placement="left" arrow>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="load save"
                                component="label"
                                sx={{ mr: -1.4 }}
                            >
                                <PublishIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}