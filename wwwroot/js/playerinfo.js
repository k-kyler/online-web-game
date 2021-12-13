$(document).ready(() => {
  // Open player info modal
  $("#playerInfoModalTrigger").click(() => {
    $("#playerInfoModal").modal("show");
  });
});

// Set player avatar by gender
const URLParams = new URLSearchParams(window.location.search);
const { gd } = Object.fromEntries(URLParams.entries());

if (gd === "male") {
  document.getElementById("playerInfoAvatar").setAttribute("src", "assets/gentleman_character.png")
} else {
  document.getElementById("playerInfoAvatar").setAttribute("src", "assets/ladygirl_character.png")
}
