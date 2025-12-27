fetch('assets/images/svg-sprite.svg')
.then(response => response.text())
.then(data => {
  document.getElementById('svg-sprite-container').innerHTML = data;
});

// MOBILE MENU FUNCTIONALITY
(function() {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMobileMenu = document.getElementById('close-mobile-menu');

    // Open mobile menu
    hamburgerToggle.addEventListener('click', function() {
        hamburgerToggle.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    function closeMobileMenuFunc() {
        hamburgerToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);

    // Close mobile menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenuFunc();
        }
    });

    // Close mobile menu when menu item is clicked
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-list a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenuFunc);
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenuFunc();
        }
    });
})();

// FAQs
(function( $ ){
    $(".collapsed-item").click(function() {
        const $faqArea = $(this).closest('.faq-list-area');
        if (!$(this).hasClass("opened")) {
            $faqArea.find(".collapsed-item.opened").removeClass("opened")
        }
        $(this).toggleClass("opened")
    });
})( jQuery );
  
const swiper = new Swiper('.myBestsellerSwiper', {
  loop:true,
  autoplay: {
   delay: 5000,
 },
  speed:600,
  // Okları aktif et
  navigation: {
    nextEl: '.swipe-button-next',
    prevEl: '.swipe-button-prev',
  },
  
  spaceBetween: 20,
  
      
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto', 
    
    coverflowEffect: {
        rotate: 30,     
        stretch: 0,     
        depth: 100,     
        modifier: 1, 
        scale: 1,     
        slideShadows: false, 
    },
    breakpoints: {
        575: {
            slidesPerView: 1, 
            coverflowEffect: { rotate: 0, stretch: 0, depth: 0 },
        },
        768: {
            slidesPerView: 2, 
            coverflowEffect: { rotate: 30, stretch: 0, depth: 100 },
        },
        991: {
            slidesPerView: 3, 
            coverflowEffect: { rotate: 30, stretch: 0, depth: 100 },
        },
        1440: {
            slidesPerView: 'auto', 
            coverflowEffect: {
                rotate: 30,     
                stretch: 0, 
                depth: 100, 
                modifier: 1, 
            },
        }
    }
});

const comments = new Swiper('.comments-swiper', {
  loop:true,
  autoplay: {
   delay: 5000,
 },
  speed:600,
  // Okları aktif et
  navigation: {
    nextEl: '.swipe-button-next',
    prevEl: '.swipe-button-prev',
  },
  
  spaceBetween: 20,


    breakpoints: {
        575: {
            slidesPerView: 1, 
            coverflowEffect: { rotate: 0, stretch: 0, depth: 0 },
        },
        768: {
            slidesPerView: 2, 
            coverflowEffect: { rotate: 30, stretch: 0, depth: 100 },
        },
        991: {
            slidesPerView: 2, 
            coverflowEffect: { rotate: 30, stretch: 0, depth: 100 },
        },
        1440: {
            slidesPerView: '2', 
        }
    }
});

// TAB MENU FUNCTIONALITY
(function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.querySelector(`.tab-pane[data-tab="${tabName}"]`).classList.add('active');
        });
    });
})();

// PRODUCT PAGE INTERACTIONS
(function() {
    const productHero = document.getElementById('product-hero');
    if (!productHero) return;

    // Gallery thumbnail swap with micro animation
    const mainImage = productHero.querySelector('.product-main-image img');
    const thumbs = productHero.querySelectorAll('.product-thumbnails .thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgEl = thumb.querySelector('img');
            if (!imgEl || thumb.classList.contains('active')) return;

            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            mainImage.classList.remove('swap-animate');
            void mainImage.offsetWidth; // restart animation
            mainImage.src = imgEl.src;
            mainImage.alt = imgEl.alt;
            mainImage.classList.add('swap-animate');
        });
    });

    // Variant toggles (color, size, strap)
    productHero.querySelectorAll('.variant-options').forEach(group => {
        group.addEventListener('click', (event) => {
            const target = event.target.closest('.color-swatch, .pill');
            if (!target) return;
            group.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            target.classList.add('active');
        });
    });

    // Quantity control
    const qtyBox = productHero.querySelector('.qty-box');
    if (qtyBox) {
        const minusBtn = qtyBox.querySelector('button:first-child');
        const qtyInput = qtyBox.querySelector('input');
        const plusBtn = qtyBox.querySelector('button:last-child');
        const min = parseInt(qtyInput.min || '1', 10);

        const setQty = (val) => {
            const safeVal = Math.max(min, Number.isNaN(val) ? min : val);
            qtyInput.value = safeVal;
        };

        plusBtn?.addEventListener('click', () => setQty(parseInt(qtyInput.value, 10) + 1));
        minusBtn?.addEventListener('click', () => setQty(parseInt(qtyInput.value, 10) - 1));
        qtyInput?.addEventListener('input', () => setQty(parseInt(qtyInput.value, 10)));
    }

    // Smooth scroll to tab content on click
    const tabLabels = document.querySelectorAll('#product-details-tabs label');
    const tabPanels = document.querySelector('#product-details-tabs .tab-panels');
    tabLabels.forEach(label => {
        label.addEventListener('click', () => {
            if (!tabPanels) return;
            setTimeout(() => {
                tabPanels.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 40);
        });
    });

    // Reveal-on-scroll animations for product sections
    const animatedBlocks = [
        ...document.querySelectorAll('#product-hero .col-lg-6'),
        ...document.querySelectorAll('#product-details-tabs .product-tabs'),
        ...document.querySelectorAll('#product-benefits .benefit-card'),
        ...document.querySelectorAll('#related-products .related-card')
    ];

    animatedBlocks.forEach(el => el.classList.add('animate-item'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedBlocks.forEach(el => revealObserver.observe(el));
})();