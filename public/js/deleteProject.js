document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".delete-project");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");

      try {
        if (confirm("Are you sure to delete this project?")) {
          const response = await fetch(`/project/${id}`, {
            method: "DELETE",
          });

          console.log(response);
          if (response.ok) {
            location.reload();
          } else {
            alert("Gagal menghapus proyek");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});
