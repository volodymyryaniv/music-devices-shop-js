const openLinks = document.querySelectorAll(".open-cart"),
  closeLinks = document.querySelectorAll(".close-cart"),
  body = document.querySelector("body"),
  modalCart = document.querySelector(".modal-cart"),
  addPadding = document.querySelectorAll(".add-padding");

const timeout = 700;
function openCart() {
  for (i = 0; i < openLinks.length; i++) {
    openLinks[i].addEventListener("click", function (e) {
      modalCart.classList.add("open");
      document.querySelector(".cart-link").classList.add("hidden");
      lockBodyScroll();
      e.preventDefault();
    });
  }
}
openCart();

function closeCart() {
  for (i = 0; i < closeLinks.length; i++) {
    closeLinks[i].addEventListener("click", function (e) {
      modalCart.classList.remove("open");
      document.querySelector(".cart-link").classList.remove("hidden");
      unlockBodyScroll();
      e.preventDefault();
    });
  }
  modalCart.addEventListener("click", function (e) {
    if (!e.target.closest(".modal-cart__content")) {
      modalCart.classList.remove("open");
      document.querySelector(".cart-link").classList.remove("hidden");
      unlockBodyScroll();
    }
  });
}
closeCart();

function lockBodyScroll() {
  const lockPadding =
    window.innerWidth - document.querySelector("body").offsetWidth + "px";
  body.style.paddingRight = lockPadding;
  body.classList.add("lock");
  // if (addPadding.length > 0) {
  //   for (let j = 0; j < addPadding.length; j++) {
  //     addPadding[j].style.paddingRight = lockPadding;
  //   }
  // }
}
function unlockBodyScroll() {
  const lockPadding = 0;
  body.style.paddingRight = lockPadding;
  body.classList.remove("lock");
}

//cart

class Cart {
  constructor() {
    this.productService = new ProductsService();
    this.cartContainer = document.querySelector("#modal-cart");
    this.cart = JSON.parse(localStorage["cart"] || "{}");
    //  this.addEventListeners();
    this.updateBadge();
  }

  //   addEventListeners() {
  //     this.cartContainer
  //       .querySelector(".modal-cart__order")
  //       .addEventListener("click", (ev) => this.order(ev));
  //   }
  saveCart() {
    localStorage["cart"] = JSON.stringify(this.cart);
  }
  async renderCart() {
    let total = 0;
    let cartDomSting = "";
    for (const id in this.cart) {
      const product = await this.productService.getProductById(id);
      total += product.price * this.cart[id];
      cartDomSting += ` <article class="modal-cart-product" data-id="${id}">
                        <img src="${product.img}" alt="">
                        <p class="modal-cart-product__name">${product.name}</p>
                        <form action="#" method="GET">
                            <input class="modal-cart-product__quantity" type="number" min="1" max="100"
                                value="quantity">
                        </form>
                        <p class="modal-cart-product__price">$${product.price}</p>
                        <button class="modal-cart-product__remove">x</button>
                    </article>`;
    }
    cartDomSting += `<p class="modal-cart-product__total-price">Total price:</p>`;
    this.cartContainer.querySelector(
      ".modal-cart__product-container"
    ).innerHTML = cartDomSting;
  }

  addProduct(id) {
    this.cart[id] = (this.cart[id] || 0) + 1;
    this.saveCart();
    this.updateBadge();
  }
  deleteProducts(id) {
    if (this.cart[id] > 1) {
      this.cart[id] -= 1;
    } else {
      delete this.cart[id];
    }
    this.saveCart();
    this.updateBadge();
  }
  async updateBadge() {
    const { count, cost } = await this.cartLengthandCost();
    document.querySelector("#cart-badge").innerText = `${count} $${cost.toFixed(
      2
    )}`;
  }

  async cartLengthandCost() {
    let count = 0;
    let cost = 0;
    for (const key in this.cart) {
      const product = await this.productService.getProductById(key);
      const quantity = this.cart[key];
      count += quantity;
      cost += quantity * product.price;
    }
    return { count, cost };
  }
}
