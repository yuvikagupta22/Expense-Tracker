const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

addBtn.addEventListener("click", addExpense);

function addExpense() {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title === "" || amount <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  expenses.push({ title, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  titleInput.value = "";
  amountInput.value = "";

  renderExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <span class="delete" onclick="deleteExpense(${index})">❌</span>
    `;
    expenseList.appendChild(li);
  });

  totalEl.textContent = total;
}

renderExpenses();
