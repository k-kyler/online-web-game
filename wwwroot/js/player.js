var index = -1;


if (window.location.pathname == "/Game") {
    index = 0;
}
if (window.location.pathname == "/Game/BlueRoom") {
    index = 1;
}
if (window.location.pathname == "/Game/GreenRoom") {
    index = 2;
}
if (window.location.pathname == "/Game/RedRoom") {
    index = 3;
}
if (window.location.pathname == "/Game/PurpleRoom") {
    index = 4;
}

// Change 'index' from [0-4]
// Then:
//      /Game
//      /Game/BlueRoom
//      /Game/GreenRoom
//      /Game/RedRoom
//      /Game/PurpleRoom
// To choose the exact map that appears in each room.


var mapName = ["hall_map", "blue_room", "green_room", "red_room", "purple_room"];
var canvas = document.getElementById(mapName[index]);
var ctx = canvas.getContext("2d");
canvas.height = 478;
canvas.width = 928;

var keys = [];
var player
if (index == 0) {
    player = {
        x: 449,
        y: 200,
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0,
        speed: 10,
        moving: false,
    }
}
else if (index == 1) {
    player = {
        x: 865,
        y: 59,
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0,
        speed: 10,
        moving: false,
    }
}
else if (index == 2) {
    player = {
        x: 30,
        y: 417,
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0,
        speed: 10,
        moving: false,
    }
}
else if (index == 3) {
    player = {
        x: 865,
        y: 417,
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0,
        speed: 10,
        moving: false,
    }
}
else if (index == 4) {
    player = {
        x: 30,
        y: 30,
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0,
        speed: 10,
        moving: false,
    }
}

//Get character gender
var params = new URLSearchParams(window.location.search)
if (params.get("gd") == "male") {
    playerSpiteURL = "../assets/indianajones.png"
}
else {
    playerSpiteURL = "../assets/marionravenwood.png"
}

var playerSprite = new Image();
playerSprite.src = playerSpiteURL;
var map = new Image();
map.src = "../assets/" + mapName[index] + ".png";


window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    player.moving = true;
});

window.addEventListener("keyup", (e) => {
    delete keys[e.key];
    player.moving = false;
});

function movePlayer() {
    if ((keys["ArrowLeft"] || keys["a"]) && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (
        (keys["ArrowRight"] || keys["d"]) &&
        player.x < canvas.width - player.width
    ) {
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
    if ((keys["ArrowUp"] || keys["w"]) && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (
        (keys["ArrowDown"] || keys["s"]) &&
        player.y < canvas.height - player.height
    ) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
}
function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) {
        player.frameX++;
    } else {
        player.frameX = 0;
    }
}

//Red door location
var redDoor = {
    x: 96,
    y: 96,
    width: 32,
    height: 32
}
var redDoorBack = {
    x: 900,
    y: 415,
    width: 59,
    height: 63
}
//Blue door location
var blueDoor = {
    x: 96,
    y: 351,
    width: 32,
    height: 32
}
var blueDoorBack = {
    x: 896,
    y: 1,
    width: 63,
    height: 32
}
//Green door location
var greenDoor = {
    x: 799,
    y: 96,
    width: 32,
    height: 32
}
var greenDoorBack = {
    x: 1,
    y: 400,
    width: 64,
    height: 78
}
//Purple door location
var purpleDoor = {
    x: 799,
    y: 351,
    width: 32,
    height: 32
}
var purpleDoorBack = {
    x: 1,
    y: 1,
    width: 64,
    height: 32
}

//Press E to enter rooms
function enterDoor() {
    x = player.x + player.width/2
    y = player.y + player.height/2
    if (keys["e"] && x >= redDoor.x && x <= redDoor.x + redDoor.width && y >= redDoor.y && y <= redDoor.y + redDoor.height) {
        window.location.pathname = "/Game/RedRoom"
    }
    if (keys["e"] && x >= blueDoor.x && x <= blueDoor.x + blueDoor.width && y >= blueDoor.y && y <= blueDoor.y + blueDoor.height) {
        window.location.pathname = "/Game/BlueRoom"
    }
    if (keys["e"] && x >= greenDoor.x && x <= greenDoor.x + greenDoor.width && y >= greenDoor.y && y <= greenDoor.y + greenDoor.height) {
        window.location.pathname = "/Game/GreenRoom"
    }
    if (keys["e"] && x >= purpleDoor.x && x <= purpleDoor.x + purpleDoor.width && y >= purpleDoor.y && y <= purpleDoor.y + purpleDoor.height) {
        window.location.pathname = "/Game/PurpleRoom"
    }
}
//Go back to hall
function backToHallDoor() {
    x = player.x + player.width / 2
    y = player.y + player.height / 2
    if (keys["e"] && x >= redDoorBack.x && x <= redDoorBack.x + redDoorBack.width && y >= redDoorBack.y && y <= redDoorBack.y + redDoorBack.height) {
        window.location.pathname = "/Game"
    }
    if (keys["e"] && x >= blueDoorBack.x && x <= blueDoorBack.x + blueDoorBack.width && y >= blueDoorBack.y && y <= blueDoorBack.y + blueDoorBack.height) {
        window.location.pathname = "/Game"
    }
    if (keys["e"] && x >= greenDoorBack.x && x <= greenDoorBack.x + greenDoorBack.width && y >= greenDoorBack.y && y <= greenDoorBack.y + greenDoorBack.height) {
        window.location.pathname = "/Game"
    }
    if (keys["e"] && x >= purpleDoorBack.x && x <= purpleDoorBack.x + purpleDoorBack.width && y >= purpleDoorBack.y && y <= purpleDoorBack.y + purpleDoorBack.height) {
        window.location.pathname = "/Game"
    }
}


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}


function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(map, 0, 0);
        ctx.drawImage(
            playerSprite,
            player.width * player.frameX,
            player.height * player.frameY,
            player.width,
            player.height,
            player.x,
            player.y,
            player.width,
            player.height
        );
        
    
        movePlayer();
        handlePlayerFrame();
        enterDoor();
        backToHallDoor();
    }
}

startAnimating(10);
