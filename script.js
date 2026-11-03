
/* =================================
   NUENG PORTFOLIO
   JAVASCRIPT
================================= */

// 1. TYPING ANIMATION

const typingElement = document.getElementById("typing");

const words = [
    "Programming.",
    "Computer Science.",
    "Artificial Intelligence.",
    "Web Development.",
    "Technology."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
    const word = words[wordIndex];

    typingElement.textContent = word.substring(0, charIndex);

    if (!deleting) {
        charIndex++;

        if (charIndex > word.length) {
            deleting = true;
            setTimeout(typingEffect, 1200);
            return;
        }
    } else {
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typingEffect, deleting ? 45 : 100);
}

typingEffect();


// 2. MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
    });
});


// 3. DARK / LIGHT MODE

const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeBtn.textContent = theme === "dark" ? "☀" : "☾";
    localStorage.setItem("nueng-theme", theme);
}

const savedTheme = localStorage.getItem("nueng-theme");

if (savedTheme) {
    setTheme(savedTheme);
}

themeBtn.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";

    setTheme(newTheme);
});


// 4. SCROLL PROGRESS BAR

const progress = document.getElementById("progress");

function updateProgress() {
    const scrollTop = window.scrollY;
    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const percentage = pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    progress.style.width = percentage + "%";
}

window.addEventListener("scroll", updateProgress);


// 5. SCROLL REVEAL

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});


// 6. BACK TO TOP

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 500);
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 7. ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#nav a");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// 8. CERTIFICATE GALLERY

// นำรูปเกียรติบัตรจริงมาใส่ใน
// assets/certificates/
// แล้วตั้งชื่อตามรายการนี้

const certificates = [
    {
        title: "Thailand Cyber Top Talent 2026",
        image: "cert-01.jpg"
    },
    {
        title: "เหรียญเงิน แข่งขันเขียนโปรแกรม ครั้งที่ 73",
        image: "cert-02.jpg"
    },
    {
        title: "รองชนะเลิศอันดับ 2 แข่งขันเขียนโปรแกรม ครั้งที่ 72",
        image: "cert-03.jpg"
    },
    {
        title: "Thailand Cyber Top Talent 2025",
        image: "cert-04.jpg"
    },
    {
        title: "เหรียญเงิน แข่งขันหุ่นยนต์ระดับสูง ครั้งที่ 73",
        image: "cert-05.jpg"
    },
    {
        title: "รองชนะเลิศอันดับ 2 ตอบปัญหาวิทยาศาสตร์",
        image: "cert-06.jpg"
    },
    {
        title: "Cybersecurity Professional Course - NCSA",
        image: "cert-07.jpg"
    },
    {
        title: "Learn Coding Basics - CHULA MOOC",
        image: "cert-08.jpg"
    },
    {
        title: "Introduction to Data Analytics, AI and ML",
        image: "cert-09.jpg"
    },
    {
        title: "I CS YOU CAMP 2026",
        image: "cert-10.jpg"
    },
    {
        title: "CESCA ครั้งที่ 21",
        image: "cert-11.jpg"
    },
    {
        title: "ค่ายพัฒนาทักษะหุ่นยนต์",
        image: "cert-12.jpg"
    },
    {
        title: "THR RoV E-Sport",
        image: "cert-13.jpg"
    },
    {
        title: "ขนาบน้ำ จามจุรี จุฬา–กระบี่ ครั้งที่ 3",
        image: "cert-14.jpg"
    },
    {
        title: "ตอบปัญหาวันสถาปนาโรงเรียน",
        image: "cert-15.jpg"
    },
    {
        title: "โครงการพี่สอนน้อง ครั้งที่ 3",
        image: "cert-16.jpg"
    },
    {
        title: "โครงการธรรมะสานใจห่างไกลยาเสพติด",
        image: "cert-17.jpg"
    },
    {
        title: "โครงการคลินิกเกษตรเคลื่อนที่",
        image: "cert-18.jpg"
    }
];

const certificateGrid =
    document.getElementById("certificateGrid");

certificates.forEach((certificate, index) => {

    const card = document.createElement("div");
    card.className = "certificate-card reveal";

    const image = document.createElement("img");
    image.src = "assets/certificates/" + certificate.image;
    image.alt = certificate.title;
    image.loading = "lazy";

    image.onerror = () => {
        image.remove();

        const placeholder = document.createElement("div");
        placeholder.style.cssText = `
            height:190px;
            background:var(--surface2);
            display:grid;
            place-items:center;
            color:var(--purple);
            font-size:35px;
        `;
        placeholder.textContent = "✧";
        card.prepend(placeholder);
    };

    const caption = document.createElement("p");
    caption.textContent =
        String(index + 1).padStart(2, "0") +
        " / " + certificate.title;

    card.appendChild(image);
    card.appendChild(caption);

    card.addEventListener("click", () => {
        openCertificate(
            "assets/certificates/" + certificate.image,
            certificate.title
        );
    });

    certificateGrid.appendChild(card);
    revealObserver.observe(card);
});


// 9. CERTIFICATE LIGHTBOX

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

function openCertificate(image, title) {
    lightboxImage.src = image;
    lightboxCaption.textContent = title;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeCertificate() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightboxImage.src = "";
}

closeLightbox.addEventListener("click", closeCertificate);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeCertificate();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCertificate();
    }
});


// 10. IMAGE LOADING

document.querySelectorAll("img").forEach(image => {
    image.addEventListener("load", () => {
        image.classList.add("loaded");
    });
});

console.log("NUENG PORTFOLIO READY!");
