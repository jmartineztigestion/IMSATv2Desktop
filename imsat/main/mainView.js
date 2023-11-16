document.addEventListener("DOMContentLoaded", function () {
  window.bridge.updateMessage(updateMessage);
});

function updateMessage(event, message) {
  window.ipcRender.send('message:loginSuccessful');
  console.log("message logged in view");
  let elemE = document.getElementById("message");
  elemE.innerHTML = message;
}
