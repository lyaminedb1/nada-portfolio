const WHATSAPP_NUMBER = "33634997765";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Navigation: style au scroll + menu mobile
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav__toggle");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const closeMenu = () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", false);
  document.body.style.overflow = "";
};
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll(".nav__menu a").forEach((a) => a.addEventListener("click", closeMenu));

// Pétales qui tombent dans le hero
const petals = document.querySelector(".petals");
if (!reducedMotion) {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    const size = 8 + Math.random() * 12;
    p.style.left = `${Math.random() * 100}%`;
    p.style.width = `${size}px`;
    p.style.height = `${size * 1.25}px`;
    p.style.animationDuration = `${9 + Math.random() * 10}s`;
    p.style.animationDelay = `${-Math.random() * 18}s`;
    p.style.opacity = 0.5 + Math.random() * 0.45;
    petals.appendChild(p);
  }
}

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

// Confettis (cœurs + pétales)
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const COLORS = ["#d9a99b", "#f1dcd5", "#b89b7a", "#ffffff", "#c98c7e"];
let pieces = [];
let raf = null;

const resize = () => {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
};
window.addEventListener("resize", resize);
resize();

function drawHeart(s) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
  ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
  ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
  ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
  ctx.fill();
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter((p) => p.y < canvas.height + 40 && p.life-- > 0);
  for (const p of pieces) {
    p.vy += 0.12 * devicePixelRatio;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.heart) drawHeart(p.size);
    else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  raf = pieces.length ? requestAnimationFrame(tick) : null;
}

function celebrate(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  if (reducedMotion) return;
  const dpr = devicePixelRatio;
  for (let i = 0; i < 120; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (4 + Math.random() * 9) * dpr;
    pieces.push({
      x: x * dpr,
      y: y * dpr,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6 * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      size: (8 + Math.random() * 10) * dpr,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      heart: Math.random() < 0.45,
      life: 260,
    });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}

const centerOf = (el) => {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
};

// Quiz « Quelle formule est faite pour vous ? »
const PLANS = [
  { id: "plan-instant", name: "L’Instant", why: "L’essentiel, en beauté : la mairie et vos portraits, pour un mariage intime et plein d’émotion." },
  { id: "plan-journee", name: "La Journée", why: "La mairie et la fête, sans rien manquer : de vos « oui » jusqu’à la piste de danse." },
  { id: "plan-histoire", name: "L’Histoire", why: "Toute votre journée racontée, du premier café des préparatifs au dernier slow." },
];
const quizCard = document.getElementById("quiz-card");
const steps = [...quizCard.querySelectorAll(".quiz__step")];
const progress = quizCard.querySelector(".quiz__progress span");
let score = 0;
let step = 0;
let chosenPlan = PLANS[1];

const showStep = (i) => {
  step = i;
  steps.forEach((s, j) => s.classList.toggle("active", j === i));
  progress.style.width = `${(i / (steps.length - 1)) * 100}%`;
};

quizCard.querySelectorAll(".quiz__answers button").forEach((btn) =>
  btn.addEventListener("click", () => {
    score += Number(btn.dataset.score);
    if (step < steps.length - 2) return showStep(step + 1);
    chosenPlan = PLANS[score <= 2 ? 0 : score <= 4 ? 1 : 2];
    document.getElementById("quiz-plan").textContent = chosenPlan.name;
    document.getElementById("quiz-why").textContent = chosenPlan.why;
    showStep(steps.length - 1);
    celebrate(...centerOf(quizCard));
  })
);
document.getElementById("quiz-restart").addEventListener("click", () => {
  score = 0;
  showStep(0);
});
document.getElementById("quiz-see").addEventListener("click", () => {
  const card = document.getElementById(chosenPlan.id);
  document.querySelectorAll(".plan").forEach((p) => p.classList.remove("highlight"));
  setTimeout(() => card.classList.add("highlight"), 600);
  selectPlan(chosenPlan.name);
});

// Pré-sélection de la formule
const form = document.getElementById("booking-form");
const selectPlan = (name) => {
  const opt = [...form.plan.options].find((o) => o.text.startsWith(name));
  if (opt) form.plan.value = opt.value;
};
document.querySelectorAll("[data-plan]").forEach((btn) =>
  btn.addEventListener("click", () => {
    selectPlan(btn.dataset.plan);
    celebrate(...centerOf(btn));
  })
);

// Compte à rebours jusqu'au jour J
const countdown = document.getElementById("countdown");
const dateInput = document.getElementById("date-input");
dateInput.min = new Date().toISOString().slice(0, 10);
dateInput.addEventListener("change", () => {
  if (!dateInput.value) return (countdown.textContent = "");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((new Date(dateInput.value + "T00:00") - today) / 86400000);
  if (days < 0) countdown.textContent = "Cette date est déjà passée… on remonte le temps ? 😉";
  else if (days === 0) countdown.textContent = "C’est aujourd’hui ! Félicitations 🥂";
  else if (days < 60) countdown.textContent = `Plus que ${days} jours avant le grand jour ! On fonce 🏃‍♀️`;
  else countdown.textContent = `Jour J dans ${days} jours 💍`;
});

// Formulaire -> message WhatsApp pré-rempli
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const date = d.get("date")
    ? new Date(d.get("date") + "T00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const lines = [
    "Bonjour Nada ! 💍",
    `Nous sommes ${d.get("names")}.`,
    `Date du mariage : ${date}`,
    `Formule : ${d.get("plan")}`,
    d.get("place") && `Lieu : ${d.get("place")}`,
    d.get("message") && `\n${d.get("message")}`,
  ].filter(Boolean);
  celebrate(...centerOf(form.querySelector("button[type=submit]")));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  setTimeout(() => window.open(url, "_blank", "noopener"), reducedMotion ? 0 : 900);
});

// Pluie de cœurs au survol du macaron « Save the date »
document.querySelector(".stamp").addEventListener("mouseenter", (e) => celebrate(e.clientX, e.clientY));

// Lightbox de la galerie
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const images = [...document.querySelectorAll(".board img")];
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
  img.closest("figure").addEventListener("click", () => {
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
