// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", () => menu.classList.remove("open"));

// Agrandir une photo au clic
const lightbox = document.getElementById("lightbox");
const big = lightbox.querySelector("img");

document.querySelectorAll(".photo-grid img").forEach((img) => {
  img.addEventListener("click", () => {
    big.src = img.src;
    big.alt = img.alt;
    lightbox.hidden = false;
  });
});
lightbox.addEventListener("click", () => (lightbox.hidden = true));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.hidden = true;
});

// Le formulaire prépare un message WhatsApp
document.getElementById("booking-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const date = new Date(data.get("date") + "T12:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let text = `Bonjour Nada, nous sommes ${data.get("names")} et nous nous marions le ${date}`;
  if (data.get("place")) text += ` (${data.get("place")})`;
  text += `.\nFormule : ${data.get("plan")}`;
  if (data.get("message")) text += `\n\n${data.get("message")}`;

  window.open("https://wa.me/33634997765?text=" + encodeURIComponent(text), "_blank");
});
