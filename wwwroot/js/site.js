// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Setup bootstrap tooltips
$(document).ready(() => {
  $('[data-toggle="tooltip"]').tooltip();
  getLowStaPlayers();
});

// URLs to request
const DEV_URL = "https://localhost:5001";
const PRO_URL = "http://13.115.36.7";

// Loading configuration
setTimeout(() => {
  document.getElementById("gameMap").style.opacity = "1";
}, 3000);
