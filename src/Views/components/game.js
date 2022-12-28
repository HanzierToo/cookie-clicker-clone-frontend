import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import CookieIcon from '@mui/icons-material/Cookie';
import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Button} from "@mui/material";

export default function Game() {

    const [cookieAmount, setCookieAmount] = useState(0);
    const [cps, setCps] = useState(1);
    const [show, setShow] = useState(false)

    const cookieClicked = (event, param) => {
        setCookieAmount(cookieAmount + param)
    }



    return (
        <Grid
            container
            columnSpacing={1}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh'}}
        >
            <Grid item xs={5} style={{paddingTop: '8vh'}}>
                <IconButton
                    size="large"
                    edge="false"
                    color="inherit"
                    aria-label="cookie"
                    onClick={event => cookieClicked(event, 1)}
                >
                    <CookieIcon
                        sx={{ fontSize: 100 }}
                    />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {cookieAmount}
                </Typography>
            </Grid>
            <Grid
                item
                xs={7}
            >
                <Typography variant="h4">
                    Test
                </Typography>
                <Button variant="contained" endIcon={<ShoppingCartIcon/>}>
                    Purchase
                </Button>
            </Grid>
        </Grid>
    )
}