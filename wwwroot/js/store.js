$(document).ready(() => {
  // Open stamina store modal
  $("#storeTrigger").click(() => {
    $("#storeModal").modal("show");
  });

  // Press B to stamina store modal
  $(document).keydown((event) => {
    if (event.key === "b") {
      if ($("#storeModal").modal("hide")) {
        $("#storeModal").modal("show");
      } else if ($("#storeModal").modal("show")) {
        $("#storeModal").modal("hide");
      }
    }
  });
});
