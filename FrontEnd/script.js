const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense'); const historyListElement = document.getElementById('historyList');
const textElement = document.getElementById('text');
const amountElement = document.getElementById('amount');
const expensesRouter = require('./routes/expenses');
app.use(expensesRouter);

let balance = 0;
let income = 0;
let expense = 0;
const transactions = [];

function updateBalance() {
    balance = income - expense;
    balanceElement.innerText = `$${balance.toFixed(2)}`;
    incomeElement.innerText = `$${income.toFixed(2)}`;
    expenseElement.innerText = `$${expense.toFixed(2)}`;
}
function addTransaction() {
    const text = textElement.value;
    const amount = parseFloat(amountElement.value);

    // Validate input
    if (text.trim() === '' || isNaN(amount)) {
        alert('Please enter valid text and amount.');
        return;
    }

    // Create a new transaction object
    const transaction = {
        text: text,
        amount: amount,
    };

    // Make a POST request to add the transaction to the server
    fetch('http://localhost:3000/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    })
        .then(response => response.json())
        .then(data => {
            // Assuming the server responds with the created transaction
            // Update the UI or perform any necessary actions
            addToHistoryList(data);
            updateIncomeExpense(data);
            updateBalance();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, show a message, etc.
        });
}

// Clear input fields
textElement.value = '';
amountElement.value = '';
function addToHistoryList(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `${transaction.text} <span>${transaction.amount > 0 ? '+' : ''}$${transaction.amount.toFixed(2)}</span>`;
    historyListElement.appendChild(li);
}
function updateIncomeExpense(transaction) {
    if (transaction.amount > 0) {
        income += transaction.amount;
    } else {
        expense -= transaction.amount;
    }
}
function updateIncomeExpense(transaction) {
    if (transaction.amount > 0) {
        income += transaction.amount;
    } else {
        expense -= transaction.amount;
    }
}