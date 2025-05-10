function initCarousel() {
   let carouselInner = document.querySelector(".carousel__inner");
   let widthElementOfCarousel = carouselInner.firstElementChild.offsetWidth;
   let carousel = document.querySelector('.carousel');
	
	let carouselLength = carouselInner.children.length;
	let currentPosition = 0;
	let currentSlide = 1;

	let btnLeft = document.querySelector(".carousel__arrow_left");
   let btnRight = document.querySelector(".carousel__arrow_right");

	let updateButtons = () => {
	btnLeft.style.display = currentSlide === 1 ? "none" : "";
   btnRight.style.display = currentSlide === carouselLength ? "none" : "";
   };

   btnLeft.style.display = "none";

	carousel.addEventListener('click', event => {
		let btn = event.target.closest(".carousel__arrow");

		if (!btn) return;

		if (
      btn.classList.contains( "carousel__arrow_right") && currentSlide < carouselLength ) {
      currentPosition -= widthElementOfCarousel;
      currentSlide++;
    } else if ( btn.classList.contains("carousel__arrow_left") && currentSlide > 1 ) {
      currentPosition += widthElementOfCarousel;
      currentSlide--;
    };

	 carouselInner.style.transform = `translateX(${currentPosition}px)`;
	 updateButtons();
	}
	);

}