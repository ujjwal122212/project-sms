document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector(".ri-menu-line");
  const menu = document.querySelector(".menu");
  const mainContent = document.querySelector(".main-content");
  const darkModeToggle = document.querySelector(".ri-contrast-2-line");

  function checkScreenWidth() {
      if (window.innerWidth < 768) {
          menu.classList.add("collapsed");
          mainContent.classList.add("collapsed");
      } else {
          menu.classList.remove("collapsed");
          mainContent.classList.remove("collapsed");
      }
  }

  menuToggle.addEventListener("click", function() {
      if (window.innerWidth < 768) {
          menu.classList.toggle("expanded");
          mainContent.classList.toggle("shifted");
      } else {
          menu.classList.toggle("collapsed");
          mainContent.classList.toggle("collapsed");
      }
  });

  darkModeToggle.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
  });

  window.addEventListener("resize", checkScreenWidth);
  checkScreenWidth();

  // Add scroll event listener
  window.addEventListener("scroll", function() {
      if (window.scrollY > 0) {
          menu.classList.add("menu-filled");
      } else {
          menu.classList.remove("menu-filled");
      }
  });
});
