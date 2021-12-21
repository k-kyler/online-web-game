$(document).ready(() => {
  // Force setting modal to hide when open exit game modal
  $("#exitGameConfirm").click(() => {
    $("#myModal1").modal("hide");
    $(".modal-backdrop").css("display", "none");
  });

  // Press to open Settings modal
  $(document).keydown((e) => {
    if (e.keyCode == 27) {
      if ($("#myModal1").modal("hide")) {
        $("#myModal1").modal("show");
        $("#myModal2").modal("hide");
        $(".modal-backdrop").css("display", "none");
      } else if ($("#myModal1").modal("show")) {
        $("#myModal1").modal("hide");
        $(".modal-backdrop").css("display", "none");
      }
    }
  });

  // Sign out
  $("#signOutButton").click(async () => {
    const response = await fetch(`${DEV_URL}/signout`, {
      method: "POST",
    });
    const { code } = await response.json();

    if (code === "success") window.location.href = "/";
  });

  // Press M to get back to menu page
  window.addEventListener("keydown", (event) => {
    if (event.key === "m") {
      window.location.href = "/menu";
    }
  });
});
