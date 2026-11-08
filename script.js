
/* =========================================
   NUENG PORTFOLIO
   SLOW & SMOOTH COMPLETE JAVASCRIPT
========================================= */


/* 01. TYPING EFFECT */

const typingElement = document.getElementById("typing");

const words = [
    "Programming.",
    "Computer Science.",
    "Web Development.",
    "Artificial Intelligence.",
    "Technology."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 2200);
            return;
        }
    } else {
        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 100 : 160);
}

typeEffect();


/* 02. SCROLL PROGRESS */

const progress = document.getElementById("progress");

function updateProgress() {
    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage = docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;

    if (progress) {
        progress.style.width = percentage + "%";
    }
}

window.addEventListener("scroll", updateProgress);
updateProgress();


/* 03. MOBILE NAVIGATION */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");

        menuBtn.textContent =
            nav.classList.contains("active") ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuBtn.textContent = "☰";
        });
    });

    document.addEventListener("click", event => {
        if (
            !nav.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            nav.classList.remove("active");
            menuBtn.textContent = "☰";
        }
    });
}


/* 04. DARK / LIGHT MODE */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        themeBtn.textContent = isLight ? "☀" : "☾";

        themeBtn.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    });
}


/* 05. SLOW SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.10
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* 06. CERTIFICATE GALLERY */

const certificateGrid =
    document.getElementById("certificateGrid");

const certificates = [
    {
        image: "assets/certificate1.jpg",
        title: "Certificate 01"
    },
    {
        image: "assets/certificate2.jpg",
        title: "Certificate 02"
    },
    {
        image: "assets/certificate3.jpg",
        title: "Certificate 03"
    },
    {
        image: "assets/certificate4.jpg",
        title: "Certificate 04"
    },
    {
        image: "assets/certificate5.jpg",
        title: "Certificate 05"
    },
    {
        image: "assets/certificate6.jpg",
        title: "Certificate 06"
    }
];

if (certificateGrid) {

    certificates.forEach(certificate => {

        const img = document.createElement("img");

        img.src = certificate.image;
        img.alt = certificate.title;
        img.loading = "lazy";

        img.addEventListener("click", () => {
            openLightbox(
                certificate.image,
                certificate.title
            );
        });

        img.addEventListener("error", () => {
            img.style.display = "none";
        });

        certificateGrid.appendChild(img);
    });
}


/* 07. LIGHTBOX */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

function openLightbox(image, title) {

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image;

    if (lightboxCaption) {
        lightboxCaption.textContent = title;
    }

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightboxView() {

    if (!lightbox) return;

    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

if (closeLightbox) {
    closeLightbox.addEventListener(
        "click",
        closeLightboxView
    );
}

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightboxView();
        }
    });
}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeLightboxView();
    }
});


/* 08. BACK TO TOP */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 450) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* 09. ACTIVE NAVIGATION */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".navbar nav a");

const activeObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active-link");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {
                        link.classList.add("active-link");
                    }
                });
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => {
    activeObserver.observe(section);
});


/* 10. IMAGE LOADING */

document.querySelectorAll("img").forEach(img => {

    if (img.complete) {
        img.classList.add("loaded");
    } else {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });
    }
});


/* 11. CONSOLE MESSAGE */

console.log(
    "%c NUENG PORTFOLIO ",
    "background:#8064c8;color:white;font-size:20px;padding:10px;"
);

console.log(
    "Designed & Developed by Wannapa Intarat"
);

console.log("Welcome to my portfolio!");
