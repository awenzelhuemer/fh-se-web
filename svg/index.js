var items, scoreText, errorCountText, playground, startView; snowflakes;
var width, height;
var score = 0;
var errorCount = 0;
var loopFunctionId;
var audioShoot, audiobackground, audioGameOver;
var running = false;

// -------------------------------------------------------
window.onload = function () {

	items = document.getElementById("items");
	scoreText = document.getElementById("score");
	errorCountText = document.getElementById("errorCount");
	startView = document.getElementById("startView");
	snowflakes = document.getElementById('snowflakes');

	playground = document.getElementById("playground");

	//TODO 1

	audioShoot = new Audio("sound/shoot.mp3");
	audiobackground = new Audio("sound/background.mp3");
	audiobackground.loop = true;

	audioGameOver = new Audio("sound/gameover.mp3");

	startView.onclick = startGame;
	window.onresize = resize;

	resize();
}
// -------------------------------------------------------

document.onkeydown = function (e) {
	if (e.keyCode == 13) {
		requestFullScreen(document.body);
	}
}

// -------------------------------------------------------

document.onclick = function () {
	if (running) {
		if (audioShoot.paused) {
			audioShoot.play();
		} else {
			audioShoot.currentTime = 0
		}
	}
}

// -------------------------------------------------------

function requestFullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

// -------------------------------------------------------

function resize() {
	playground.setAttribute("width", window.innerWidth);
	playground.setAttribute("height", window.innerHeight);

	width = window.innerWidth;
	height = window.innerHeight;
}

// -------------------------------------------------------

function startGame() {
	//TODO 2

	running = true;
	startView.setAttribute("visibility", "hidden");

	loopFunctionId = setInterval(loop, 100);

	audiobackground.play();
	initializeSnowflakes();
}

// -------------------------------------------------------

function loop() {
	createNewItem();
	moveItems();
	moveSnowflakes();
	checkItems();
	updateScreen();
	checkGameOver();
}

// -------------------------------------------------------

function moveItems() {
	//TODO 3

	const list = items.getElementsByTagName("use");

	
	for (let i = 0; i < list.length; i++) {
		let item = list[i];

		let y = Number(item.getAttribute("y"));
		item.setAttribute("y", y + 10);
	}
}

// -------------------------------------------------------

function checkItems() {
	var list = items.getElementsByTagName("use");

	for (var i = 0; i < list.length; i++) {
		//TODO 4

		let item = list[i];

		if(Number(item.getAttribute("y")) > height) {
			items.removeChild(item);

			if(item.type === "gift") {
				score -= item.points;
				errorCount++;
			}
		}
	}
}

// -------------------------------------------------------

function createNewItem() {
	if (Math.random() > 0.90) {
		var item = document.createElementNS("http://www.w3.org/2000/svg", "use");
		item.setAttribute("x", "" + (Math.random() * (width - 100) + 50));
		item.setAttribute("y", "-10");

		switch (Math.floor(Math.random() * 5)) {
			case 0:
				item.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#gift1");
				item.type = "gift";
				item.points = 15;
				break;
			case 1:
				item.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#gift2");
				item.type = "gift";
				item.points = 10;
				break;
			case 2:
				item.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#gift3");
				item.type = "gift";
				item.points = 5;
				break;
			case 3:
				item.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#egg1");
				item.type = "egg";
				item.points = 25;
				break;
			case 4:
				item.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#egg2");
				item.type = "egg";
				item.points = 20;
				break;
			case 5:
				item.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#egg3");
				item.type = "egg";
				item.points = 15;
				break;
		}

		item.addEventListener("click", shoot);
		items.appendChild(item);
	}
}

// -------------------------------------------------------

function shoot(e) {
	if (e.srcElement) {
		var use = e.srcElement;
		items.removeChild(use);

		if (use.type == "gift") {
			score += use.points;
		} else {
			score -= use.points;
			errorCount++;
		}
	}
}

// -------------------------------------------------------

function updateScreen() {
	//TODO 5
	scoreText.textContent = `${score}`;
	errorCountText.textContent = `${errorCount}`;
}

// ------------------------------------------------------

function checkGameOver() {
	//TODO 6

	if(errorCount >= 5) {
		running = false;
		clearInterval(loopFunctionId);
		audiobackground.pause();
		audioGameOver.play();

		const gameOver = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"use"
		);

		gameOver.setAttributeNS(
			"http://www.w3.org/1999/xlink",
			"href",
			"#gameOver"
		);

		playground.appendChild(gameOver);
	}
}

// -------------------------------------------------------

function initializeSnowflakes() {
	var numberOfSnowflakes = Math.floor(width / 15);

	for (var i = 0; i < numberOfSnowflakes; i++) {

		//TODO 7

		var snowflake = document.createElementNS("http://www.w3.org/2000/svg", "use");
		snowflake.setAttribute("x", i * 15);
		snowflake.setAttribute("y", height + 50);
		snowflake.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#snowflake");
		snowflakes.appendChild(snowflake);
	}
}

// -------------------------------------------------------

function moveSnowflakes() {
	var list = snowflakes.getElementsByTagName("use");

	for (var i = 0; i < list.length; i++) {
		var snowflake = list[i];

		//TODO 8
		const y = Number(snowflake.getAttribute("y"));
		snowflake.setAttribute("y", y + 10);

		if(y > height && Math.random() > 0.975) {
			snowflake.setAttribute("y", 0);
		}
		
	}
}