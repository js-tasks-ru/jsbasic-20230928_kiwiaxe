import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {
      steps: steps,
      value: value,
    };
    this.elem = this.render();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.stepsContainer = this.elem.querySelector(".slider__steps");
    this.activeStepElement = null;
    this.sliderUpdate();
    this.isDragging = false;
  }
  //отрисовка верстки
  render = () => {
    let slider = createElement(`
		 <div class="slider">

	 <!--Ползунок слайдера с активным значением-->
	 <div class="slider__thumb" style="left: 50%;">
		<span class="slider__value">2</span>
	 </div>

	 <!--Заполненная часть слайдера-->
	 <div class="slider__progress" style="width: 50%;"></div>

	 <!--Шаги слайдера-->
	 <div class="slider__steps"></div>
  </div>
		`);
    //написать столько span сколько steps
    let sliderSteps = slider.querySelector(".slider__steps");
    for (let i = 0; i < this.config.steps; i++) {
      sliderSteps.insertAdjacentHTML("beforeend", "<span></span>");
    }
    slider.addEventListener("click", this.onSliderClick);
    slider
      .querySelector(".slider__thumb")
      .addEventListener("pointerdown", this.onPointerDown);

    return slider;
  };

  onPointerDown = (event) => {
    event.preventDefault();
    this.isDragging = true;
    this.thumb.style.position = "relative";
    this.thumb.style.zIndex = 1000;
    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPointerUp);
  };

  onPointerMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let width = this.elem.offsetWidth;
    let relativePosition = left / width;
    if (relativePosition < 0) relativePosition = 0;
    if (relativePosition > 1) relativePosition = 1;

    const percent = relativePosition * 100;
    this.thumb.style.left = `${percent}%`;
    this.progress.style.width = `${percent}%`;

    const newValue = Math.round(relativePosition * (this.config.steps - 1));
    if (newValue !== this.config.value) {
      this.config.value = newValue;
      this.elem.querySelector(".slider__value").textContent = this.config.value;

      const steps = this.stepsContainer.querySelectorAll("span");
      steps.forEach((step) => step.classList.remove("slider__step-active"));
      steps[this.config.value].classList.add("slider__step-active");
    }
  };

  onPointerUp = () => {
    this.isDragging = false;
    this.thumb.style.position = "absolute";
    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);

    this.sliderUpdate();
     this.dispatchChangeEvent();
  };
  onSliderClick = (event) => {
    if (this.isDragging) return;
    let btn = event.currentTarget;
    // 0 - 0% ; 82.5 - 25% : 165 - 50% ; 247,5 - 75% ; 330 - 100%
    let left = event.clientX - btn.getBoundingClientRect().left;
    let width = btn.offsetWidth;

    let relativePosition = left / width;
    if (relativePosition < 0) relativePosition = 0;
    if (relativePosition > 1) relativePosition = 1;

    let segments = this.config.steps - 1;
    let approximateValue = relativePosition * segments;
   this.config.value = Math.round(approximateValue);

    let percent = (this.config.value / segments) * 100;

    this.sliderUpdate();

   this.dispatchChangeEvent();
  };

  sliderUpdate = (sliderProgress, value) => {
    const percent = (this.config.value / (this.config.steps - 1)) * 100;
    this.thumb.style.left = `${percent}%`;
    this.progress.style.width = `${percent}%`;
    this.elem.querySelector(".slider__value").textContent = this.config.value;

    const steps = this.stepsContainer.querySelectorAll("span");
    steps.forEach((step) => step.classList.remove("slider__step-active"));
    steps[this.config.value].classList.add("slider__step-active");
  };

  dispatchChangeEvent() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.config.value,
        bubbles: true,
      })
    );
  }
}

