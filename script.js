
// =====================================
// 1. MOBILE MENU
// =====================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});


// =====================================
// 2. TYPING EFFECT
// =====================================

const typingText = document.getElementById("typingText");

const words = [
  "Computer Science Enthusiast",
  "Future Programmer",
  "Creative Thinker",
  "Technology Explorer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 90 : 150);
}

typeEffect();


// =====================================
// 3. SCROLL REVEAL
// =====================================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});


// =====================================
// 4. SCROLL PROGRESS
// =====================================

const progressBar = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

  progressBar.style.width = progress + "%";
});


// =====================================
// 5. DARK / LIGHT MODE
// =====================================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeToggle.textContent = isLight ? "☾" : "☼";

  localStorage.setItem("nueng-theme", isLight ? "light" : "dark");
});

const savedTheme = localStorage.getItem("nueng-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☾";
}


// =====================================
// 6. GITHUB REPOSITORIES
// =====================================

const githubContainer = document.getElementById("githubRepos");

fetch("https://api.github.com/users/wannapa1/repos?sort=updated&per_page=6")
  .then(response => {
    if (!response.ok) {
      throw new Error("GitHub data unavailable");
    }
    return response.json();
  })
  .then(repos => {
    if (!repos.length) {
      githubContainer.innerHTML = "<p>ยังไม่มี Repository ที่แสดง</p>";
      return;
    }

    githubContainer.innerHTML = repos.map(repo => `
      <article class="repo-card">
        <h4>${escapeHTML(repo.name)}</h4>
        <p>${escapeHTML(repo.description || "ไม่มีคำอธิบาย")}</p>
        <p>★ ${repo.stargazers_count} &nbsp; • &nbsp; ${escapeHTML(repo.language || "Code")}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          View Repository ↗
        </a>
      </article>
    `).join("");
  })
  .catch(() => {
    githubContainer.innerHTML = `
      <p>ไม่สามารถโหลด Repository ได้ในขณะนี้</p>
      <a href="https://github.com/wannapa1" target="_blank" rel="noopener noreferrer">
        เปิด GitHub โดยตรง ↗
      </a>
    `;
  });

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}


// =====================================
// 7. CURRENT YEAR
// =====================================

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


// =====================================
// 8. IMAGE FALLBACK
// =====================================

const profileImage = document.querySelector(".profile-photo img");

profileImage.addEventListener("error", () => {
  profileImage.style.display = "none";
  document.getElementById("photoFallback").style.display = "grid";
});
