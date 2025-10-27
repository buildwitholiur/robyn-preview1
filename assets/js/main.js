(function ($) {
    "use strict";


    jQuery(document).ready(function ($) {



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
            once: true, // whether animation should happen only once - while scrolling down
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










}(jQuery));