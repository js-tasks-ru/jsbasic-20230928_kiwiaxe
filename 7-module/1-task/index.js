import createElement from '../../assets/lib/create-element.js';		

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
	 this.ribbonInner = this.elem.querySelector('.ribbon__inner');
	 this.initScroll();
	 this.selectedCategory = null;
  }
  render = () => {
	let ribbon = createElement(`
		<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
	`);

	let ribbonInner = ribbon.querySelector('.ribbon__inner');
	this.categories.map(({id, name}) => {
		ribbonInner.insertAdjacentHTML('beforeend', `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`);
	});

	ribbon.addEventListener('click', this.onClick);

	return ribbon;
  }

  onClick = (event) => {
	let btn = event.target.closest('.ribbon__arrow');
	let categoryElem = event.target.closest('.ribbon__item');

	if (btn) {
		event.preventDefault();
		this.scrollRibbon(btn);
	} else if (categoryElem) {
		event.preventDefault();
		this.selectCategory(categoryElem);
	}
  }

  scrollRibbon = (btn) => {
	if (btn.classList.contains('ribbon__arrow_right')) {
		this.ribbonInner.scrollBy(350, 0)
	} else {
		this.ribbonInner.scrollBy(-350, 0)
	}
	setTimeout(() => this.buttonUpdate(), 100);
  }

  selectCategory = (categoryElem) => {
	if (this.selectedCategory) {
		this.selectedCategory.classList.remove('ribbon__item_active')
	}

	this.selectedCategory = categoryElem;
	categoryElem.classList.add('ribbon__item_active')

	this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: categoryElem.dataset.id,
      bubbles: true
    }));
  }

  buttonUpdate = () => {
	let scrollLeft = this.ribbonInner.scrollLeft;
	let scrollRight = this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth

	let leftArrow = this.elem.querySelector('.ribbon__arrow_left');
   let rightArrow = this.elem.querySelector('.ribbon__arrow_right');

	if (scrollLeft > 0 ) {
		leftArrow.classList.add('ribbon__arrow_visible')
	} else {
		leftArrow.classList.remove("ribbon__arrow_visible");
	}
	if (scrollRight > 1) {
		rightArrow.classList.add('ribbon__arrow_visible')
	} else {
		rightArrow.classList.remove("ribbon__arrow_visible");
	}
  }

  initScroll = () => {
	this.ribbonInner.scrollLeft = 0;
   this.ribbonInner.addEventListener("scroll", this.buttonUpdate);
	setTimeout(() => this.buttonUpdate(), 50);
  }
}

