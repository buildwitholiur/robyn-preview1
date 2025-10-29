(function ($) {
    "use strict";


    jQuery(document).ready(function ($) {


       //------------ Offcanvas menu -------------

        $('.open__menu').on('click', function () {
            $('body').addClass('open__offcanvas');
        })
        $('.close__btn, .overlay, .offcanvas__menu ul li a').on('click', function () {
            $('body').removeClass('open__offcanvas');
        })




        // 1️⃣ Right → Left (default direction)
        const swiper = new Swiper('.testimonial__wrapper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: false, // default
            },
            freeMode: true,
            freeModeMomentum: false,
        });

        // 2️⃣ Left → Right (reverse direction)
        const swiperltr = new Swiper('.testimonial__wrapper--2', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: true, // 👈 makes it go LTR
            },
            freeMode: true,
            freeModeMomentum: false,
        });



        const videoslider = new Swiper('.community__wrapper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true, // 🔁 infinite loop
            grabCursor: true,
            allowTouchMove: true, // 👆 manual swipe allowed
            speed: 6000, // ⚡ smooth marquee scroll speed
            autoplay: {
                delay: 0, // ⏱ continuous movement, no pause
                disableOnInteraction: false, // 🔁 autoplay continues even after swipe
            },
            freeMode: {
                enabled: true, // 🧠 continuous natural scroll
                momentum: false, // 🧩 stable motion
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.9,
                                spaceBetween: 10,
                },
                480: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 2.9,
                },
                768: {
                    slidesPerView: 2.8,
                },
                1024: {
                    slidesPerView: 3.5,
                },
                1280: {
                    slidesPerView: 'auto',
                },
            },
        });





        // You can also pass an optional settings object
        // below listed default settings
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

        });





        function smoothScrollTop() {
            $('a[href^="#"]').on("click", function (event) {
                let targetID = $(this).attr("href"); // Get the target ID
                let target = $(targetID);

                if (target.length) {
                    event.preventDefault();

                    // Remove 'active' class from all links
                    $('.header__menu nav ul li a').removeClass('active');

                    // Add 'active' class to clicked link
                    $(this).addClass('active');

                    // Get dynamic header height
                    let headerHeight = $(".header").outerHeight() || 0;

                    // Ensure correct scrolling position
                    let targetOffset = target.offset().top - headerHeight - 10;

                    // Animate scrolling
                    $("html, body").stop().animate({
                        scrollTop: targetOffset
                    }, 800, "swing");
                }
            });
        }

        // Sticky Header Logic
        let isSticky = false;

        function stickyHeader() {
            let header = $(".header");
            let scrollTop = $(window).scrollTop();
            let headerHeight = header.outerHeight(); // Get dynamic height
            let scrollThreshold = headerHeight * 2; // Set threshold

            if (scrollTop > scrollThreshold && !isSticky) {
                header.addClass("sticky").css({
                    top: `-${headerHeight}px`
                });

                setTimeout(() => {
                    header.css("top", "0px");
                }, 10);

                isSticky = true;
            } else if (scrollTop <= scrollThreshold && isSticky) {
                header.css("top", `-${headerHeight}px`);
                setTimeout(() => {
                    header.removeClass("sticky").css("top", "");
                }, 400);

                isSticky = false;
            }
        }

        // Improved Scroll Spy for Active Links
        function scrollSpy() {
            let scrollPos = $(document).scrollTop() + $(".header").outerHeight() + 20; // Add extra margin

            $('.header__menu nav ul li a').each(function () {
                let targetID = $(this).attr("href");
                let target = $(targetID);

                if (target.length) {
                    let targetTop = target.offset().top - $(".header").outerHeight() - 10; // Adjust for sticky header
                    let targetBottom = targetTop + target.outerHeight();

                    if (scrollPos >= targetTop && scrollPos < targetBottom) {
                        $('.header__menu nav ul li a').removeClass('active'); // Remove active from all
                        $(this).addClass('active'); // Add to current section
                    }
                }
            });
        }

        // Run functions when document is loaded
        document.documentElement.style.scrollBehavior = "auto"; // Disable default smooth scrolling
        $(document).ready(function () {
            smoothScrollTop();
            stickyHeader();
            scrollSpy();
        });

        // Run functions on scroll & resize
        $(window).on("scroll resize", function () {
            stickyHeader();
            scrollSpy();
        });


    }); //---document-ready-----


    // Video card play/pause
    $('.video__card').on('click', function () {
        const card = $(this);
        const video = card.find('video')[0];
        const thumbnail = card.find('.thumbnail')[0];
        const playBtn = card.find('.play__btn')[0];

        $('.video__card').not(card).each(function () {
            const otherVideo = $(this).find('video')[0];
            const otherThumbnail = $(this).find('.thumbnail')[0];
            const otherPlayBtn = $(this).find('.play__btn')[0];
            otherVideo.pause();
            otherVideo.style.display = 'none';
            otherPlayBtn.style.display = 'block';
            otherThumbnail.style.display = 'block';
        });

        if (video.paused) {
            thumbnail.style.display = 'none';
            playBtn.style.display = 'none';
            video.style.display = 'block';
            video.play();
        } else {
            video.pause();
            video.style.display = 'block';
            playBtn.style.display = 'block';
        }
    });



    document.querySelectorAll(".button").forEach((button) => {
        button.onmousemove = (e) => {
            const x = e.pageX - e.target.offsetLeft;
            const y = e.pageY - e.target.offsetTop;
            e.target.style.setProperty("--x", `${x}px`);
            e.target.style.setProperty("--y", `${y}px`);
        };
    });


    // FOR AOS ANIMATIONS------------->
    function applyHoverEffect(selector) {
        document.querySelectorAll(selector).forEach((button) => {
            button.onmousemove = (e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.target.style.setProperty("--x", `${x}px`);
                e.target.style.setProperty("--y", `${y}px`);
            };
        });
    }
    // Initial hover effect
    applyHoverEffect(".download__btn");
    applyHoverEffect(".common__btn");
    // Re-apply after AOS animation
    document.addEventListener("aos:in", ({
        detail
    }) => {
        applyHoverEffect(".download__btn");
        applyHoverEffect(".common__btn");
    });


    document.addEventListener("DOMContentLoaded", function () {
        // 🔧 Customize your typing & deleting speed here
        const typingSpeed = 10; // milliseconds per character (typing)
        const deletingSpeed = 10; // milliseconds per character (deleting)

        // 🧠 Initialize typewriter
        var typewriter = new Typewriter("#typed-text", {
            loop: true,
            delay: typingSpeed,
            cursor: "|",
        });

        // 🧩 Patch delete speed manually
        // (override deleteAll method to respect deletingSpeed)
        const originalDeleteAll = typewriter.deleteAll;
        typewriter.deleteAll = function (speed = deletingSpeed) {
            return originalDeleteAll.call(this, speed);
        };

        // 🖋 Type → Pause → Delete → Next Text
        typewriter
            .typeString("Is he my soulmate or just tall? I need a new type")
            .pauseFor(3000)
            .deleteAll()
            .typeString("Make me emotionally stable but still fun at parties")
            .pauseFor(3000)
            .deleteAll()
            .typeString("Help me stop diagnosing people on the first date")
            .pauseFor(3000)
            .deleteAll()
            .typeString("Why do I crave peace but chase chaos?")
            .pauseFor(3000)
            .start();
    });


    const accordions = document.querySelectorAll(".accordion__input");
    accordions.forEach((input) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                accordions.forEach((other) => {
                    if (other !== input) other.checked = false;
                });
            }
        });
    });
    window.addEventListener("load", () => {
        accordions.forEach((input) => (input.checked = false));
    });




    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('resume');
    const uploadLabel = document.querySelector('.resume-upload .upload__label span');

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            uploadLabel.textContent = fileName;
            uploadBtn.innerHTML = `<i class="fa-solid fa-check"></i> File Selected`;
            uploadBtn.style.background = "#ffdca8";
        } else {
            uploadLabel.textContent = "Resume";
            uploadBtn.innerHTML = `<img src="assets/img/upload-icon.svg" alt="Icon"> Upload File`;
            uploadBtn.style.background = "";
        }
    });



    const submitBtn = document.querySelector('.submit__btn');

    submitBtn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        this.style.setProperty('--x', `${e.clientX - rect.left}px`);
        this.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });




}(jQuery));