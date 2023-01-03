function LoadHandler() {
    const userCode = prompt("Please Enter Your Save Code:" +
        "\nNOTE: IT MAY TAKE 3-4 ATTEMPTS FOR YOUR SAVE TO LOAD PROPERLY" +
        "\nIF YOUR SAVE DIDN'T LOAD, PLEASE KEEP TRYING AT LEAST 5 TIMES.")
    return(
        userCode
    )
}

export default LoadHandler;