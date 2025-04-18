let total = 0;
let prdIdCount = 0;
const products = [];

function calPrice(data) {
const prices = {
origin: { brazil: 10, kenya: 15, colombia: 20, ethiopia: 5 },
weight: { quarter: 250, half: 450, kilo: 850 },
grind: { coarse: 25, exCoarse: 35, fine: 20, exFine: 15 },
};
return prices.origin[data.origin] + prices.weight[data.weight] + prices.grind[data.grind];
}

function changeStyle(show) {
const box = document.getElementById("target");
if (show) {
box.classList.remove("hidden");
box.classList.add("shown");
} else {
box.classList.remove("shown");
box.classList.add("hidden");
}
}

function addProduct() {
const form = document.querySelector('#formTemp');
const origin = form.querySelector('.origin').value;
const weight = form.querySelector('.weight').value;
const grind = form.querySelector('.grind').value;

const selectedData = { origin, weight, grind };
const price = calPrice(selectedData);
const id = prdIdCount++;

products.push({ id, selectedData, price })
renderProduct(id, selectedData, price);
updateTotal();
changeStyle(true);
}

function renderProduct(id, data, price) {
const div = document.createElement("div");
div.className = "prdItem";
div.id = `prd-${id}`;
div.innerHTML = `
<span>Your Order : <br>Product : ${data.origin} 
<br> Grind : ${data.grind} 
<br> Size : ${data.weight}
<br> Price : ${price}</span>
<br>
<button onclick="editPrd(${id})" style="align-items: center;
text-decoration: none;
color: white;
background-color: blue;
border-radius: 20px;
width: 60px;
text-align: center;
pointer-events: visible;
height: 20px;">Edit</button>
<button onclick="removePrd(${id})" style="align-items: center;
text-decoration: none;
color: white;
background-color: red;
border-radius: 20px;
width: 80px;
text-align: center;
pointer-events: visible;
height: 20px;">Remove</button>
`;
document.getElementById("prdList").appendChild(div);
}

function updateTotal() {
total = products.reduce((sum, p) => sum + p.price, 0);
document.getElementById("total").textContent = `Total Price : ${total} EGP`;
}

function removePrd(id) {
const index = products.findIndex(p => p.id === id);
if (index !== -1) {
products.splice(index, 1);
document.getElementById(`prd-${id}`).remove();
updateTotal();
}
if (products.length === 0) {
changeStyle(false);
}
}

function editPrd(id) {
const prd = products.find(p => p.id === id);
if (!prd) return;

const form = document.querySelector(`#formTemp`);
form.querySelector(`.origin`).value = prd.data.origin;
form.querySelector(`.grind`).value = prd.data.grind;
form.querySelector(`.weight`).value = prd.data.weight;

const addBtn = document.querySelector("button[onclick='addProduct()']");
addBtn.textContent = "Update Order";
addBtn.setAttribute("onclick", `updatePrd(${id})`);
}

function updatePrd(id) {
const prd = products.find(p => p.id === id);
if (!prd) return;

const form = document.querySelector('#formTemp');
prd.data.origin = form.querySelector('.origin').value;
prd.data.grind = form.querySelector(`.grind`).value;
prd.data.weight = form.querySelector(`.weight`).value;
prd.price = calPrice(prd.data);

const prdDiv = document.getElementById(`prd-${id}`);
prdDiv.innerHTML = `
<span>Your Order : Product ${prd.data.origin} 
| grind : ${prd.data.grind} 
| Size : ${prd.data.weight}
| price : ${prd.price}</span>
<br>
<button onclick="editPrd(${id})">Edit</button>
<button onclick="removePrd(${id})">Remove</button>
`;

updateTotal();

const addBtn = document.querySelector("button[onclick^='updatePrd']");
addBtn.textContent = "Add Product";
addBtn.setAttribute("onclick", "addProduct()");
}
