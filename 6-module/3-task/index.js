import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
	 this.currentPosition = 0;
    this.currentSlide = 1;
  }

  render() {
    let element = createElement(`
	<div class="carousel">
    	<!--Кнопки переключения-->
    	<div class="carousel__arrow carousel__arrow_right">
     	 <img src="/assets/images/icons/angle-icon.svg" alt="icon">
   	 </div>
    	<div class="carousel__arrow carousel__arrow_left">
     	 <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    	</div>

	 	<div class="carousel__inner"></div>
		`);

    this.slides.map(({ name, price, image, id }) => {
      element.querySelector(".carousel__inner").insertAdjacentHTML(
        "beforeend",
        `<div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`
      );
    });

	 element.querySelector(".carousel__arrow_left").style.display = "none";

    element.addEventListener("click", this.onClick);

    return element;
  }

  onClick = (event) => {

	let btnAdd = event.target.closest('.carousel__button');

	if (btnAdd) {
		let id = btnAdd.closest(".carousel__slide").dataset.id;
		let productAddEvent = new CustomEvent("product-add", {
  			detail: id,
   		bubbles: true,
   	});

   	this.elem.dispatchEvent(productAddEvent);

		}

		let carouselInner = this.elem.querySelector('.carousel__inner')
    	let widthElementOfCarousel = carouselInner.firstElementChild.offsetWidth;
    	let carouselLength = carouselInner.children.length;
		let carousel = this.elem.querySelector(".carousel");

    	let btnLeft = this.elem.querySelector(".carousel__arrow_left");
   	let btnRight = this.elem.querySelector(".carousel__arrow_right");

		let updateButtons = () => {
      btnLeft.style.display = this.currentSlide === 1 ? "none" : "";
      btnRight.style.display = this.currentSlide === carouselLength ? "none" : "";
      };

		let btn = event.target.closest(".carousel__arrow");

		if (!btn) return;

		if (
      btn.classList.contains("carousel__arrow_right") &&
      this.currentSlide < carouselLength
    ) {
      this.currentPosition -= widthElementOfCarousel;
      this.currentSlide++;
    } else if (
      btn.classList.contains("carousel__arrow_left") &&
      this.currentSlide > 1
    ) {
      this.currentPosition += widthElementOfCarousel;
      this.currentSlide--;
    }

    carouselInner.style.transform = `translateX(${this.currentPosition}px)`;
    updateButtons();
  };
}
