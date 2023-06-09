
$(document).ready(function () {
    var owl = $('#partners-carousel');
    if (owl) {
        owl.owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            smartSpeed: 3000,
            autoplayTimeout: 3000,
            autoplayHoverPause: false,
            nav: false,
            dots: false,
            center: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
    }

});
