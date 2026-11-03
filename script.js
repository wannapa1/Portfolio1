
/* =================================
   NUENG PORTFOLIO - JAVASCRIPT
================================= */

// 1. CURRENT YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 2. TYPING ANIMATION
const typingElement = document.getElementById("typing");

const words = [
    "Programming.",
    "Technology.",
    "Web Development.",
    "Artificial Intelligence.",
    "Computer Science."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 45 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1300;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// 3. MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuToggle.textContent =
        navLinks.classList.contains("open") ? "✕" : "☰";

});


// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";

    });

});


// 4. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    ".section, .project-card"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


// 5. DARK MODE
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("nueng-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀" : "☾";

    localStorage.setItem(
        "nueng-theme",
        isDark ? "dark" : "light"
    );

});


// 6. COPY EMAIL
const copyButton = document.getElementById("copyEmail");

copyButton.addEventListener("click", async () => {

    const email = "cxx1382@gmail.com";

    try {

        await navigator.clipboard.writeText(email);

        copyButton.textContent = "Copied! ✓";

    } catch (error) {

        window.prompt("Copy this email:", email);

    }

    setTimeout(() => {
        copyButton.textContent = "Copy Email";
    }, 2000);

});


// 7. ACTIVE NAVIGATION
const pageSections = document.querySelectorAll(
    "section[id]"
);

const navItems = document.querySelectorAll(
    ".nav-links a"
);

const activeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navItems.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    rootMargin: "-30% 0px -60% 0px"
});

pageSections.forEach(section => {
    activeObserver.observe(section);
});


// 8. WELCOME MESSAGE
console.log(
    "%c Welcome to NUENG Portfolio! ",
    "background:#8055db;color:white;padding:10px;border-radius:8px;font-size:16px;"
);

console.log("Designed and developed by Wannapa Intarat.");
