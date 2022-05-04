const tabs = (function () {
  let tabNavs = document.querySelectorAll(".tabs__name");
  let tabContent = document.querySelectorAll(".tabs__content");

  for (let i = 0; i < tabNavs.length; i++) {
    tabNavs[i].addEventListener("click", function (e) {
      e.preventDefault();
      let activeTabAttr = e.target.getAttribute("data-tab-name");

      for (let j = 0; j < tabNavs.length; j++) {
        let contentAttr = tabContent[j].getAttribute("data-tab-content");

        if (activeTabAttr === contentAttr) {
          tabNavs[j].classList.add("active");
          tabContent[j].classList.add("active");
        } else {
          tabNavs[j].classList.remove("active");
          tabContent[j].classList.remove("active");
        }
      }
    });
  }
})();

(function () {
  async function getProducts(productsUrl) {
    const requestProducts = await fetch(productsUrl);
    const products = await requestProducts.json();
    return products;
  }
  function showProductsTab(products) {
    let productContainerFeatured = document.querySelector("#featured");
    productContainerFeatured.innerHTML = "";
    let productContainerSale = document.querySelector("#sale");
    productContainerSale.innerHTML = "";
    let productContainerNew = document.querySelector("#new");
    productContainerNew.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === "featured") {
        let productContainer = document.querySelector("#featured");
        productContainer.innerHTML += `<article class="tabs__container">
                                <a class="tabs__image tabs__click sm" href="product-card.html"><img data-id="${
                                  products[i].id
                                }" src="${products[i].img}"
                                        alt="${products[i].name}"></a>
                                <a class="tabs__product-name tabs__click" href="product-card.html" data-id="${
                                  products[i].id
                                }">${products[i].name}</a>
                                <p>${products[i].currency || "USD"} ${
          products[i].convertedPrice || products[i].price.toFixed(2)
        }</p>
                                <form action="#" method="get">
                                    <button class="tabs__button" type="submit" data-id="${
                                      products[i].id
                                    }">Add to cart</button>
                                </form>
                            </article> `;
      }
      if (products[i].category === "sale") {
        let productContainerSale = document.querySelector("#sale");
        productContainerSale.innerHTML += `<article class="tabs__container">
                                <a class="tabs__image tabs__click sm" href="product-card.html"><img data-id="${
                                  products[i].id
                                }" src="${products[i].img}"
                                        alt="${products[i].name}"></a>
                                <a class="tabs__product-name tabs__click" href="product-card.html" data-id="${
                                  products[i].id
                                }">${products[i].name}</a>
                                <p>${products[i].currency || "USD"} ${
          products[i].convertedPrice || products[i].price.toFixed(2)
        }</p>
                                <form action="#" method="get">
                                    <button class="tabs__button" type="submit" data-id="${
                                      products[i].id
                                    }">Add to cart</button>
                                </form>
                            </article> `;
      }
      if (products[i].category === "new") {
        let productContainerNew = document.querySelector("#new");
        productContainerNew.innerHTML += `<article class="tabs__container">
                                <a class="tabs__image tabs__click sm" href="product-card.html"><img data-id="${
                                  products[i].id
                                }" src="${products[i].img}"
                                        alt="${products[i].name}"></a>
                                <a class="tabs__product-name tabs__click" href="product-card.html" data-id="${
                                  products[i].id
                                }">${products[i].name}</a>
                                <p>${products[i].currency || "USD"} ${
          products[i].convertedPrice || products[i].price.toFixed(2)
        }</p>
                                <form action="#" method="get">
                                    <button class="tabs__button" type="submit" data-id="${
                                      products[i].id
                                    }">Add to cart</button>
                                </form>
                            </article> `;
      }
    }
    const detailsBtn = document.querySelectorAll(".tabs__click");
    for (const btn of detailsBtn) {
      btn.addEventListener("click", showProductDetails);
    }

    function showProductDetails(ev) {
      const tabImage = ev.target;
      const productId = tabImage.dataset.id;
      localStorage["product-id"] = productId;
    }
  }

  async function loadAndRenderProduct() {
    const products = await getProducts("audio-products-list.json");
    showProductsTab(products);
  }
  loadAndRenderProduct();

  async function convertCurrency(ev) {
    const chooseCurrency = ev.target;
    const convertTo = chooseCurrency.dataset.value;
    const currencies = await getProducts(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const rate = currencies.rates[convertTo];
    const products = await getProducts("audio-products-list.json");
    for (const product of products) {
      product.convertedPrice = (product.price * rate).toFixed(2);
      product.currency = convertTo;
    }
    for (let j = 0; j < availableCurrencies.length; j++) {
      if (availableCurrencies[j].dataset.value === convertTo) {
        availableCurrencies[j].classList.add("active");
      } else {
        availableCurrencies[j].classList.remove("active");
      }
    }

    showProductsTab(products);
  }

  const availableCurrencies = document.querySelectorAll(".convert");
  for (const availableCurrency of availableCurrencies) {
    availableCurrency.addEventListener("click", convertCurrency);
  }
})();

// class ProductList {
//   constructor(cart) {
//     this.cart = cart;
//     this.productService = new ProductsService();
//     this.productService
//       .getProducts()
//       .then(() => this.showProductsTab())
//       .then(() => this.addEventListeners());
//     this.addEventListeners();
//   }
//   async getProducts() {
//     this.requestProducts = await fetch(productsUrl);
//     this.products = await requestProducts.json();

//     return this.products;
//   }

//   async showProductsTab() {
//     const products = await this.productService.getProducts();
//     for (let i = 0; i < products.length; i++) {
//       if (products[i].category === "featured") {
//         let productContainer = document.querySelector("#featured");
//         productContainer.innerHTML += `<article class="tabs__container">
//                                 <a class="tabs__image sm" href="#"><img data-id="${products[i].id}" src="${products[i].img}"
//                                         alt="${products[i].name}"></a>
//                                 <a class="tabs__product-name " href="">${products[i].name}</a>
//                                 <p>$${products[i].price}</p>
//                                 <form action="#" method="get">
//                                     <button class="tabs__button" type="submit" data-id="${products[i].id}">Add to cart</button>
//                                 </form>
//                             </article> `;
//       }
//       if (products[i].category === "sale") {
//         let productContainer = document.querySelector("#sale");
//         productContainer.innerHTML += `<article class="tabs__container">
//                                 <a class="tabs__image sm" data-id="${products[i].id} href="#"><img data-id="${products[i].id}" src="${products[i].img}"
//                                         alt="${products[i].name}"></a>
//                                 <a class="tabs__product-name " href="">${products[i].name}</a>
//                                 <p>$${products[i].price}</p>
//                                 <form action="#" method="get">
//                                     <button class="tabs__button" type="submit" data-id="${products[i].id}">Add to cart</button>
//                                 </form>
//                             </article> `;
//       }
//       if (products[i].category === "new") {
//         let productContainer = document.querySelector("#new");
//         productContainer.innerHTML += `<article class="tabs__container">
//                                 <a class="tabs__image sm" href="#"><img data-id="${products[i].id}" src="${products[i].img}"
//                                         alt="${products[i].name}"></a>
//                                 <a class="tabs__product-name " href="">${products[i].name}</a>
//                                 <p>$${products[i].price}</p>
//                                 <form action="#" method="get">
//                                     <button class="tabs__button" type="submit" data-id="${products[i].id}">Add to cart</button>
//                                 </form>
//                             </article> `;
//       }
//     }
//   }

//   async loadAndRenderProduct() {
//     const products = await getProducts("audio-products-list.json");
//     showProductsTab(products);
//   }

//   addEventListeners() {
//     document
//       .querySelectorAll(".tabs__button")
//       .forEach((button) =>
//         button.addEventListener("click", (event) =>
//           this.handleProductByClick(event)
//         )
//       );
//   }

//   handleProductByClick(event) {
//     const button = event.target;
//     const id = button.dataset.id;
//     this.cart.addProduct(id);
//   }
// }
