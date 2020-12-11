
window.onload = function() {

    // register events
    const formConvert = document.getElementById("formConvert");
    formConvert.addEventListener("submit", convertTemperature, false);
}

function convertTemperature(evt) {
    // prevent page reload
    evt.preventDefault();

    const divError = document.getElementById("error");

    // reset error text
    divError.innerText = "";

    try {

        const MIN_VALUE = -459.67;
        const MAX_VALUE = 10000;

        let txtFahrenheit = document.getElementById("txtFahrenheit").value;

        if (isNaN(txtFahrenheit)) {
            throw "Text is not a number!";
        } else if(txtFahrenheit < MIN_VALUE) {
            throw `Value is greater ${MIN_VALUE}°!`;
        } else if(txtFahrenheit > MAX_VALUE) {
            throw `Wert ist smaller ${MAX_VALUE}°°!`;
        }

        // convert fahrenheit to celsius
        let converted = Math.round((txtFahrenheit - 32) * 5/9);

        let divCelsius = document.getElementById("divCelsius");

        divCelsius.innerText = `${converted}°`;

        if(converted > 0) {
            divCelsius.style = `background-color: rgba(207, 0, 15, ${txtFahrenheit / MAX_VALUE}); color: black;`;
        } else {
            celsius.style = `background-color: rgba(44, 130, 201, ${txtFahrenheit / MIN_VALUE});`;
        }
    } catch (error) {
        console.log(error);
        divError.innerText = error;
    }
    
}

function functionInScript(){
    console.log(' -- script.js loaded --');
}
