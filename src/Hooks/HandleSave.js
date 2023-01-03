function HandleSave(cookieAmount, autoClickerAmt, clickFactoryAmt, solarClickerAmt, clickGalaxyAmt) {

    let data = {
        cookieAmount: cookieAmount,
        autoClickerAmt: autoClickerAmt,
        clickFactoryAmt: clickFactoryAmt,
        solarClickerAmt: solarClickerAmt,
        clickGalaxyAmt: clickGalaxyAmt
    };

    if(cookieAmount > 0 || autoClickerAmt > 0 || clickFactoryAmt > 0 || solarClickerAmt > 0 || clickGalaxyAmt > 0) {
        const string_data = JSON.stringify(data)

        return (
            string_data
        )
    } else {
        console.log("Error Prev.: 0 data")
    }
}

export default HandleSave;