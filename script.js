let transactions = [];
const form = document.querySelector('.transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.querySelector('.transaction-list');
const balanceElement = document.getElementById('balance');
form.addEventListener('submit', addTransaction);
function addTransaction(event) {
  event.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const type = typeInput.value;
  if (description === '' || isNaN(amount)) {
    return;
  }
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
  };
  transactions.push(transaction);
  descriptionInput.value = '';
  amountInput.value = '';
  renderTransactions();
  updateBalance();
}
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  renderTransactions();
  updateBalance();
}
function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach(transaction => {
    const transactionElement = document.createElement('div');
    transactionElement.className = `transaction ${transaction.type}`;
    transactionElement.innerHTML = `
      <span class="description">${transaction.description}</span>
      <span class="amount">${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    transactionList.appendChild(transactionElement);
  });
}
function updateBalance() {
  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);
  balanceElement.textContent = `$${balance.toFixed(2)}`;
  balanceElement.classList.toggle('balance-positive', balance >= 0);
  balanceElement.classList.toggle('balance-negative', balance < 0);
}