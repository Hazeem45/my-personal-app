document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".edit-project");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");

      location.href = `/project?edit=${id}`;
    });
  });
});
