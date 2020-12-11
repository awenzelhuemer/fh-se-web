var canvas;
var ctx;
var fontSize = 20;

//--------------------------------------------------------------------------
window.onload = function() {
    
    canvas = document.getElementById("matrix");
    ctx = canvas.getContext("2d");

    initializeAnimation();
    setInterval(animation, 80);

    window.onresize = initializeAnimation;
}

//--------------------------------------------------------------------------
function initializeAnimation() {

    canvas.height = window.innerHeight - 20;
    canvas.width = window.innerWidth - 20;

    const numberOfColumns = Math.round(canvas.width / fontSize);
    columns = new Array();

    for (let i = 0; i < numberOfColumns; i++) {
        columns[i] = canvas.height;
    }
}

//--------------------------------------------------------------------------
function animation() {

    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FF00";
    ctx.font = fontSize + "px Arial";

    for (let i = 0; i < columns.length; i++) {
        ctx.fillText(
            randomMatrixSymbol(),
            i*fontSize,
            columns[i] * fontSize
            );

        if((columns[i] * fontSize) > canvas.height
            && Math.random() > 0.975) {
            columns[i] = 0;
        }

        columns[i]++;
    }
}

//--------------------------------------------------------------------------
function randomMatrixSymbol() {
    return String.fromCharCode(
        Math.floor(Math.random() * 26000 + 20000)
    );
}