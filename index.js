import { accounts } from "./data.js";

const accountsListEl = document.getElementById("accounts-list");
const expensesListEl = document.getElementById("expenses-list");
const financesEl = document.getElementById("finances");


document.addEventListener("click", function(e) {

    if (e.target.id) {
        handleAccountClick(Number(e.target.id));
    }
});

function renderAccounts() {

    accountsListEl.innerHTML = "<h1>Accounts</h1>";
    accounts.forEach(function(account) {
      accountsListEl.innerHTML += `
                        <div class="account-pill" id="${account.id}">
                            <p>${account.title}</p>
                            <p>${formatAmount(account.balance)}</p>
                        </div>
                        `;
    });

}

function handleAccountClick(accountId) {

    /* Only want to find the filter the account if it has been clicked
       and it isn't already selected, otherwise treat it as being unselected */
    const accountObj = accounts.filter(function(account) {
        if (account.id === accountId && !account.isSelected) {
            account.isSelected = true;
            document.getElementById(account.id).style.backgroundColor = "#FFD18C";
            return true;
        } else {
            account.isSelected = false;
            document.getElementById(account.id).style.backgroundColor = "#FFFFFF";
            return false;
        }
    })[0];

    /* If we have an account that is selected then render it, otherwise hide
       the expenses column as there are no accounts currently selected */
    if (accountObj) {
        renderExpenses(accountObj);
    } else {
        expensesListEl.style.display = "none";
    }

}

function renderExpenses(accountObj) {

    /* If we are rendering expenses make sure the display is not hidden */
    expensesListEl.style.display = "";
        
    expensesListEl.innerHTML = "<h1>Expenses</h1>";

    accountObj.spendings.forEach(function(spending) {
            expensesListEl.innerHTML += `
                        <div class="expense-pill">
                            <p>${spending.category}</p>
                            <p>${formatAmount(spending.spent)}</p>
                        </div>
                        `;
    });

    if (accountObj.isSelected) {
        financesEl.classList.add("finances-flex");
        financesEl.classList.remove("finances");
    } else {
        financesEl.classList.remove("finances-flex");
        financesEl.classList.add("finances");
    }

    calculateExpensePillWidth();

}

function calculateExpensePillWidth() {

    const expensePillEls = Array.from(document.getElementsByClassName("expense-pill"));

    expensePillEls.forEach(function(expensePill, index) {

        expensePill.style.width = `${100 - (index * 15)}%`
    })

}

function formatAmount(amount) {

    const formatter = new Intl.NumberFormat('en-US',
                                            {
                                                style: 'currency',
                                                currency: 'USD',
                                            });
    return formatter.format(amount);
}

renderAccounts();
