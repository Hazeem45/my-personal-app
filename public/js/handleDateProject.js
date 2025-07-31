document.addEventListener("DOMContentLoaded", () => {
  const startDate = document.getElementById("start-date");
  const endDate = document.getElementById("end-date");

  const today = new Date().toISOString().split("T")[0];

  startDate.max = today;
  endDate.max = today;

  startDate.addEventListener("change", function () {
    endDate.min = this.value;

    if (endDate.value && endDate.value < this.value) {
      endDate.value = "";
    }
  });
});
