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
import {Button, createTheme, ThemeProvider} from "@mui/material";
import HandleLoad from "../../Hooks/HandleLoad";
import LoadHandler from "./load_handler";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import * as React from "react";
import HandleSave from "../../Hooks/HandleSave";

export default function Game() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const [backendData, setBackendData] = useState([{}]);
    const [URI, setURI] = useState("");

    const [cookieAmount, setCookieAmount] = useState(0);
    const [cps, setCps] = useState(0);

    const [autoClickerAmt, setAutoClickerAmt] = useState(0);
    const [autoClickerPrice, setAutoClickerPrice] = useState(20);

    const [clickFactoryAmt, setClickFactoryAmt] = useState(0);
    const [clickFactoryPrice, setClickFactoryPrice] = useState(500)

    const [solarClickerAmt, setSolarClickerAmt] = useState(0);
    const [solarClickerPrice, setSolarClickerPrice] = useState(3000);

    const [clickGalaxyAmt, setClickGalaxyAmt] = useState(0);
    const [clickGalaxyPrice, setClickGalaxyPrice] = useState(10000);

    const cpsUpdateCookieAmount = () => {
        setCookieAmount((cookieAmount) => cookieAmount + cps);
    }

    const priceUpdate = () => {
        let temp_price_ac = 20;
        let temp_price_cf = 500;
        let temp_price_sc = 3000;
        let temp_price_cg = 10000;

        for (let i = 0; i < autoClickerAmt; i++){
            temp_price_ac += 20;
        }
        setAutoClickerPrice(temp_price_ac);

        for (let i = 0; i < clickFactoryAmt; i++) {
            temp_price_cf += 300;
        }
        setClickFactoryPrice(temp_price_cf);

        for (let i = 0; i < solarClickerAmt; i++) {
            temp_price_sc += 1000;
        }
        setSolarClickerPrice(temp_price_sc);

        for (let i = 0; i < clickGalaxyAmt; i++) {
            temp_price_cg += 5000;
        }
        setClickGalaxyPrice(temp_price_cg);
    }

    const cpsValueUpdate = () => {
        let cpsValueTemp = 0;

        cpsValueTemp += autoClickerAmt;
        cpsValueTemp += clickFactoryAmt * 10;
        cpsValueTemp += solarClickerAmt * 50;
        cpsValueTemp += clickGalaxyAmt * 100;

        setCps(cpsValueTemp);
    }

    const cookieClicked = (event, param) => {
        setCookieAmount(cookieAmount + param);
    }

    const purchase = (event, param) => {
        switch(param) {
            case 1:
                if(cookieAmount >= autoClickerPrice) {
                    setCookieAmount((cookieAmount) => cookieAmount - autoClickerPrice);
                    setAutoClickerAmt((autoClickerAmt) => autoClickerAmt + 1);
                } else {
                    alert("Not Enough Cookies!")
                }
                break;
            case 2:
                if(cookieAmount >= clickFactoryPrice) {
                    setCookieAmount((cookieAmount) => cookieAmount - clickFactoryPrice);
                    setClickFactoryAmt((clickFactoryAmt) => clickFactoryAmt + 1);
                } else {
                    alert("Not Enough Cookies!")
                }
                break;
            case 3:
                if(cookieAmount >= solarClickerPrice) {
                    setCookieAmount((cookieAmount) => cookieAmount - solarClickerPrice);
                    setSolarClickerAmt((solarClickerAmt) => solarClickerAmt + 1);
                } else {
                    alert("Not Enough Cookies!")
                }
                break;
            case 4:
                if(cookieAmount >= clickGalaxyPrice) {
                    setCookieAmount((cookieAmount) => cookieAmount - clickGalaxyPrice);
                    setClickGalaxyAmt((clickGalaxyAmt) => clickGalaxyAmt + 1);
                } else {
                    alert("Not Enough Cookies!")
                }
                break;
        }
    }

    const loadBtnHandler = async () => {
        try {
            setURI("/api?user_code=" + LoadHandler());
            console.log(URI)

            await fetch(URI).then(
                response => response.json()
            ).then(
                data => {
                    setBackendData(data)
                }
            )

            let parsed_data = JSON.parse(HandleLoad(backendData))
            setCookieAmount(Number(parsed_data.cookieAmount))
            setAutoClickerAmt(Number(parsed_data.autoClickerAmt));
            setClickFactoryAmt(Number(parsed_data.clickFactoryAmt));
            setSolarClickerAmt(Number(parsed_data.solarClickerAmt));
            setClickGalaxyAmt(Number(parsed_data.clickGalaxyAmt));
            setURI("")
        } catch (err) {
            throw err;
            console.log(err)
        }
    }

    const saveBtnHandler = async () => {
        if(cookieAmount > 0 || autoClickerAmt > 0 || clickFactoryAmt > 0 || solarClickerAmt > 0 || clickGalaxyAmt > 0) {
            try {
                setURI("/save?user_data=" + (HandleSave(cookieAmount, autoClickerAmt, clickFactoryAmt, solarClickerAmt, clickGalaxyAmt)));
                await fetch(URI).then(
                    response => response.json()
                ).then(
                    data => {
                        if(data !== null) {
                            prompt("SAVE CODE:", data)
                        } else {
                            alert("Error: Please Try Again.\nNote: This is a common issue and is being investigated.")
                        }
                    }
                )
            } catch (err) {
                throw err;
                console.log(err)
            }
            setURI("")
        } else {
            alert("You don't have any progress in the game!")
        }
    }

    useEffect(() => {
        cpsValueUpdate();
        priceUpdate();
    }, [autoClickerAmt, clickFactoryAmt, solarClickerAmt, clickGalaxyAmt])

    useEffect(() => {
        const interval = setInterval(()=>{
            cpsUpdateCookieAmount();
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, [cps, autoClickerAmt, clickFactoryAmt]);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <Tooltip title="Cookie :)" placement="right" arrow>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <CookieIcon />
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
                                    onClick={saveBtnHandler}
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
                                    onClick={loadBtnHandler}
                                >
                                    <PublishIcon />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <Grid
                container
                columnSpacing={1}
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh'}}
            >
                <Grid item xs={5} style={{paddingTop: '8vh'}}>
                    <Typography variant="h6" gutterBottom>
                        Cookies per Second: {cps}
                    </Typography>
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
                    container
                    xs={7}
                >
                    <Grid
                        item
                        xs={12}
                        style={{paddingBottom: "40px", paddingTop: "60px"}}
                    >
                        <Grid container columnSpacing={3} alignItems="center" justifyContent="center">

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Auto Clicker
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    +1 CpS
                                </Typography>
                            </Grid>

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Price: {autoClickerPrice} Cookies
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    Currently Owned: {autoClickerAmt}
                                </Typography>
                            </Grid>

                        </Grid>
                        <br/>
                        <Button
                            variant="contained"
                            endIcon={<ShoppingCartIcon/>}
                            onClick={event => purchase(event, 1)}
                        >
                            Purchase
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{paddingBottom: "40px"}}
                    >
                        <Grid container columnSpacing={3} alignItems="center" justifyContent="center">

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Click Factory
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    +10 CpS
                                </Typography>
                            </Grid>

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Price: {clickFactoryPrice} Cookies
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    Currently Owned: {clickFactoryAmt}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br/>
                        <Button
                            variant="contained"
                            endIcon={<ShoppingCartIcon/>}
                            onClick={event => purchase(event, 2)}
                        >
                            Purchase
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{paddingBottom: "40px"}}
                    >
                        <Grid container columnSpacing={3} alignItems="center" justifyContent="center">

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Solar Clicker
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    +50 CpS
                                </Typography>
                            </Grid>

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Price: {solarClickerPrice} Cookies
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    Currently Owned: {solarClickerAmt}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br/>
                        <Button
                            variant="contained"
                            endIcon={<ShoppingCartIcon/>}
                            onClick={event => purchase(event, 3)}
                        >
                            Purchase
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Grid container columnSpacing={3} alignItems="center" justifyContent="center">

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Click Galaxy
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    +100 CpS
                                </Typography>
                            </Grid>

                            <Grid item xs={5}>
                                <Typography variant="h5" style={{textAlign: "right"}}>
                                    Price: {clickGalaxyPrice} Cookies
                                </Typography>
                            </Grid>
                            <Grid item xx={2}>
                                <Typography variant="h5" style={{textAlign: "center"}}>
                                    |
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5"  style={{textAlign: "left"}}>
                                    Currently Owned: {clickGalaxyAmt}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br/>
                        <Button
                            variant="contained"
                            endIcon={<ShoppingCartIcon/>}
                            onClick={event => purchase(event, 4)}
                        >
                            Purchase
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}