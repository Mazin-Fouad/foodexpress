let names = [
  'Pizza Margherita',
  'Pizza Feinschmecker',
  'Pizza Salami',
  'Pizza Primavera',
];

let ingredients = [
  'mit Tomatensauce und Mozzarella',
  'mit Salami, Schinken und Champignons',
  'mit Salami und Champignons ',
  'mit Thunfisch und frischen Champignons',
];

let prices = [8.6, 9.5, 9.0, 7.5];

let basketFood = [];
let basketPrice = [];
let basketIngredient = [];
let basketAmount = [];

// Start render of favorite Pizza Section
function renderFavoritePizza() {
  showEmptyBasket();
  let container = document.getElementById('favorite-pizza');
  container.innerHTML = '';
  for (let i = 0; i < names.length; i++) {
    container.innerHTML += generateFavoritePizzaHTML(i);
  }
}

function generateFavoritePizzaHTML(index) {
  let pizza = names[index];
  let ingredient = ingredients[index];
  let price = prices[index];
  let formattedPrice = price.toFixed(2).replace('.', ',');

  return /*html*/ `
  <div class="menu-box">
      <h4>${pizza}</h4>
      <span class="note">${ingredient}</span>
      <span class="price">${formattedPrice} €</span>
      <img src="./icons/plus.png" class="add-icon" onclick="addFoodToBasket('${pizza}','${price}')">
  </div>`;
} 

function addFoodToBasket(names, price) {
  let index = basketFood.indexOf(names);
  if (index == -1) {
    // If basket ist empty, push: names, price, ingriedient, 1x
    basketFood.push(names);
    basketPrice.push(price);
    basketAmount.push(1);
  } else {
    // If the basket already contains item, push 1x more
    basketAmount[index]++;
  }
  showBasketWithItems();
  showOrderOverView();
}

function showBasketWithItems() {
  if (basketFood.length == 0) {
    showEmptyBasket();
  }
  if (basketFood.length > 0) {
    hideEmptyBasket();
    let basketContent = document.getElementById('order-view');
    basketContent.innerHTML = '';
    for (let j = 0; j < basketFood.length; j++) {
      basketContent.innerHTML += generateShowBasketHTML(j);
    }
  }
  finalSum();
}

function generateShowBasketHTML(j) {
  let sum = basketPrice[j] * basketAmount[j];
  return /*html*/ `
    <div class="menu-added-to-basket">
      <div class="food-amount">
        <h4>${basketAmount[j]}</h4>
        <h4>${basketFood[j]}</h4>
      </div>
     <h4>${sum.toFixed(2).replace('.', ',')} €</h4>
    </div>

    <div class="add-remove">
      <a href="#">Anmerkung Hinzufügen</a>
      <div>
        <img src="./icons/minus.png" onclick="removeOne(${j})">
        <img src="./icons/plus.png" onclick= "addOne(${j})">
       </div>
   </div> `;
}

function finalSum() {
  let sum = 0;
  for (let i = 0; i < basketFood.length; i++) {
    sum = basketPrice[i] * basketAmount[i];
  }
  let finalSum = sum + 4;
  generateFinalSumContainer(sum, finalSum);
}

function generateFinalSumContainer(sum, finalSum) {
  document.getElementById('final-sum-container').innerHTML = /*html*/ `
  <div class="sum">Zwischensumme
        <div>${sum.toFixed(2).replace('.', ',')} €
        </div>
    </div>
    <div class="delivery-costs">Lieferkosten
        <div>4,00 €</div>
    </div>
    <div class="final-sum">Gesamtsumme
        <div>${finalSum.toFixed(2).replace('.', ',')} €
        </div>
    </div>
    <div class="button"><button onclick="openPopUp()">Jetzt Bestellen ${finalSum
      .toFixed(2)
      .replace('.', ',')} €</button>
    </div>`;
}

function removeOne(i) {
  if (basketAmount[i] > 1) {
    basketAmount[i]--;
  } else {
    spliceFood(i);
    hideOrderOverView();
  }
  showBasketWithItems();
}

function spliceFood(i) {
  basketFood.splice(i, 1);
  basketPrice.splice(i, 1);
  basketAmount.splice(i, 1);
}

function addOne(i) {
  basketAmount[i]++;
  showBasketWithItems();
}

function showEmptyBasket() {
  document.getElementById('basket-info').classList.remove('d-none');
}

function hideEmptyBasket() {
  document.getElementById('basket-info').classList.add('d-none');
}

function showOrderOverView() {
  document.getElementById('order-view').classList.remove('d-none');
  document.getElementById('final-sum-container').classList.remove('d-none');
}

function hideOrderOverView() {
  document.getElementById('order-view').classList.add('d-none');
  document.getElementById('final-sum-container').classList.add('d-none');
}

function openPopUp() {
  document.getElementById('dialog').classList.remove('d-none');
}

function closePopUp() {
  document.getElementById('dialog').classList.add('d-none');
}
