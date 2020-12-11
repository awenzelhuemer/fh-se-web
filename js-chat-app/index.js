const STORAGE_KEY = "messages";
const HERE_API_KEY = ""; // Create a free here account https://developer.here.com/sign-up

window.onload = function () {
    //TODO 1

    updateTimeline();
}

function updateTimeline() {
    //TODO 4
}

function saveMessage(message) {

    saveMessageToStorage(message, null, null);

    // TODO 5
}

function saveMessageToStorage(message, longitude, latitude) {
    // TODO 2

    // TODO 6 Use HERE API
}

function getMessagesFromStorage() {
    // TODO 3
}

function queryAddressFromHereApi(longitude, latitude) {

    if (longitude == null || latitude == null) {
        return null;
    }

    const url = "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json" +
        "?apiKey=" + HERE_API_KEY + "&mode=retrieveAddresses" +
        "&prox=" + latitude + "%2C" + longitude;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    const response = JSON.parse(xhttp.responseText);
    console.log(response);

    return response.Response.View[0].Result[0].Location.Address.Label;
}