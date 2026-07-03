const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const apiBaseUrl = window.location.protocol === "file:" ? "http://localhost:5000" : "";
const homeSection = document.querySelector("#home");
const aboutSection = document.querySelector("#about");
const supportsCustomCursor = window.matchMedia("(pointer: fine)").matches;

let lastScrollY = window.scrollY;
let isHomeVisible = true;

const updateHomeIconMotion = () => {
  const isScrollingUp = window.scrollY <= lastScrollY;
  document.body.classList.toggle("home-icons-active", isHomeVisible && (isScrollingUp || window.scrollY < 80));
  lastScrollY = window.scrollY;
};

if (supportsCustomCursor) {
  const cursor = document.createElement("div");
  const cursorPoint = document.createElement("div");
  const cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pointPosition = { ...cursorPosition };
  let isCursorVisible = false;

  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursorPoint.className = "cursor-point";
  cursorPoint.setAttribute("aria-hidden", "true");
  document.body.append(cursor, cursorPoint);

  window.addEventListener("pointermove", (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
    isCursorVisible = true;
    cursor.classList.add("is-visible");
    cursorPoint.classList.add("is-visible");
  });

  const animateCursor = () => {
    pointPosition.x += (cursorPosition.x - pointPosition.x) * 0.22;
    pointPosition.y += (cursorPosition.y - pointPosition.y) * 0.22;

    cursor.style.left = `${cursorPosition.x}px`;
    cursor.style.top = `${cursorPosition.y}px`;
    cursorPoint.style.left = `${pointPosition.x}px`;
    cursorPoint.style.top = `${pointPosition.y}px`;

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  window.addEventListener("pointerleave", () => {
    isCursorVisible = false;
    cursor.classList.remove("is-visible");
    cursorPoint.classList.remove("is-visible");
  });

  window.addEventListener("pointerenter", () => {
    if (isCursorVisible) {
      cursor.classList.add("is-visible");
      cursorPoint.classList.add("is-visible");
    }
  });

  document.querySelectorAll("a, button, input, textarea").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hovering");
      cursorPoint.classList.add("is-hovering");
    });
    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hovering");
      cursorPoint.classList.remove("is-hovering");
    });
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

if (homeSection) {
  const homeMotionObserver = new IntersectionObserver(
    ([entry]) => {
      isHomeVisible = entry.isIntersecting;
      updateHomeIconMotion();
    },
    { threshold: 0.25 }
  );

  homeMotionObserver.observe(homeSection);
  window.addEventListener("scroll", updateHomeIconMotion, { passive: true });
  updateHomeIconMotion();
}

if (aboutSection) {
  const aboutPopObserver = new IntersectionObserver(
    ([entry]) => {
      aboutSection.classList.toggle("about-pop-visible", entry.isIntersecting);
    },
    { rootMargin: "-18% 0px -20% 0px", threshold: 0.18 }
  );

  aboutPopObserver.observe(aboutSection);
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Please fill all contact fields correctly.";
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  formStatus.textContent = "Sending message...";

  try {
    const response = await fetch(`${apiBaseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Message could not be sent.");
    }

    formStatus.textContent = "Message sent successfully.";
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = error.message;
  }
});
