// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.getAttribute("href") === "#") return;

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
        }
      }
    });
  });

  // Sticky Header on Scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 100) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "none";
      }
    }
  });

  // Form Submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Horizontal Scroll Controls for Our Journey Section
  const journeyScroll = document.querySelector(".journey-scroll");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (journeyScroll && leftBtn && rightBtn) {
    // Initial button visibility
    updateScrollButtons();

    // Scroll event listener
    journeyScroll.addEventListener("scroll", updateScrollButtons);

    // Button click handlers
    leftBtn.addEventListener("click", function () {
      journeyScroll.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    });

    rightBtn.addEventListener("click", function () {
      journeyScroll.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    });
  }

  function updateScrollButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = journeyScroll;
    const atStart = scrollLeft === 0;
    const atEnd = scrollLeft >= scrollWidth - clientWidth - 1;

    leftBtn.style.display = atStart ? "none" : "flex";
    rightBtn.style.display = atEnd ? "none" : "flex";
  }

  // Touch event support for horizontal scrolling
  if (journeyScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    journeyScroll.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - journeyScroll.offsetLeft;
      scrollLeft = journeyScroll.scrollLeft;
    });

    journeyScroll.addEventListener("mouseleave", () => {
      isDown = false;
    });

    journeyScroll.addEventListener("mouseup", () => {
      isDown = false;
    });

    journeyScroll.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - journeyScroll.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      journeyScroll.scrollLeft = scrollLeft - walk;
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi scroll horizontal
  const journeyScroll = document.querySelector(".journey-scroll");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (journeyScroll && leftBtn && rightBtn) {
    // Fungsi untuk update visibilitas tombol
    const updateButtonVisibility = () => {
      const scrollLeft = journeyScroll.scrollLeft;
      const maxScroll = journeyScroll.scrollWidth - journeyScroll.clientWidth;

      leftBtn.style.display = scrollLeft <= 10 ? "none" : "flex";
      rightBtn.style.display = scrollLeft >= maxScroll - 10 ? "none" : "flex";
    };

    // Fungsi scroll dengan debounce untuk performa
    let isScrolling = false;
    const smoothScroll = (distance) => {
      if (isScrolling) return;
      isScrolling = true;

      journeyScroll.scrollBy({
        left: distance,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    // Event listeners untuk tombol
    leftBtn.addEventListener("click", () => {
      smoothScroll(-journeyScroll.offsetWidth * 0.8);
    });

    rightBtn.addEventListener("click", () => {
      smoothScroll(journeyScroll.offsetWidth * 0.8);
    });

    // Update tombol saat scroll
    journeyScroll.addEventListener("scroll", updateButtonVisibility);

    // Inisialisasi pertama kali
    updateButtonVisibility();

    // Touch dan drag support
    let isDragging = false;
    let startX, scrollLeft;

    const startDrag = (e) => {
      isDragging = true;
      startX = (e.pageX || e.touches[0].pageX) - journeyScroll.offsetLeft;
      scrollLeft = journeyScroll.scrollLeft;
      journeyScroll.style.cursor = "grabbing";
      journeyScroll.style.scrollBehavior = "auto";
    };

    const endDrag = () => {
      isDragging = false;
      journeyScroll.style.cursor = "grab";
      journeyScroll.style.scrollBehavior = "smooth";
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = (e.pageX || e.touches[0].pageX) - journeyScroll.offsetLeft;
      const walk = (x - startX) * 2;
      journeyScroll.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    journeyScroll.addEventListener("mousedown", startDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", moveDrag);

    // Touch events
    journeyScroll.addEventListener("touchstart", startDrag, { passive: false });
    journeyScroll.addEventListener("touchend", endDrag, { passive: false });
    journeyScroll.addEventListener("touchmove", moveDrag, { passive: false });
  }
});
// Program Tab Navigation
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  // Smooth Scrolling for Program Tabs
  const programTabs = document.querySelectorAll(".program-tab");

  programTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all tabs
      programTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Scroll to section
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 140,
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight active tab based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".program-section");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    programTabs.forEach((tab) => {
      tab.classList.remove("active");
      if (tab.getAttribute("href") === currentSection) {
        tab.classList.add("active");
      }
    });
  });
});
// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        // Here you would typically send the form data to a server
        alert("Thank you for your message! We will get back to you soon.");
        contactForm.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }
});
