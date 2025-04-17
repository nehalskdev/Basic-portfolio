document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.id = "theme-toggle";
  themeToggleBtn.innerHTML = "🌙";
  themeToggleBtn.title = "Toggle Dark Mode";
  themeToggleBtn.style.position = "fixed";
  themeToggleBtn.style.top = "20px";
  themeToggleBtn.style.right = "20px";
  themeToggleBtn.style.zIndex = "1000";
  themeToggleBtn.style.background = "transparent";
  themeToggleBtn.style.border = "none";
  themeToggleBtn.style.fontSize = "2rem";
  themeToggleBtn.style.cursor = "pointer";
  themeToggleBtn.style.transition = "opacity 0.3s ease";
  document.body.appendChild(themeToggleBtn);

  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggleBtn.innerHTML = "🌞";
  }

  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", theme);
    themeToggleBtn.innerHTML = theme === "dark" ? "🌞" : "🌙";
  });

  let lastScrollPosition = 0;
  const scrollThreshold = 100;

  function handleScroll() {
    const currentScrollPosition = window.scrollY || window.pageYOffset;

    if (
      currentScrollPosition > lastScrollPosition &&
      currentScrollPosition > scrollThreshold
    ) {
      themeToggleBtn.classList.add("hidden");
    } else {
      themeToggleBtn.classList.remove("hidden");
    }

    lastScrollPosition = currentScrollPosition;
  }

  function throttle(callback, limit) {
    let waiting = false;
    return function () {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }

  window.addEventListener("scroll", throttle(handleScroll, 100));

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  const projects = document.querySelectorAll(".project");
  projects.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      project.style.transform = "translateY(-5px)";
      project.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    });

    project.addEventListener("mouseleave", () => {
      project.style.transform = "translateY(0)";
      project.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    });
  });

  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, options);

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(section);
  });

  const yearSpan = document.createElement("span");
  yearSpan.textContent = new Date().getFullYear();
  document.querySelector(
    "footer p"
  ).innerHTML = `&copy; ${yearSpan.textContent} Nehal Shaikh. All rights reserved.`;
});
