// =======================
// Theme Toggle
// =======================
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

const themes = ["light-theme", "dark-theme", "blue-theme"];
let currentTheme = 0;

// Restore saved theme if exists
if (localStorage.getItem("theme")) {
  const savedTheme = localStorage.getItem("theme");
  if (themes.includes(savedTheme)) {
    body.classList.add(savedTheme);
    currentTheme = themes.indexOf(savedTheme);
  } else {
    body.classList.add(themes[currentTheme]);
  }
} else {
  body.classList.add(themes[currentTheme]);
}

updateIcon();

toggleBtn.addEventListener("click", () => {
  body.classList.remove(themes[currentTheme]);
  currentTheme = (currentTheme + 1) % themes.length;
  body.classList.add(themes[currentTheme]);
  localStorage.setItem("theme", themes[currentTheme]);
  updateIcon();
});

function updateIcon() {
  if (themes[currentTheme] === "light-theme") {
    toggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
  } else if (themes[currentTheme] === "dark-theme") {
    toggleBtn.innerHTML = `<i class="fas fa-moon"></i>`;
  } else {
    toggleBtn.innerHTML = `<i class="fas fa-water"></i>`;
  }
}

// =======================
// Portfolio Lightbox
// =======================
const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
  <span class="close">&times;</span>
  <img class="lightbox-img" src="" alt="">
  <p class="lightbox-caption"></p>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxClose = lightbox.querySelector(".close");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[currentIndex];
  lightbox.style.display = "flex";
  lightboxImg.src = item.src;
  lightboxCaption.textContent = item.alt;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

// Open when clicked
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Close with button
lightboxClose.addEventListener("click", closeLightbox);

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    }
  }
});
