const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');const historyListElement = document.getElementById('historyList');
const textElement = document.getElementById('text');
const amountElement = document.getElementById('amount');

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
}

    if (text.trim() === '' || isNaN(amount)) {
        alert('Please enter valid text and amount.');
        return;
    }

    const transaction = {
        id: generateID(),
        text,
        amount,
    };

    transactions.push(transaction);

    addToHistoryList(transaction);
    updateIncomeExpense(transaction);
    updateBalance();

    // Clear input fields
    textElement.value = '';
    amountElement.value = '';
