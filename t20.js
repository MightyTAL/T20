(() => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const nav = document.querySelector(".chanel-nav");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (nav && toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    // Close menu after clicking a link (mobile)
    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active link highlight while scrolling
  const navLinks = Array.from(document.querySelectorAll(".nav-menu a[href^='#']"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const linkBySection = new Map(sections.map((sec, i) => [sec, navLinks[i]]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          navLinks.forEach((a) => a.classList.remove("active"));
          linkBySection.get(entry.target)?.classList.add("active");
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
})();
