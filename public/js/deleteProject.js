document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".delete-project");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");

      try {
        if (confirm("Are you sure to delete this project?")) {
          await fetch(`/project/${id}`, {
            method: "DELETE",
          }).then(() => location.reload());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});
