document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // 1. MOBILE MENU
  // ===============================
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const menuIcon = document.querySelector(".menu-toggle i");

  if (menuToggle && navMenu) {
    ["click", "touchstart"].forEach((eventType) => {
      menuToggle.addEventListener(eventType, function (e) {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle("active");
        if (menuIcon) {
          menuIcon.classList.toggle("fa-bars");
          menuIcon.classList.toggle("fa-times");
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove("active");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });
  }

  // ===============================
  // 2. DROPDOWN MENU
  // ===============================
  document.querySelectorAll(".nav-menu li").forEach((item) => {
    item.addEventListener("click", function (e) {
      const dropdown = this.querySelector(".dropdown-menu");
      if (dropdown) {
        dropdown.classList.toggle("show");
        e.stopPropagation();
      }
    });
  });

  // ===============================
  // 3. COUNTER ANIMATION
  // ===============================
  const counters = document.querySelectorAll(".counter");
  const formatter = new Intl.NumberFormat("en-IN");
  const playedCounters = new WeakSet();

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    if (isNaN(target) || playedCounters.has(el)) return;

    playedCounters.add(el);
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      el.textContent = formatter.format(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatter.format(target);
      }
    }

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((counter) => observer.observe(counter));

  // ===============================
  // 4. BLOG CAROUSEL
  // ===============================
  const carousel = document.querySelector(".blog-carousel .carousel-container");
  if (carousel) {
    const slidesContainer = carousel.querySelector(".slides");
    const slides = carousel.querySelectorAll(".slide");
    const prevBtn = carousel.querySelector(".blog-prev");
    const nextBtn = carousel.querySelector(".blog-next");

    let currentSlide = 0;
    let autoSlideInterval;

    const moveSlide = (direction) => {
      currentSlide = (currentSlide + direction + slides.length) % slides.length;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    // Event Listeners
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => moveSlide(-1));
      nextBtn.addEventListener("click", () => moveSlide(1));
    }

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    // Start auto-slide
    startAutoSlide();
  }
});
