$(document).ready(() => {
  // Open settings modal in hall
  $("#settingsButton").click(() => {
    $("#myModal1").modal("show");
  });

  // Volume and brightness features
  let audioSource = document.getElementById("audioSource");
  let volumeBar = document.getElementById("volumeBar");

  audioSource.volume = 0.5;

  if (!localStorage.getItem("audioVolume")) {
    localStorage.setItem("audioVolume", audioSource.volume);
  }
  // else {
  audioSource.volume = localStorage.getItem("audioVolume");
  volumeBar.value = audioSource.volume * 100;
  // }

  $("#volumeBar").change((event) => {
    audioSource.volume = event.target.value / 100;
    localStorage.setItem("audioVolume", audioSource.volume);
  });

  // Brightness feature
  let brightnessBar = document.getElementById("brightnessBar");
  let brightnessValue = 1;

  if (!localStorage.getItem("brightness")) {
    localStorage.setItem("brightness", brightnessValue);
  } else {
    brightnessValue = localStorage.getItem("brightness");
    document.documentElement.style.filter =
      "brightness(" + brightnessValue + ")";
    brightnessBar.value = brightnessValue * 100;
  }

  $("#brightnessBar").change((event) => {
    document.documentElement.style.filter =
      "brightness(" + event.target.value / 100 + ")";
    localStorage.setItem("brightness", event.target.value / 100);
  });
});
