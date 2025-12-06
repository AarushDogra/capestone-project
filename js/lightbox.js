// SIMPLE THEME BUTTON (LIGHT MODE / DARK MODE)

// get the button and the html tag
let themeBtn = document.querySelector(".theme-toggle");
let htmlTag = document.documentElement;

// check if there is a saved theme, if not use dark
let saved = localStorage.getItem("theme");
if (saved == null) {
    saved = "dark";
}

// apply saved theme
htmlTag.setAttribute("data-theme", saved);

// change the icon on the button
function changeIcon(theme) {
    if (theme === "dark") {
        themeBtn.textContent = "☀️"; // sun
    } else {
        themeBtn.textContent = "🌙"; // moon
    }
}

changeIcon(saved);

// when button is clicked, switch theme
themeBtn.addEventListener("click", function () {
    let current = htmlTag.getAttribute("data-theme");

    let newTheme = "dark";
    if (current === "dark") {
        newTheme = "light";
    }

    htmlTag.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    changeIcon(newTheme);
});




// SIMPLE MOBILE MENU (OPEN / CLOSE)

let hamburger = document.querySelector(".hamburger");
let navMenu = document.querySelector("nav ul");

// if both exist then run
if (hamburger && navMenu) {

    // click on hamburger → open or close menu
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("mobile-open");

        // stop scrolling when menu is open
        if (navMenu.classList.contains("mobile-open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // close menu when clicking any link
    let links = document.querySelectorAll("nav ul li a");
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            hamburger.classList.remove("active");
            navMenu.classList.remove("mobile-open");
            document.body.style.overflow = "";
        });
    });

    // close when pressing ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hamburger.classList.remove("active");
            navMenu.classList.remove("mobile-open");
            document.body.style.overflow = "";
        }
    });
}
