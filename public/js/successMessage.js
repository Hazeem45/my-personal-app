document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("success-message");

  if (msg) {
    setTimeout(() => {
      msg.style.display = "none";
    }, 3000);
  }
});
