// Change 'index' from [0-4]
// Then:
//      /Game
//      /Game/BlueRoom
//      /Game/GreenRoom
//      /Game/RedRooms
//      /Game/PurpleRoom
// To choose the exact map that appears in each room

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

// Define canvas
var mapName = [
  "hall_map",
  "blue_room",
  "green_room",
  "red_room",
  "purple_room",
];
var canvas = document.getElementById(mapName[index]);
var ctx = canvas.getContext("2d");

canvas.height = 478;
canvas.width = 928;

// Default positions of player in each room
var keys = [];
var player;

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
  };
} else if (index == 1) {
  player = {
    x: 865,
    y: 59,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false,
  };
} else if (index == 2) {
  player = {
    x: 30,
    y: 417,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false,
  };
} else if (index == 3) {
  player = {
    x: 865,
    y: 417,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false,
  };
} else if (index == 4) {
  player = {
    x: 30,
    y: 30,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false,
  };
}

// Get character gender from URL
var params = new URLSearchParams(window.location.search);

let playerSpriteURL;

if (params.get("gd") == "male") {
  playerSpriteURL = "../assets/indianajones.png";
} else {
  playerSpriteURL = "../assets/marionravenwood.png";
}

// Configure player movements (using W-A-S-D keys or arrow keys)
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  player.moving = true;
});

window.addEventListener("keyup", (e) => {
  delete keys[e.key];
  player.moving = false;
});

function movePlayer(player) {
  if ((keys["ArrowLeft"] || keys["a"]) && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
    fetch(`${DEV_URL}/multiplayer/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        username: document.getElementById("playerInfoUsername").textContent,
      }),
    });
  }
  if (
    (keys["ArrowRight"] || keys["d"]) &&
    player.x < canvas.width - player.width
  ) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
    fetch(`${DEV_URL}/multiplayer/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        username: document.getElementById("playerInfoUsername").textContent,
      }),
    });
  }
  if ((keys["ArrowUp"] || keys["w"]) && player.y > 0) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
    fetch(`${DEV_URL}/multiplayer/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        username: document.getElementById("playerInfoUsername").textContent,
      }),
    });
  }
  if (
    (keys["ArrowDown"] || keys["s"]) &&
    player.y < canvas.height - player.height
  ) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
    fetch(`${DEV_URL}/multiplayer/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        username: document.getElementById("playerInfoUsername").textContent,
      }),
    });
  }
}

function handlePlayerFrame(player) {
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
    fetch(`${DEV_URL}/multiplayer/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        username: document.getElementById("playerInfoUsername").textContent,
      }),
    });
  } else {
    player.frameX = 0;
    fetch(`${DEV_URL}/multiplayer/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        username: document.getElementById("playerInfoUsername").textContent,
      }),
    });
  }
}

// Red door enter and get back locations
var redDoor = {
  x: 96,
  y: 96,
  width: 32,
  height: 32,
};
var redDoorBack = {
  x: 900,
  y: 415,
  width: 59,
  height: 63,
};

// Blue door enter and get back locations
var blueDoor = {
  x: 96,
  y: 351,
  width: 32,
  height: 32,
};
var blueDoorBack = {
  x: 896,
  y: 1,
  width: 63,
  height: 32,
};

// Green door enter and get back locations
var greenDoor = {
  x: 799,
  y: 96,
  width: 32,
  height: 32,
};
var greenDoorBack = {
  x: 1,
  y: 400,
  width: 64,
  height: 78,
};

// Purple door enter and get back locations
var purpleDoor = {
  x: 799,
  y: 351,
  width: 32,
  height: 32,
};
var purpleDoorBack = {
  x: 1,
  y: 1,
  width: 64,
  height: 32,
};

function enterDoor(player) {
  let x, y;

  x = player.x + player.width / 2;
  y = player.y + player.height / 2;
  if (
    keys["e"] &&
    x >= redDoor.x &&
    x <= redDoor.x + redDoor.width &&
    y >= redDoor.y &&
    y <= redDoor.y + redDoor.height
  ) {
    window.location.pathname = "/Game/RedRoom";
  }
  if (
    keys["e"] &&
    x >= blueDoor.x &&
    x <= blueDoor.x + blueDoor.width &&
    y >= blueDoor.y &&
    y <= blueDoor.y + blueDoor.height
  ) {
    window.location.pathname = "/Game/BlueRoom";
  }
  if (
    keys["e"] &&
    x >= greenDoor.x &&
    x <= greenDoor.x + greenDoor.width &&
    y >= greenDoor.y &&
    y <= greenDoor.y + greenDoor.height
  ) {
    window.location.pathname = "/Game/GreenRoom";
  }
  if (
    keys["e"] &&
    x >= purpleDoor.x &&
    x <= purpleDoor.x + purpleDoor.width &&
    y >= purpleDoor.y &&
    y <= purpleDoor.y + purpleDoor.height
  ) {
    window.location.pathname = "/Game/PurpleRoom";
  }
}

function backToHallDoor(player) {
  let x, y;

  x = player.x + player.width / 2;
  y = player.y + player.height / 2;
  if (
    keys["e"] &&
    x >= redDoorBack.x &&
    x <= redDoorBack.x + redDoorBack.width &&
    y >= redDoorBack.y &&
    y <= redDoorBack.y + redDoorBack.height
  ) {
    window.location.pathname = "/Game";
  }
  if (
    keys["e"] &&
    x >= blueDoorBack.x &&
    x <= blueDoorBack.x + blueDoorBack.width &&
    y >= blueDoorBack.y &&
    y <= blueDoorBack.y + blueDoorBack.height
  ) {
    window.location.pathname = "/Game";
  }
  if (
    keys["e"] &&
    x >= greenDoorBack.x &&
    x <= greenDoorBack.x + greenDoorBack.width &&
    y >= greenDoorBack.y &&
    y <= greenDoorBack.y + greenDoorBack.height
  ) {
    window.location.pathname = "/Game";
  }
  if (
    keys["e"] &&
    x >= purpleDoorBack.x &&
    x <= purpleDoorBack.x + purpleDoorBack.width &&
    y >= purpleDoorBack.y &&
    y <= purpleDoorBack.y + purpleDoorBack.height
  ) {
    window.location.pathname = "/Game";
  }
}

// Players list to store all players drawing data
let players = [];

// Get all active players
const getActivePlayers = async () => {
  const response = await fetch(`${DEV_URL}/multiplayer`);
  const { activePlayers } = await response.json();

  players.push(...activePlayers);
};

getActivePlayers();

// Animating to draw all players
let fpsInterval, startTime, now, then, elapsed;

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

    // Filter to get players for specific map
    const filteredPlayers = players.filter(
      (player) => player.mapIndex === index
    );

    // Draw map
    var map = new Image();

    map.src = "../assets/" + mapName[filteredPlayers[0].mapIndex] + ".png";
    ctx.drawImage(map, 0, 0);

    // Draw players
    for (let player of filteredPlayers) {
      // Draw player image
      let newPlayerSprite = new Image();

      newPlayerSprite.src = player.playerSpriteURL;
      ctx.drawImage(
        newPlayerSprite,
        player.player.width * player.player.frameX,
        player.player.height * player.player.frameY,
        player.player.width,
        player.player.height,
        player.player.x,
        player.player.y,
        player.player.width,
        player.player.height
      );

      // Draw player username
      ctx.font = "500 14px Poppins";
      ctx.textAlign = "center";

      if (
        player.username ===
        document.getElementById("playerInfoUsername").textContent
      ) {
        ctx.fillStyle = "red";
        ctx.fillText(
          player.username,
          player.player.x + 15,
          player.player.y - 5
        );
      } else {
        ctx.fillStyle = "white";
        ctx.fillText(
          player.username,
          player.player.x + 15,
          player.player.y - 5
        );
      }

      // Configure for controlling current player
      if (
        player.username ===
        document.getElementById("playerInfoUsername").textContent
      ) {
        movePlayer(player.player);
        handlePlayerFrame(player.player);
        enterDoor(player.player);
        backToHallDoor(player.player);
      }
    }
  }
}

startAnimating(10);

// Configure SignalR connection for multiplayer
const signalRMultiplayerConnection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/multiplayer")
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Start multiplayer connection
async function multiplayerStart() {
  try {
    await signalRMultiplayerConnection.start();

    // Send request to join in game server
    await fetch(`${DEV_URL}/multiplayer/active`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        player,
        playerSpriteURL,
        mapIndex: index,
        level: Number.parseInt(
          document.getElementById("playerLevel").textContent
        ),
      }),
    });
  } catch (error) {
    console.error(error);
    setTimeout(start, 3000);
  }
}

multiplayerStart();

// Catch if player is disconnected then remove player out of the game
window.addEventListener("beforeunload", async (event) => {
  await fetch(`${DEV_URL}/multiplayer/inactive`);
});

// Event listener to add new player to the game
signalRMultiplayerConnection.on("AddPlayer", (player) => {
  players.push(player);
});

// Event listener to remove player from the game when disconnected
signalRMultiplayerConnection.on("RemovePlayer", (username) => {
  players = players.filter((player) => player.username !== username);
});

// Event listener to update positions of players
signalRMultiplayerConnection.on("UpdatePositions", (updatedPlayers) => {
  players = updatedPlayers;
});

// Player info modal setup, view high scores, search & retrieve other active players data
$(document).ready(() => {
  // Function to render active players on list
  function renderActivePlayers(activePlayers) {
    // Add all active players to the current player info modal
    $("#activePlayersList").html("");

    for (let activePlayer of activePlayers) {
      $("#activePlayersList").append(`
        <li class="d-flex align-items-center justify-content-between mb-3 pr-2">
          <div class="d-flex align-items-center">
            <div class="playerinfo-avatar position-relative">
              <img class="rounded-circle" width="57" height="57" src="${
                activePlayer.playerSpriteURL.includes("indianajones")
                  ? `${DEV_URL}/assets/gentleman_character.png`
                  : `${DEV_URL}/assets/ladygirl_character.png`
              }" />
              <div class="playerinfo-level rounded-circle">
                  <span>${activePlayer.level}</span>
              </div>
            </div>

            <p class="mb-0 ml-2">${activePlayer.username}</p>
          </div>

          <span style="font-size: 1.5rem; color: greenyellow;">
            <i class="fas fa-toggle-on"></i>
          </span>
        </li>
      `);
    }
  }

  // Open player info modal
  $("#playerInfoModalTrigger").click(() => {
    $("#playerInfoModal").modal("show");
    renderActivePlayers(players);
  });

  // Press I to open player info modal
  $(document).keydown((event) => {
    if (event.key === "i") {
      if ($("#playerInfoModal").modal("hide")) {
        $("#playerInfoModal").modal("show");
        renderActivePlayers(players);
      } else if ($("#playerInfoModal").modal("show")) {
        $("#playerInfoModal").modal("hide");
      }
    }
  });

  // Search for active players in list
  $("#searchPlayerInput").change((event) => {
    const searchInput = event.target.value;

    if (searchInput) {
      const results = players.filter((player) =>
        player.username.includes(searchInput)
      );

      if (results.length) {
        renderActivePlayers(results);
      } else {
        $("#activePlayersList").html("");
        $("#activePlayersList").append(`
          <li class="d-flex align-items-center justify-content-center pr-2">
            <span>No players found</span>
          </li>
        `);
      }
    } else {
      renderActivePlayers(players);
    }
  });
});
