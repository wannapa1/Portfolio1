
/* =====================================
   NUENG PORTFOLIO
   STABLE VERSION - NO AUTO ANIMATION
===================================== */


/* 01. TYPING EFFECT - STOP */

const typingElement = document.getElementById("typing");

if (typingElement) {
    typingElement.textContent = "Programming.";
}


/* 02. SCROLL PROGRESS */

const progress = document.getElementById("progress");

function updateProgress() {
    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage = maxScroll > 0
        ? (window.scrollY / maxScroll) * 100
        : 0;

    if (progress) {
        progress.style.width = percentage + "%";
    }
}

window.addEventListener("scroll", updateProgress);
updateProgress();


/* 03. MOBILE MENU */

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
}


/* 04. DARK / LIGHT MODE */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        themeBtn.textContent = isLight ? "☀" : "☾";

    });
}


/* 05. REVEAL - SHOW IMMEDIATELY */

document.querySelectorAll(".reveal").forEach(element => {
    element.classList.add("show");
});


/* 06. CERTIFICATE GALLERY */

const certificateGrid =
    document.getElementById("certificateGrid");

const certificates = [
    { image: "assets/certificate1.jpg", title: "Certificate 01" },
    { image: "assets/certificate2.jpg", title: "Certificate 02" },
    { image: "assets/certificate3.jpg", title: "Certificate 03" },
    { image: "assets/certificate4.jpg", title: "Certificate 04" },
    { image: "assets/certificate5.jpg", title: "Certificate 05" },
    { image: "assets/certificate6.jpg", title: "Certificate 06" }
];

if (certificateGrid) {

    certificates.forEach(certificate => {

        const img = document.createElement("img");

        img.src = certificate.image;
        img.alt = certificate.title;
        img.loading = "lazy";

        img.addEventListener("click", () => {
            openLightbox(certificate.image, certificate.title);
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
    closeLightbox.addEventListener("click", closeLightboxView);
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

    topBtn.classList.toggle("show", window.scrollY > 450);

});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    });
}


/* 09. ACTIVE NAVIGATION */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

const activeObserver = new IntersectionObserver(entries => {

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

});

sections.forEach(section => {
    activeObserver.observe(section);
});


/* 10. CONSOLE */

console.log("NUENG PORTFOLIO - STABLE VERSION");
console.log("Designed by Wannapa Intarat");
