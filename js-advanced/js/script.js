window.onload = function () {
    
    // register events
    const btnSearch = document.getElementById("search");
    btnSearch.addEventListener("click", search);

    const btnTrending = document.getElementById("trending");
    btnTrending.addEventListener("click", trending);
}

// init
trending();

async function trending() {
    let url = `${API_BASE_URL}/trending?api_key=${API_KEY}&limit=${MAX_RESULTS}`;
    
    let response = await fetch(url);
    let result = await response.json();
    populateResults(result.data);
}

async function search() {
    var searchtext = document.getElementById("searchtext").value;
    let url = `${API_BASE_URL}/search?api_key=${API_KEY}&q=${searchtext}&limit=${MAX_RESULTS}`;
    
    let response = await fetch(url);
    let result = await response.json();
    populateResults(result.data);
}

function populateResults(images) {
    if(images) {

        var parent = document.getElementById("results");

        // clear results
        parent.innerHTML = "";

        console.debug(images[0]);
        images.forEach(img => {

            var imgEleement = new Image();
            imgEleement.src = img.images.original.url;
            imgEleement.alt = img.title;

            parent.append(imgEleement);
        });

        document.body.append(parent);
    }
}