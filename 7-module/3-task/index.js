import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {
      steps: steps,
      value: value,
    };
    this.elem = this.render();
	 this.activeStepElement = null;
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
		 let sliderSteps = slider.querySelector('.slider__steps');
	for (let i = 0; i < this.config.steps; i++) {
		sliderSteps.insertAdjacentHTML('beforeend', '<span></span>')
	}

  //обработчик клик на slider
	slider.addEventListener('click', this.onSliderClick);
	return slider
  };

  onSliderClick = (event) => {
    let btn = event.currentTarget;
    // 0 - 0% ; 82.5 - 25% : 165 - 50% ; 247,5 - 75% ; 330 - 100%
    let left = event.clientX - btn.getBoundingClientRect().left;
	 let width = btn.offsetWidth;

	 let relativePosition = left / width;
	 if (relativePosition < 0) relativePosition = 0;
	 if (relativePosition > 1) relativePosition = 1;

	 let segments = this.config.steps - 1;
	 let approximateValue = relativePosition * segments;
	 let value = Math.round(approximateValue);

	 let percent = value / segments * 100;

	 this.sliderUpdate(`${percent}%`, value)
	 
	 this.elem.dispatchEvent(
     new CustomEvent("slider-change", {
       detail: this.config.value,
       bubbles: true,
     })
   );
  }

  sliderUpdate = (sliderProgress, value) => {
	let thumb = this.elem.querySelector(".slider__thumb");
   let progress = this.elem.querySelector(".slider__progress");
	let sliderValue = this.elem.querySelector(".slider__value");
	progress.style.width = sliderProgress;
	thumb.style.left = sliderProgress;
	sliderValue.textContent = value;

	if (this.activeStepElement) {
		this.activeStepElement.classList.remove("slider__step-active");
	}
	this.activeStepElement =
   this.elem.querySelector(".slider__steps").children[value];
	this.activeStepElement.classList.add("slider__step-active");
  }
}
