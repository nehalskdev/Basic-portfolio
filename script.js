document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.id = "theme-toggle";
  themeToggleBtn.innerHTML = "🌙";
  themeToggleBtn.title = "Toggle Dark Mode";
  themeToggleBtn.style.position = "fixed";
  themeToggleBtn.style.top = "70px";
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
    themeToggleBtn.innerHTML = "☀️";
  }

  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", theme);
    themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
  });

  let lastScrollPosition = 0;
  const scrollThreshold = 80;

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

  window.addEventListener("scroll", throttle(handleScroll, 80));

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

  // About me section typing animation from here

  const aboutMeText = `👋 I'm Nehal Shaikh, a dedicated Javascript enthusiast on a mission to harness the power of coding for transformative digital experiences. With a rich background of three years in data management within the non-IT sector, I'm now embarking on an exciting journey towards frontend development.

Driven by a fervent passion for technology and a relentless pursuit of excellence, I'm immersing myself in the dynamic world of web development. Every line of code I write is fueled by a desire to craft seamless user interfaces, elevate user experiences, and push the boundaries of innovation.

As I pave my path in frontend development, I bring with me a wealth of problem-solving skills, attention to detail, and a knack for optimizing processes. I thrive in collaborative environments and am eager to contribute my expertise to projects that challenge and inspire growth.

Join me on this exhilarating journey as I continue to learn, grow, and make an impact in the world of frontend development. Let's connect, collaborate, and create something extraordinary together! 💻✨.`;

  const typingElement = document.getElementById("typing-text");
  const typingButton = document.querySelector(".typing-trigger");
  let i = 0;
  const speed = 20;

  document.querySelector(".typing-trigger").classList.add("pulse");

  typingButton.addEventListener("click", function () {
    this.classList.add("hide");

    // Show typing text container
    setTimeout(() => {
      typingElement.classList.add("show");
      typingElement.style.borderRight = "3px solid var(--primary-color)";
      typeWriter();
    }, 800);

    const keyboardSound = new Audio("./assets/Click sound.wav");
    keyboardSound.volume = 0.2;
    keyboardSound.play();
  });

  function typeWriter() {
    if (i < aboutMeText.length) {
      typingElement.innerHTML = aboutMeText.substring(0, i + 1);
      i++;

      // Random speed variation for natural typing
      const randomSpeed = speed + (Math.random() * 20 - 10);
      setTimeout(typeWriter, randomSpeed);

      // Auto-scroll to keep text in view
      if (i % 100 === 0) {
        typingElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      // Animation complete
      typingElement.style.borderRight = "none";

      // Add completion effect
      typingElement.classList.add("completed");
    }
  }
});

// download pdf feat

// Add pulse animation when page loads
document.addEventListener("DOMContentLoaded", function () {
  const resumeBtn = document.querySelector(".resume-download-btn");

  // Add pulse animation for 6 seconds
  resumeBtn.classList.add("pulse");
  setTimeout(() => {
    resumeBtn.classList.remove("pulse");
  }, 6000);

  // Click tracking (optional)
  resumeBtn.addEventListener("click", function () {
    console.log("Resume downloaded");
    const keyboardSound = new Audio("./assets/Click sound.wav");
    keyboardSound.volume = 0.2;
    keyboardSound.play();
  });
});
