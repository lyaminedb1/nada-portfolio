const WHATSAPP_NUMBER = "33634997765";

// Navigation: style au scroll + menu mobile
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav__toggle");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll(".nav__menu a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";
  })
);

// Apparition au scroll
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Pré-sélection de la formule depuis les cartes tarifs
const form = document.getElementById("booking-form");
document.querySelectorAll("[data-plan]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const opt = [...form.plan.options].find((o) => o.text.startsWith(btn.dataset.plan));
    if (opt) form.plan.value = opt.value;
  })
);

// Formulaire -> message WhatsApp pré-rempli
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const date = d.get("date")
    ? new Date(d.get("date")).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const lines = [
    "Bonjour Nada !",
    `Nous sommes ${d.get("names")}.`,
    `Date du mariage : ${date}`,
    `Formule : ${d.get("plan")}`,
    d.get("place") && `Lieu : ${d.get("place")}`,
    d.get("message") && `\n${d.get("message")}`,
  ].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
});

// Lightbox de la galerie
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const images = [...document.querySelectorAll(".grid img")];
let current = 0;

const show = (i) => {
  current = (i + images.length) % images.length;
  lbImg.src = images[current].src;
  lbImg.alt = images[current].alt;
};
const close = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", true);
};

images.forEach((img, i) =>
  img.addEventListener("click", () => {
    show(i);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", false);
  })
);
lightbox.querySelector(".lightbox__close").addEventListener("click", close);
lightbox.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
lightbox.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
lightbox.addEventListener("click", (e) => e.target === lightbox && close());
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

document.getElementById("year").textContent = new Date().getFullYear();
