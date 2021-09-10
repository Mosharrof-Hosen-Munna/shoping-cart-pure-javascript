const products = [
  {
    id: 46134678344545,
    name: "Samsung Galaxy M02s",
    price: 10000,
    img: "https://static-01.daraz.com.bd/p/mdc/1887e7da2a4a8b2bf9faec0469782c38.jpg",
  },
  {
    id: 6414667896545,
    name: "MI note 10",
    price: 9000,
    img: "https://static-01.daraz.com.bd/p/mdc/88926bb91e0148914a509d25169ac1df.jpg",
  },
  {
    id: 4697464534545,
    name: "Infinix hot 10",
    price: 18000,
    img: "https://static-01.daraz.com.bd/p/mdc/df018c4086e51ae78760cc4cd3b468b8.jpg",
  },
  {
    id: 46433424154315,
    name: "Samsung Galaxy M02s",
    price: 14000,
    img: "https://static-01.daraz.com.bd/p/767586c589d2f6f396344cf886fe0e7a.jpg",
  },

  {
    id: 4611111346545,
    name: "oppo f1",
    price: 13500,
    img: "https://static-01.daraz.com.bd/p/mdc/1887e7da2a4a8b2bf9faec0469782c38.jpg",
  },
  {
    id: 641411166545,
    name: "Realme C21",
    price: 19000,
    img: "https://static-01.daraz.com.bd/p/mdc/88926bb91e0148914a509d25169ac1df.jpg",
  },
  {
    id: 4697478346545,
    name: "Infinix note 8i",
    price: 12999,
    img: "https://static-01.daraz.com.bd/p/mdc/df018c4086e51ae78760cc4cd3b468b8.jpg",
  },
  {
    id: 46431364554315,
    name: "Infinix hot 8",
    price: 16500,
    img: "https://static-01.daraz.com.bd/p/767586c589d2f6f396344cf886fe0e7a.jpg",
  },
];

const showAllProducts = (products) => {
  const productsContainer = document.getElementById("all-products");
  productsContainer.textContent = "";
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
// add search functionalities

const searchProducts = () => {
  const searchField = document.getElementById("search-input");
  const searchProduct = products.filter((product) =>
    product.name.toLowerCase().includes(searchField.value.toLowerCase())
  );
  showAllProducts(searchProduct);
};

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
    newProduct.totalPrice = newProduct.quantity * newProduct.price;

    const setProducts = {
      products: newAllProduct,
    };

    const stringifyProducts = JSON.stringify(setProducts);
    localStorage.setItem("cart-items", stringifyProducts);
  } else {
    const product = products.find((p) => p.id === id);
    product.quantity = 1;
    product.totalPrice = product.quantity * product.price;
    localStorageItems.products.push(product);

    const stringifyProducts = JSON.stringify(localStorageItems);
    localStorage.setItem("cart-items", stringifyProducts);
  }
  displayProductInCart();
  updateProductQuantity();
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
showAllProducts(products);

// Update total product quantity

const updateProductQuantity = () => {
  const productItems = getCartItem().products;
  const totalQuantityDiv = document.getElementById("total-cart-item");

  let totalQuantityNumber = 0;
  productItems.forEach((product) => (totalQuantityNumber += product.quantity));
  console.log(totalQuantityNumber);
  totalQuantityDiv.innerText = totalQuantityNumber;
};
updateProductQuantity();

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
      totalPrice += product.totalPrice;
      cartContainer.appendChild(displayCartHTML(product));
    });
    totalPriceDiv.innerHTML = totalPrice;
  }
};
displayProductInCart();

const increaseQuantity = (id) => {
  changeQuantity(id, true);
};

const decreaseQuantity = (id) => {
  changeQuantity(id, false);
};

const changeQuantity = (id, isIncrease) => {
  const productItems = getCartItem();
  const changeItem = productItems.products.find((product) => product.id === id);
  if (changeItem) {
    if (isIncrease) {
      changeItem.quantity += 1;
    } else if (!isIncrease && changeItem.quantity > 0) {
      changeItem.quantity -= 1;
    }
  }
  changeItem.totalPrice = changeItem.price * changeItem.quantity;
  const setProductItems = {
    products: [...productItems.products],
  };
  localStorage.setItem("cart-items", JSON.stringify(setProductItems));
  displayProductInCart();
  updateProductQuantity();
};

function displayCartHTML(product) {
  const { img, quantity, totalPrice, name, id } = product;
  const div = document.createElement("div");
  div.classList.add("row", "align-items-center", "mb-2");
  div.innerHTML = `
                              <div class="col-2">
                                   <img class="w-100"
                                        src="${img}"
                                        alt="">
                              </div>
                              <div class="col-4"><small>${name}</small></div>
                              <div class="col-3">$<span>${totalPrice}</span></div>
                              <div class="col-3">
                                   <div class="btn-group" role="group" aria-label="Basic example">
                                        <button onclick="decreaseQuantity(${id})" type="button" class="btn btn-secondary btn-sm">-</button>
                                        <button type="button" disabled class="btn btn-secondary btn-sm">${quantity}</button>
                                        <button onclick="increaseQuantity(${id})" type="button" class="btn btn-secondary btn-sm">+</button>
                                   </div>
                              </div>
                         
  `;
  return div;
}
const deleteCartItems = () => {
  const cartItems = getCartItem().products;

  const alertModal = document.getElementById("alert-modal");
  alertModal.textContent = "";
  const message = {};

  if (cartItems.length > 0) {
    localStorage.removeItem("cart-items");
    message.title = "Hurrah!";
    message.type = "success";
    alertModal.appendChild(modalHTML(message));
  } else {
    message.title = "Opps!";
    message.type = "fail";
    alertModal.appendChild(modalHTML(message));
  }
  displayProductInCart();
  updateProductQuantity();
};

// handle modal alert

const modalHTML = (alertMessage) => {
  const { title, type } = alertMessage;
  const div = document.createElement("div");
  div.classList.add("modal-dialog");
  div.innerHTML = `
   <div class="modal-content">
                              <div class="modal-header">
                                   <h5 class="modal-title text-center" id="exampleModalLabel">${title}</h5>
                                   <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                   <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                  </symbol>
                                  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                  </symbol>
                                </svg>

                                <div class="alert alert-${
                                  type === "success" ? "primary" : "danger"
                                } d-flex align-items-center" role="alert">
                                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#${
                                    type === "success"
                                      ? "check-circle-fill"
                                      : "info-fill"
                                  }"/></svg>
                                  <div>
                                    ${
                                      type === "success"
                                        ? "Congratulations! Successfully placed your order! Thanks."
                                        : "Sorry! You Have No Items In Cart! Please Add Some product. Thanks."
                                    }
                                  </div>
                                </div>
                              <div class="modal-footer">
                                   
                                   <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Okay</button>
                              </div>
                         </div>
  `;
  return div;
};
