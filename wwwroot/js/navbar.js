$(document).ready(() => {
  // Configure styles for nav item active
  let navItemActive = sessionStorage.getItem("nav-item-active");

  if (navItemActive) {
    $(`#navbarNav .nav-item:nth-child(${navItemActive})`).addClass("active");
  } else {
    $(`#navbarNav .nav-item:nth-child(1)`).addClass("active");
  }

  $(".navbar-brand").click(() => {
    sessionStorage.setItem("nav-item-active", 1);
  });

  $("#navbarNav .nav-item:nth-child(1)").click(() => {
    sessionStorage.setItem("nav-item-active", 1);
  });

  $("#navbarNav .nav-item:nth-child(2)").click(() => {
    sessionStorage.setItem("nav-item-active", 2);
  });

  $("#navbarNav .nav-item:nth-child(3)").click(() => {
    sessionStorage.setItem("nav-item-active", 3);
  });
});

// Set active nav item when sign up success
const path = window.location.pathname;

if (path === "/signin") {
  sessionStorage.setItem("nav-item-active", 2);
}
