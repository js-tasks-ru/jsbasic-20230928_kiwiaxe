export default class Cart {
 	cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
   if (!product) return;
	let cartItem = this.cartItems.find(item => item.product == product);
	if (!cartItem) {
		cartItem = {product, count: 1};
		this.cartItems.push(cartItem);
	} else {
		cartItem.count++
	}

	console.log(this.cartItems)
	this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
	   let cartItemIndex = this.cartItems.findIndex(item => item.product.id == productId);
		if (cartItemIndex === -1) return;
		
		let cartItem = this.cartItems[cartItemIndex];
		cartItem.count += amount;
	if (cartItem.count == 0) {
		this.cartItems.splice(cartItemIndex, 1);
	}
   this.onProductUpdate(cartItem);
  }

  isEmpty() {
	   if (this.cartItems.length > 0) return false
		if (this.cartItems.length === 0) return true;
  }

  getTotalCount() {
	let totalCount = 0;
		this.cartItems.forEach(item => {totalCount += item.count});
		return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
	 this.cartItems.forEach(item => {
		totalPrice += item.product.price * item.count;
	 })
	 return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

