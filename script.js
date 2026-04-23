document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       TYPING EFFECT (HOME TEXT)
    ========================== */
    const text = "Web Developer | Student | System Builder";
    let i = 0;
    const speed = 80;

    function typeEffect() {
        if (i < text.length) {
            document.getElementById("typing").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect();

    /* =========================
       SMOOTH SCROLL NAV LINKS
    ========================== */
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /* =========================
       SIMPLE SCROLL ANIMATION
    ========================== */
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (top < windowHeight - 100) {
                sec.style.opacity = 1;
                sec.style.transform = "translateY(0)";
                sec.style.transition = "0.6s ease";
            } else {
                sec.style.opacity = 0;
                sec.style.transform = "translateY(50px)";
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

});