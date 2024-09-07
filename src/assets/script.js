// document.addEventListener("DOMContentLoaded", function () {
//   const menuToggle = document.querySelector(".ri-menu-line");
//   const menu = document.querySelector(".menu");
//   const mainContent = document.querySelector(".main-content");
//   const darkModeToggle = document.querySelector(".ri-contrast-2-line");

//   function checkScreenWidth() {
//     if (window.innerWidth < 768) {
//       menu.classList.add("collapsed");
//       mainContent.classList.add("collapsed");
//     } else {
//       menu.classList.remove("collapsed");
//       mainContent.classList.remove("collapsed");
//     }
//   }

//   menuToggle.addEventListener("click", function () {
//     if (window.innerWidth < 768) {
//       menu.classList.toggle("expanded");
//       mainContent.classList.toggle("shifted");
//     } else {
//       menu.classList.toggle("collapsed");
//       mainContent.classList.toggle("collapsed");
//     }
//   });

//   darkModeToggle.addEventListener("click", function () {
//     document.body.classList.toggle("dark-mode");
//   });

//   window.addEventListener("resize", checkScreenWidth);
//   checkScreenWidth();

 
//   window.addEventListener("scroll", function () {
//     if (window.scrollY > 0) {
//       menu.classList.add("menu-filled");
//     } else {
//       menu.classList.remove("menu-filled");
//     }
//   });
// });

// Receipt page
// function printPage() {
//   var body = document.getElementById("body").innerHTML;
//   var data = document.getElementById("data").innerHTML;

//   document.getElementById("body").innerHTML = data;
//   window.print();
//   document.getElementById("body").innerHTML = body;
// }

// // Payment
// const cardBtn = document.getElementById("card-btn");
// const upiBtn = document.getElementById("upi-btn");
// const cardForm = document.getElementById("card-form");
// const upiForm = document.getElementById("upi-form");
// const submitBtns = document.getElementsByClassName("submit-btn");

// cardBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   cardForm.style.display = "block";
//   upiForm.style.display = "none";
// });

// upiBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   cardForm.style.display = "none";
//   upiForm.style.display = "block";
// });

// Array.prototype.forEach.call(submitBtns, (btn) => {
//   btn.addEventListener("click", (e) => {
//     cardForm.style.display = "none";
//     upiForm.style.display = "none";
//   });
// });
