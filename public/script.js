const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
// const dummyTransactions = [
// {id: 1, text: "Flower", amount: -20},
// {id: 2, text: 'Waffles', amount: -110},
// {id: 3, text: 'Salary', amount: 400},
// {id: 4, text: 'camera', amount: -68}
// ];
// console.log(dummyTransactions)
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
e.preventDefault();

if(text.value.trim() === '' || amount.value.trim() === '') {
  alert('Please add a text and amount');
} else {
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };
  transactions.push(transaction);
  addTransactionDom(transaction);
  updateValues();
  updateLocalStorage();
  text.value = '';
  amount.value = '';

  console.log(transaction);
}

}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// add trans to dom list
function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}



function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1 ).toFixed(2);
  // console.log(expense);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDom);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
