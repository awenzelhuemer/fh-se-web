const STORAGE_KEY = "messages";
const HERE_API_KEY = "GnyCY3LNNpJLCVB9mxzThsA1nGnNtHzmlhY4CAR1-mg"; // Create a free here account https://developer.here.com/sign-up

window.onload = function () {

    const btn = document.getElementById("sendBtn");
    btn.onclick = function(event) {
        event.preventDefault();

        const message = document.getElementById("message");
        saveMessage(message.value);

        message.value = "";
        updateTimeline();
    }

    updateTimeline();
}

function updateTimeline() {

    const messages = getMessagesFromStorage();

    let html = "";
    messages.forEach(m => {
        let createdAt = "no time";
        if(m.createdAt) {
            createdAt = new Date(m.createdAt).toLocaleDateString();
        }

        let pos = "unknown position";
        if(m.adress){
            pos = m.adress;
        } else if(m.latitude != null && m.longitude != null) {
            pos = `(${m.latitude.toFixed(2)}/${m.longitude.toFixed(2)})`;
        }

        html += `
            <div class="panel panel-default">
                <div class="panel-body">
                    ${m.message}
                </div>
                <div class="panel-footer">
                    <div class="pull-right">
                        send at ${createdAt} from ${pos}
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>`;
    });

    const timeline = document.getElementById("timeline");
    timeline.innerHTML = html;
}

function saveMessage(message) {

    navigator.geolocation.getCurrentPosition(success => {
        saveMessageToStorage(message, success.coords.longitude, success.coords.latitude);
    }, error => {
        console.error(error);
        saveMessageToStorage(message, null, null);
    });
}

function saveMessageToStorage(message, longitude, latitude) {

    let address = null;
    
    try {
        address = queryAddressFromHereApi(longitude, latitude);

    } catch(e) {
        console.warn(e);
    }

    const messages = getMessagesFromStorage();

    messages.push({
        message:message,
        createdAt: new Date().getTime(),
        latitude: latitude,
        longitude: longitude,
        address: null
    });

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

    updateTimeline();

}

function getMessagesFromStorage() {

    const messages = window.localStorage.getItem(STORAGE_KEY);

    if(!messages) {
        return [];
    }
    return JSON.parse(messages);
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