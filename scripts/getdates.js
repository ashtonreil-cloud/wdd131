const year = document.querySelector("#currentYear");
const today = new Date();
year.textContent = today.getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;