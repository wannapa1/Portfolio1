
// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

// CLOSE MENU AFTER CLICK
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
    });
});

// DARK / LIGHT MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeBtn.textContent =
        document.body.classList.contains("light") ? "☾" : "☼";

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
});

// REMEMBER THEME
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☾";
}

// TYPING ANIMATION
const words = [
    "Computer Scientist",
    "Web Developer",
    "Programmer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    document.getElementById("typing").textContent =
        currentWord.substring(0, charIndex);

    if (!deleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (deleting && charIndex > 0) {
        charIndex--;
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeEffect, 1000);
        return;
    } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

// GALLERY UPLOAD
const galleryInput = document.getElementById("galleryInput");
const galleryContainer = document.getElementById("galleryContainer");

galleryInput.addEventListener("change", function() {
    const files = [...this.files];

    files.forEach(file => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();

        reader.onload = function(event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.alt = file.name;

            galleryContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(
    ".section, .project-card, .skill, .profile"
).forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "all .7s ease";

    observer.observe(element);
});
