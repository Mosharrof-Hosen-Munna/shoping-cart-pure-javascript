const products = [
  {
    id: 461346545,
    name: "Samsung Galaxy M02s",
    price: 10000,
    img: "https://static-01.daraz.com.bd/p/mdc/1887e7da2a4a8b2bf9faec0469782c38.jpg",
  },
  {
    id: 641466545,
    name: "MI note 10",
    price: 9000,
    img: "https://static-01.daraz.com.bd/p/mdc/88926bb91e0148914a509d25169ac1df.jpg",
  },
  {
    id: 469746545,
    name: "Infinix hot 10",
    price: 18000,
    img: "https://static-01.daraz.com.bd/p/mdc/df018c4086e51ae78760cc4cd3b468b8.jpg",
  },
  {
    id: 4643154315,
    name: "Samsung Galaxy M02s",
    price: 14000,
    img: "https://static-01.daraz.com.bd/p/767586c589d2f6f396344cf886fe0e7a.jpg",
  },
];

const showAllProducts = () => {
  const productsContainer = document.getElementById("all-products");
  products.forEach((product) => {
    const singleProduct = generateProductHtml(product);
    productsContainer.appendChild(singleProduct);
  });
};

/* {
    name: "Samsung Galaxy M02s",
    price: 10000,
    img: "https://static-01.daraz.com.bd/p/mdc/1887e7da2a4a8b2bf9faec0469782c38.jpg",
  }, */
function generateProductHtml(product) {
  const { name, price, img, id } = product;
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
          
            <div class="card">
                <img src="${img}"
                      class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                      <p class="card-text">${name}</p>
                      <p class="card-text">$${price}</p>
                      <button onclick="addToCartItem(${id})" class="btn btn-primary">Add to cart</button>
                </div>
            </div>
   `;
  return div;
}

const addToCartItem = (id) => {
  const localStorageItems = getCartItem();

  // search localStorage product item for checking already has this product in local
  const isLocalStorageProduct = localStorageItems.products.find(
    (p) => p.id === id
  );

  if (isLocalStorageProduct) {
    const newAllProduct = [...localStorageItems.products];

    const newProduct = newAllProduct.find((p) => p.id === id);

    newProduct.quantity += 1;
    newProduct.price *= newProduct.quantity;
    const setProducts = {
      products: newAllProduct,
    };

    const stringifyProducts = JSON.stringify(setProducts);
    localStorage.setItem("cart-items", stringifyProducts);
  } else {
    const product = products.find((p) => p.id === id);
    product.quantity = 1;
    localStorageItems.products.push(product);

    const stringifyProducts = JSON.stringify(localStorageItems);
    localStorage.setItem("cart-items", stringifyProducts);
  }
  displayProductInCart();
};

const getCartItem = () => {
  const cartItemSearch = localStorage.getItem("cart-items");
  let cartItems;
  if (cartItemSearch) {
    cartItems = JSON.parse(cartItemSearch);
  } else {
    cartItems = { products: [] };
  }
  return cartItems;
};

// display all products function here call
showAllProducts();

// display cart items in carts
const displayProductInCart = () => {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceDiv = document.getElementById("total-price");
  let totalPrice = 0;

  cartContainer.textContent = "";
  const localStorageProducts = JSON.parse(localStorage.getItem("cart-items"));
  console.log(localStorageProducts);
  if (localStorageProducts) {
    localStorageProducts.products.forEach((product) => {
      totalPrice += product.price;
      cartContainer.appendChild(displayCartHTML(product));
    });
  }
  totalPriceDiv.innerHTML = totalPrice;
};

function displayCartHTML(product) {
  const { img, quantity, price, name } = product;
  const div = document.createElement("div");
  div.classList.add("row", "align-items-center", "mb-2");
  div.innerHTML = `
                              <div class="col-2">
                                   <img class="w-100"
                                        src="${img}"
                                        alt="">
                              </div>
                              <div class="col-4"><small>${name}</small></div>
                              <div class="col-3">$<span>${price}</span></div>
                              <div class="col-3">
                                   <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-secondary btn-sm">-</button>
                                        <button type="button" disabled class="btn btn-secondary btn-sm">${quantity}</button>
                                        <button type="button" class="btn btn-secondary btn-sm">+</button>
                                   </div>
                              </div>
                         
  `;
  return div;
}
displayProductInCart();
