"use strict";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const safe = (fn) => { try { return fn(); } catch { return null; } };

/* ---------- Idiomas (ES = texto original del HTML, EN = este diccionario) ---------- */
const EN = {
  "nav.about": "About", "nav.work": "Projects", "nav.stack": "Stack", "nav.path": "Education", "nav.contact": "Contact",
  "hero.tag": "Open to new opportunities",
  "hero.h1a": "I build the", "hero.h1b": "that powers",
  "hero.lead": "I'm <strong>Juan David Arias Patiño</strong>, a junior backend developer from Bucaramanga, Colombia. I build secure REST APIs with Java and Spring Boot and design MySQL databases. <em>Build. Learn. Grow.</em>",
  "hero.cta1": "View projects", "hero.cta2": "Let's talk",
  "stat.1": "published<br>projects", "stat.2": "Fortinet<br>certification", "stat.3": "languages<br>(ES · EN B1)",
  "about.title": "What's behind the code",
  "about.p1": "Junior backend developer with experience in Java, Spring Boot and MySQL. I build REST APIs with JWT authentication, role-based access control and layered architecture, and I design databases with functions, triggers and views.",
  "about.p2": "Fortinet certified, I apply security-by-design principles. I'm known for continuous learning, teamwork and a strong commitment to code quality.",
  "c1.t": "REST APIs", "c1.p": "Spring Boot, JWT and roles with Spring Security, DTOs, validation and Swagger/OpenAPI documentation.",
  "c2.t": "Databases", "c2.p": "Entity-relationship modeling, MySQL, functions, triggers, views and persistence with JPA/Hibernate and JDBC.",
  "c3.t": "Security", "c3.p": "Fortinet certification: strong authentication, traffic encryption and request validation from the design stage.",
  "about.quote": "Continuous learning, teamwork and a commitment to code quality.",
  "p1.d": "REST API built with Spring Boot to manage a network of coworking spaces: locations, rooms, equipment, plans, members, bookings and extra services. JWT authentication with role-based access control, availability validation, monthly-hours calculation per plan, layered architecture, DTOs, global exception handling and Swagger/OpenAPI docs.",
  "p2.d": "Java console application to manage a lending institution: employees, clients, loans and payments. Loan simulation, installments, balances, payment history, delinquent-client detection and file export. Layered design (models, DAOs, views, utilities), parameterized queries, Streams and LocalDate.",
  "p3.d": "MySQL database to digitize venue rentals for an events company: venues, clients, managers, bookings and payments. Starts from the entity-relationship model; includes functions (cost with 19% VAT and availability), status and price-audit triggers, report views and test scripts.",
  "p4.d": "Hotel booking web app in vanilla JavaScript with Web Components. Registration and login with client and admin roles, search by dates and guests, availability validation, automatic nights and total cost, and an admin panel for rooms, prices and bookings.",
  "p5.d": "Layout of a university e-commerce site with semantic HTML5 and CSS3 (Mobile First): catalog, product page, cart, checkout, profile and purchase history. Modular CSS (base, components, layout and responsive) and reusable components.",
  "link.code": "View code",
  "f.all": "All", "f.data": "Data", "f.tools": "Tools",
  "s.java": "OOP, Streams, Collections", "s.spring": "REST APIs and services", "s.sec": "Authentication and roles",
  "s.jpa": "Data persistence", "s.maven": "Dependency management", "s.swagger": "Endpoint documentation",
  "s.mysql": "Functions, triggers, views", "s.wb": "Entity-relationship modeling",
  "s.html": "Semantic and Mobile First", "s.git": "Version control", "s.linux": "Work environment",
  "t1.time": "January 2026 — January 2027", "t1.t": "Technical Degree in Backend Software Development",
  "t1.p": "Campuslands, Floridablanca. Java, Spring Boot, databases and web development through hands-on projects.",
  "t2.time": "Certification", "t2.p": "Cybersecurity fundamentals to bring security into API development from the design stage.",
  "t3.t": "High School Diploma — Technical Track in Commerce", "t3.p": "Instituto Integrado Francisco Serrano Muñoz, Girón, Santander.",
  "ct.tag": "Have a job opening or an idea?", "ct.h": "Let's build something", "ct.h2": "solid",
  "ct.send": "Send email", "ct.loc": "Bucaramanga, Colombia",
  "ft.made": "Made with HTML, CSS and JavaScript", "ft.up": "Back to top ↑",
  "copied": "Copied!", "copy": "Copy: ",
  "title": "Juan David Arias Patiño — Backend Developer",
  "desc": "Portfolio of Juan David Arias Patiño, junior backend developer: REST APIs with Java and Spring Boot, MySQL databases and security by design."
};
const PHRASES = {
  es: ["tus ideas.", "tus APIs.", "tus datos.", "tu negocio."],
  en: ["your ideas.", "your APIs.", "your data.", "your business."]
};
const ES_TITLE = document.title;
const ES_DESC = $('meta[name="description"]').content;
$$("[data-i18n]").forEach((el) => (el.dataset.es = el.innerHTML));

let lang = "es";
let phrases = PHRASES.es;
const t = (k) => (lang === "en" ? EN[k] : null);

function setLang(l) {
  lang = l;
  phrases = PHRASES[l];
  document.documentElement.lang = l;
  $$("[data-i18n]").forEach((el) => {
    el.innerHTML = l === "en" && EN[el.dataset.i18n] ? EN[el.dataset.i18n] : el.dataset.es;
  });
  document.title = l === "en" ? EN.title : ES_TITLE;
  $('meta[name="description"]').content = l === "en" ? EN.desc : ES_DESC;
  $$("#langToggle span").forEach((s) => s.classList.toggle("on", s.dataset.l === l));
  safe(() => localStorage.setItem("lang", l));
  restartTyping();
}

/* ---------- Tema ---------- */
const root = document.documentElement;
const savedTheme = safe(() => localStorage.getItem("theme"));
if (savedTheme) root.dataset.theme = savedTheme;
$("#themeToggle").addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  safe(() => localStorage.setItem("theme", next));
});

/* ---------- Menú móvil ---------- */
const links = $("#navLinks");
$("#burger").addEventListener("click", () => links.classList.toggle("open"));
$$("a", links).forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

/* ---------- Barra de progreso + nav ---------- */
const bar = $("#progress");
const nav = $("#nav");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  nav.classList.toggle("scrolled", scrollY > 20);
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Enlace activo según sección ---------- */
const navAnchors = $$("a", links);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach((s) => sectionObserver.observe(s));

/* ---------- Reveal + contadores ---------- */
const countUp = (el) => {
  const target = +el.dataset.count, suffix = el.dataset.suffix || "";
  const start = performance.now(), dur = 1400;
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$("[data-count]", e.target).forEach(countUp);
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 70 + "ms";
  revealObserver.observe(el);
});

/* ---------- Texto que se escribe ---------- */
const typed = $("#typed");
let pi = 0, ci = 0, deleting = false, typeTimer;
function type() {
  const word = phrases[pi % phrases.length];
  typed.textContent = word.slice(0, ci);
  let delay = deleting ? 45 : 90;
  if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  else ci += deleting ? -1 : 1;
  typeTimer = setTimeout(type, delay);
}
function restartTyping() { clearTimeout(typeTimer); pi = 0; ci = 0; deleting = false; type(); }

/* ---------- Tilt 3D de la foto ---------- */
const photo = $("#tilt");
if (matchMedia("(hover: hover)").matches) {
  photo.addEventListener("mousemove", (e) => {
    const r = photo.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    photo.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 10}deg)`;
    photo.style.setProperty("--mx", x * 100 + "%");
    photo.style.setProperty("--my", y * 100 + "%");
  });
  photo.addEventListener("mouseleave", () => (photo.style.transform = ""));
}

/* ---------- Filtros del stack ---------- */
$$(".chip").forEach((chip) => chip.addEventListener("click", () => {
  $$(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  const f = chip.dataset.filter;
  $$(".skill").forEach((s) => s.classList.toggle("hide", f !== "all" && s.dataset.cat !== f));
}));

/* ---------- Proyectos: tocar para desplegar en móvil ---------- */
$$(".project__row").forEach((row) => row.addEventListener("click", (e) => {
  if (matchMedia("(hover: none)").matches) {
    const li = row.parentElement;
    if (!li.classList.contains("open")) { e.preventDefault(); li.classList.add("open"); }
  }
}));

/* ---------- Copiar correo ---------- */
const copyBtn = $("#copyMail"), copyLabel = $("#copyLabel");
copyBtn.addEventListener("click", async () => {
  const mail = copyBtn.dataset.mail;
  const fallback = lang === "en" ? EN.copy : "Copia: ";
  try { await navigator.clipboard.writeText(mail); copyLabel.textContent = lang === "en" ? EN.copied : "¡Copiado!"; }
  catch { copyLabel.textContent = fallback + mail; }
  setTimeout(() => (copyLabel.textContent = mail), 1800);
});

/* ---------- Botón de idioma ---------- */
$("#langToggle").addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));
const savedLang = safe(() => localStorage.getItem("lang"));
setLang(savedLang === "en" ? "en" : "es");

$("#year").textContent = new Date().getFullYear();
