document.addEventListener("DOMContentLoaded", function () {

    /* ================= HEADER SCROLL ================= */
    const header = document.querySelector(".main-header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    /* ================= FADE-IN ================= */
    const fadeElements = document.querySelectorAll(".fade-in");

    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.2 });

        fadeElements.forEach(el => observer.observe(el));
    }

    /* ================= HAMBURGER ================= */
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (hamburger && mobileMenu) {

        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        /* SWIPE TO CLOSE */
        let touchStartX = 0;
        let touchEndX = 0;

        mobileMenu.addEventListener("touchstart", e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        mobileMenu.addEventListener("touchend", e => {
            touchEndX = e.changedTouches[0].screenX;

            if(touchEndX - touchStartX > 80){
                mobileMenu.classList.remove("active");
                hamburger.classList.remove("active");
            }
        });
    }

    /* ================= MOBILE DROPDOWN ================= */
    const mobileDropBtn = document.querySelector(".mobile-dropbtn");
    const mobileDropdown = document.querySelector(".mobile-dropdown");

    if (mobileDropBtn && mobileDropdown) {
        mobileDropBtn.addEventListener("click", () => {
            mobileDropdown.classList.toggle("active");
        });
    }

    /* ================= FAQ ACCORDION ================= */

    const faqItems = document.querySelectorAll(".faq-item-modern");

    if (faqItems.length > 0) {

        faqItems.forEach(item => {

            const button = item.querySelector(".faq-question-modern");
            const icon = item.querySelector(".faq-icon");

            button.addEventListener("click", function(){

                // Diğerlerini kapat (premium UX)
                faqItems.forEach(otherItem => {
                    if(otherItem !== item){
                        otherItem.classList.remove("active");
                        const otherIcon = otherItem.querySelector(".faq-icon");
                        if(otherIcon) otherIcon.textContent = "+";
                    }
                });

                // Tıklananı aç/kapat
                item.classList.toggle("active");

                if(item.classList.contains("active")){
                    icon.textContent = "−";
                } else {
                    icon.textContent = "+";
                }

            });

        });

    }

});
document.querySelectorAll(".scroll-icon").forEach(btn => {
    btn.addEventListener("click", function () {

        const target = document.querySelector(this.dataset.target);

        if (target) {
            const offset = target.offsetTop - (window.innerHeight / 2) + (target.offsetHeight / 2);

            window.scrollTo({
                top: offset,
                behavior: "smooth"
            });
        }
    });
});
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;

            const update = () => {
                const increment = target /200;

                if(count < target){
                    count += increment;
                    counter.textContent = Math.ceil(count) + "+";
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + "+";
                }
            };

            update();
            observer.unobserve(counter);
        }
    });
},{ threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));