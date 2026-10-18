/* ============================================================
   Nova Studio — Landing Page Scripts
   ============================================================ */

// ---------- Header: sombra al hacer scroll ----------
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);

    // Botón "volver arriba"
    const scrollTop = document.getElementById("scrollTop");
    scrollTop.classList.toggle("visible", window.scrollY > 500);
});

// ---------- Menú móvil ----------
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navMenu.classList.remove("open");
    });
});

// ---------- Enlace activo según sección visible ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav__link[href="#${id}"]`);
        if (link) {
            link.classList.toggle("active", scrollY >= top && scrollY < top + height);
        }
    });
};
window.addEventListener("scroll", highlightNav);

// ---------- Contador animado de estadísticas ----------
const animateCounters = () => {
    document.querySelectorAll(".stat__number").forEach((counter) => {
        if (counter.dataset.done) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top > window.innerHeight) return;

        counter.dataset.done = "true";
        const target = +counter.dataset.target;
        const duration = 1600;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // easing outCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
};
window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

// ---------- Scroll reveal ----------
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("revealed"), i * 90);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);
revealElements.forEach((el) => revealObserver.observe(el));

// ---------- Botón volver arriba ----------
document.getElementById("scrollTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Formulario de contacto ----------
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        status.textContent = "⚠️ Por favor completa todos los campos.";
        status.className = "form__status error";
        return;
    }
    if (!emailRegex.test(email)) {
        status.textContent = "⚠️ Ingresa un correo electrónico válido.";
        status.className = "form__status error";
        return;
    }

    // Simulación de envío exitoso
    status.textContent = "✅ ¡Mensaje enviado! Te responderemos pronto.";
    status.className = "form__status success";
    form.reset();
});

// ---------- Efecto parallax sutil en el hero ----------
const heroVisual = document.querySelector(".hero__card");
if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
    document.querySelector(".hero").addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
}
