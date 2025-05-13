import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
	 this.elem = this.render(this.products);
	 this.filters = {
     noNuts: false, // true/false
     vegeterianOnly: false, // true/false
     maxSpiciness: 4, // числа от 0 до 4
     category: "", // уникальный идентификатор категории товара
   };
  }

  render = products => {
		let productsGrid = createElement(`
			<div class="products-grid">
 				 <div class="products-grid__inner"></div>
			</div>
		`);
		this.productsGridInner = productsGrid.querySelector(".products-grid__inner");
		this.renderProducts(products);
		return productsGrid;
  }

  renderProducts = products => {
	this.productsGridInner.innerHTML = '';
	for (let product in products) {
		this.productsGridInner.insertAdjacentElement(
      "beforeend",
      new ProductCard(products[product]).elem
    );
	}
  }


  updateFilter = newFilters => {
	for (let key in newFilters) {
		if (this.filters.hasOwnProperty(key)) {
			this.filters[key] = newFilters[key];
		}
	}
	this.refreshProducts();
  }

  refreshProducts = () => {
	let filteredProducts = this.products.filter(product => {
		if (this.filters.noNuts && product.nuts) return false;
		if (this.filters.vegeterianOnly && !product.vegeterian) return false;
		if (this.filters.maxSpiciness < product.spiciness) return false;
		if (this.filters.category && product.category !== this.filters.category)
      return false;

		return true;
	})

	this.renderProducts(filteredProducts);

  }

}
