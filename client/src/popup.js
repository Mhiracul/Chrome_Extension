document.addEventListener("DOMContentLoaded", () => {
  const startRecordingButton = document.querySelector("button#startRecording");
  const stopRecordingButton = document.querySelector("button#stopRecording");
  const toggleCamera = document.getElementById("toggleCamera");
  const toggleAudio = document.getElementById("toggleAudio");

  let isCameraOn = false;
  let isAudioOn = false;

  const closePopupButton = document.getElementById("closePopup");

  closePopupButton.addEventListener("click", function () {
    const popup = document.querySelector(".rounded-md.rounde");
    popup.style.display = "none";
  });

  toggleCamera.addEventListener("change", () => {
    isCameraOn = toggleCamera.checked;
  });

  toggleAudio.addEventListener("change", () => {
    isAudioOn = toggleAudio.checked;
  });
  startRecordingButton.addEventListener("click", () => {
    if (!isCameraOn || !isAudioOn) {
      alert("Please enable both audio and camera to start recording.");
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "request_recording" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, "error line 14");
          }
        }
      );
    });
  });

  stopRecordingButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "stopvideo" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
            chrome.tabs.update(tabs[0].id, {
              url: "https://example.com/page-ready",
            });
          } else {
            console.log(chrome.runtime.lastError, "error line 27");
          }
        }
      );
    });
  });
});
