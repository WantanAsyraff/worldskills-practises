let slideIndex = 0;

function iterateSlide(){
    let slides = document.getElementsByClassName("slide");

    // Hide slide
    for (let i=0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }


    // Move to next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    // Autoplay next slide every 3 seconds
    setTimeout(iterateSlide, 3000);
}


window.onload = function() {
    iterateSlide();
}