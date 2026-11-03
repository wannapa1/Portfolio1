
// =============================
// NUENG PORTFOLIO JAVASCRIPT
// =============================

// 1. Typing animation
const typingText = document.getElementById("typingText");

const words = [
  "Computer Scientist",
  "Problem Solver",
  "Technology Creator"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingText) return;

  const word = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typingText.textContent = word.substring(0, charIndex);

    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;
    typingText.textContent = word.substring(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();


// 2. Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


// 3. Dark / Light mode
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("nueng-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  localStorage.setItem(
    "nueng-theme",
    isLight ? "light" : "dark"
  );

  themeToggle.textContent = isLight ? "☾" : "☼";
});


// 4. Scroll reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


// 5. Profile card mouse tilt
const profileCard = document.querySelector(".profile-card");

if (profileCard && window.matchMedia("(pointer:fine)").matches) {
  profileCard.addEventListener("mousemove", event => {
    const rect = profileCard.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    profileCard.style.transform =
      `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });

  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "rotateY(0) rotateX(0)";
  });
}


// 6. Copy email
const copyButton = document.getElementById("copyEmail");
const toast = document.getElementById("toast");

const email = "cxx1382@gmail.com";

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "คัดลอกอีเมลเรียบร้อยแล้ว!";
  } catch {
    toast.textContent = email;
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
});


// 7. Active navigation on scroll
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll("nav a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

console.log("NUENG PORTFOLIO — HTML CSS JavaScript");
