async function getProducts(productsUrl) {
  const requestProducts = await fetch(productsUrl);
  const products = await requestProducts.json();
  return products;
}

function showProducts(products) {
  const dataId = localStorage["product-id"];
  const productContainer = document.querySelector(".product-page");
  for (const product of products) {
    if (product.id === dataId) {
      productContainer.innerHTML = ` <div class="product-picture">
            <img class="img-main" src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-text">
            <div class="product__info">
                <p class="product__availability"> ${product.availability}</p>
                <h4 class="product__name">${product.name}</h4>
                <p class="product__code">Product code ${product.code}</p>
                <p class="product__price">$${product.price}</p>
            </div>
            <hr>
            <div class="product__shopping">
                <form action="#" method="get">
                    <input type="number" min="1" max="10" name="product__quantity" required>
                    <button class="tabs__button tabs__button_big-blue " type="submit" data-id="${product.id}" ">Add to cart</button>
                </form>
            </div>
            <div class="product-description">
                <p class="product-description__title">DESCRIPTION</p>
                <div class="product-description__characteristics">
                    <p> ${product.description}</p>

                    <p class="product__specs">Specs:</p>

                    <p>Frequency response — 16Hz - 20kHz</p>
                    <p>Sensitivity — 100 DBSPL@1kHz</p>
                    <p>Battery life — 24 hours</p>
                    <p>Charging time — 2 hours</p>
                    <p>Wireless range — 35 m</p>
                </div>
            </div>
        </div>`;
    }
  }
}

async function loadAndRenderProduct() {
  const products = await getProducts("audio-products-list.json");
  showProducts(products);
}
loadAndRenderProduct();
