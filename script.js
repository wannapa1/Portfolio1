
/* =====================================
   NUENG PORTFOLIO — JAVASCRIPT
   ===================================== */

// 1. MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navigation = document.querySelector(".topbar nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuToggle.textContent =
      navigation.classList.contains("open") ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });
}

// 2. TYPING EFFECT
const typingElement = document.getElementById("typing");

if (typingElement) {
  const words = [
    "Computer Science Student",
    "Future Programmer",
    "Creative Thinker",
    "Technology Enthusiast"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    typingElement.textContent = currentWord.substring(0, charIndex);

    if (!deleting) {
      charIndex++;

      if (charIndex > currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      charIndex--;

      if (charIndex < 0) {
        deleting = false;
        charIndex = 0;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
  }

  typeEffect();
}

// 3. SCROLL PROGRESS
const progressBar = document.querySelector(".progress");

function updateProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage =
    scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = percentage + "%";
}

window.addEventListener("scroll", updateProgress);
updateProgress();

// 4. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("show"));
}

// 5. DARK / LIGHT MODE
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("nueng-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

function updateThemeIcon() {
  if (!themeToggle) return;

  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀" : "☾";
}

updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const currentTheme =
      document.body.classList.contains("dark") ? "dark" : "light";

    localStorage.setItem("nueng-theme", currentTheme);
    updateThemeIcon();
  });
}

// 6. PROFILE IMAGE UPLOAD
const profileUpload = document.getElementById("profileUpload");
const profileImage = document.getElementById("profileImage");

const savedProfile = localStorage.getItem("nueng-profile-image");

if (savedProfile && profileImage) {
  profileImage.src = savedProfile;
}

if (profileUpload && profileImage) {
  profileUpload.addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("กรุณาเลือกไฟล์รูปภาพ");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("รูปภาพต้องมีขนาดไม่เกิน 5 MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      profileImage.src = reader.result;

      try {
        localStorage.setItem(
          "nueng-profile-image",
          reader.result
        );
      } catch (error) {
        alert("พื้นที่จัดเก็บรูปภาพไม่เพียงพอ กรุณาใช้รูปขนาดเล็กลง");
      }
    };

    reader.readAsDataURL(file);
  });
}

// 7. COPY EMAIL
const copyButton = document.getElementById("copyEmail");
const toast = document.getElementById("toast");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = "YOUR_EMAIL@example.com";

    try {
      await navigator.clipboard.writeText(email);

      if (toast) {
        toast.textContent = "Email copied successfully!";
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 2200);
      }
    } catch (error) {
      alert("ไม่สามารถคัดลอกได้ กรุณาคัดลอกอีเมลด้วยตนเอง");
    }
  });
}

// 8. GITHUB REPOSITORIES
const githubContainer = document.getElementById("githubRepos");
const githubUsername = "YOUR_GITHUB_USERNAME";

async function loadGithubRepositories() {
  if (!githubContainer) return;

  githubContainer.innerHTML = "<p>Loading repositories...</p>";

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const repositories = await response.json();

    if (!repositories.length) {
      githubContainer.innerHTML =
        "<p>ยังไม่มี Repository ที่เปิดเผยต่อสาธารณะ</p>";
      return;
    }

    githubContainer.innerHTML = repositories.map(repo => `
      <article class="github-card">
        <span>GITHUB REPOSITORY</span>
        <h3>${escapeHTML(repo.name)}</h3>
        <p>${escapeHTML(repo.description || "No description provided.")}</p>
        <div>
          <small>${escapeHTML(repo.language || "Code")}</small>
          <small>★ ${repo.stargazers_count}</small>
        </div>
        <a href="${repo.html_url}" target="_blank" rel="noopener">
          VIEW PROJECT ↗
        </a>
      </article>
    `).join("");

  } catch (error) {
    githubContainer.innerHTML =
      "<p>ไม่สามารถโหลด Repository ได้ในขณะนี้</p>";
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

if (githubUsername !== "YOUR_GITHUB_USERNAME") {
  loadGithubRepositories();
}

// 9. CURRENT YEAR
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 10. BACK TO TOP
const backToTop = document.querySelector('a[href="#home"]');

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
