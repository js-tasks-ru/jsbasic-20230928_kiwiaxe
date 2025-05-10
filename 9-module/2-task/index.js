import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
	this.carousel;
	this.ribbonMenu;
	this.stepSlider;
	this.cartIcon;
	this.cart;
	this.productsGrid;

	this.products;

	this.addEventListener();
  }

  async render() {
    this.carousel = new Carousel(slides);
	 document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

	 this.ribbonMenu = new RibbonMenu(categories);
	 document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);

	 this.stepSlider = new StepSlider({steps: 5, value: 3});
	 document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

	this.cartIcon = new CartIcon();
	document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);

	this.cart = new Cart(this.cartIcon);

	let response = await fetch('products.json');
	this.products = await response.json();

	this.productsGrid = new ProductsGrid(this.products);
	document.querySelector("[data-products-grid-holder]").append(this.productsGrid.elem);

	this.productsGrid.updateFilter({
		noNuts: document.getElementById('nuts-checkbox').checked,
		vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
		maxSpiciness: this.stepSlider.value,
		category: this.ribbonMenu.value,
	}); 
  }

  addEventListener() {
	document.body.addEventListener('product-add', event => {
	let product = event.target.closest('.card-product');
	let productId = event.detail;
	let productToAdd = this.products.find((product) => product.id === productId);
	this.cart.addProduct(productToAdd)
	});

	document
    .querySelector("[data-slider-holder]")
    .addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

	document.querySelector("[data-ribbon-holder]").addEventListener('ribbon-select', event => {
		this.productsGrid.updateFilter({
			category: event.detail,
		})
	});

	document
		.getElementById("nuts-checkbox")
		.addEventListener('change', (event) => {
		this.productsGrid.updateFilter({
      noNuts: event.target.checked,
    });
	})

	document
    .getElementById("vegeterian-checkbox")
    .addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
       vegeterianOnly: event.target.checked,
      });
    });
  }
}
