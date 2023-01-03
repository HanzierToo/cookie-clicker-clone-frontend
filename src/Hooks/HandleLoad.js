function HandleLoad(backendData) {

    let data = {
        cookieAmount: 0,
        autoClickerAmt: 0,
        clickFactoryAmt: 0,
        solarClickerAmt: 0,
        clickGalaxyAmt: 0
    };

    data.cookieAmount = backendData.game_data.cookieAmount;
    data.autoClickerAmt = backendData.game_data.autoClickerAmt;
    data.clickFactoryAmt = backendData.game_data.clickFactoryAmt;
    data.solarClickerAmt = backendData.game_data.solarClickerAmt;
    data.clickGalaxyAmt = backendData.game_data.clickGalaxyAmt;

    const string_data = JSON.stringify(data)

    console.log(string_data)

    return (
        string_data
    )
}

export default HandleLoad;