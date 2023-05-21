
window.addEventListener('DOMContentLoaded', function () {
    // register accordion animation
    registerAccordion()
})
window.addEventListener('scroll', function () {
    // Handle Feature Section Scroll Animation
    handleFeaturesSection();
    // Handle Header Input Scroll Animation
    handleHeaderInputTransition()
    // Handle Welcome Kit Section Scroll Animation
    handleWelcomeKitTransition()
})


function registerAccordion() {
    let accHeading = null;
    let accPanel = null;
    accHeading = document.querySelectorAll(".sp-accordion-title-wrapper:not(.ignore)");
    accPanel = document.querySelectorAll(".sp-accordion-content-wrapper:not(.ignore)");
    for (let i = 0; i < accHeading.length; i++) {
        // Execute whenever an accordion is clicked 
        accHeading[i].onclick = function () {
            if (this.nextElementSibling.style.maxHeight) {
                hidePanels();     // Hide All open Panels 
            } else {
                showPanel(this);  // Show the panel
            }
        };
    }
    // Function to Show a Panel
    function showPanel(elem) {
        hidePanels();
        elem.classList.add("active");
        elem.nextElementSibling.style.overflow = 'visible';
        elem.nextElementSibling.style.maxHeight = elem.nextElementSibling.scrollHeight + "px";
        setTimeout(() => {
            elem.nextElementSibling.style.opacity = '1';
        }, 100)
    }
    // Function to Hide all shown Panels
    function hidePanels() {
        for (let i = 0; i < accPanel.length; i++) {
            accPanel[i].style.maxHeight = null;
            accPanel[i].style.opacity = '0';
            accHeading[i].classList.remove("active");
            accPanel[i].style.overflow = 'hidden';
        }
    }
    document.querySelector('.sp-faq-load-more').addEventListener('click', handleFaqsSection)
}

function handleFaqsSection() {
    const SHOW_PER_VIEW = 5;
    const allHiddenFaqs = document.querySelectorAll('.sp-accordion-with-image:not(.loaded)')
    for (let i = 0; i < allHiddenFaqs.length; i++) {
        console.log(allHiddenFaqs[i]);
        if (i === allHiddenFaqs.length - 1) {
            document.querySelector('.sp-faq-load-more').style.display = 'none';
        }
        if (i > SHOW_PER_VIEW) {
            return
        }
        allHiddenFaqs[i].classList.add('loaded')
    }
}


function handleHeaderInputTransition() {
    if (window.pageYOffset > window.innerHeight) {
        document.querySelector('.sp-apply-form-header-wrapper').classList.remove('input-hidden')
    } else {
        document.querySelector('.sp-apply-form-header-wrapper').classList.add('input-hidden')
    }
}
function handleFeaturesSection() {
    let rotateCards = false;
    const featuresSectionTop = document.querySelector('.sparko-features-section').offsetTop;
    const allFeatureSections = document.querySelectorAll('.sparko-features-section .sparko-gradient-section');
    const currentScrollPosition = window.pageYOffset;
    let activeIndex = 0;
    if (window.pageYOffset > (featuresSectionTop + window.innerHeight)) {
        activeIndex = 1;
        if (window.pageYOffset > (featuresSectionTop + window.innerHeight + window.innerHeight)) {
            activeIndex = 2;
            if (window.pageYOffset > (featuresSectionTop + window.innerHeight + window.innerHeight + window.innerHeight)) { activeIndex = 3; }
            if (window.pageYOffset > (featuresSectionTop + (window.innerHeight * 4))) {
                activeIndex = 4;
                rotateCards = true;
            }
        }
    }
    document.querySelector('.sparko-gradient-section.active').classList.remove('active')
    allFeatureSections[activeIndex].classList.add('active');
    if (rotateCards) {
        document.querySelector('.sp-dual-image-bottom').classList.add('transitioned');
        document.querySelector('.sp-dual-image-top').classList.add('transitioned');
    } else {
        document.querySelector('.sp-dual-image-bottom').classList.remove('transitioned');
        document.querySelector('.sp-dual-image-top').classList.remove('transitioned');
    }
}