document.addEventListener("DOMContentLoaded", () => {
  const toggleIcon = document.querySelectorAll(".password-toggle-icon");

  toggleIcon.forEach((icon) => {
    icon.addEventListener("click", function () {
      const inputId = icon.getAttribute("data-input");
      const passwordField = document.getElementById(inputId);
      const iconElement = icon.querySelector("i");

      if (passwordField.type === "password") {
        passwordField.type = "text";
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
      } else {
        passwordField.type = "password";
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
      }
    });
  });
});
