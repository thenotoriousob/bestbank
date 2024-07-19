import { accounts } from "./data.js";

const accountsListEl = document.getElementById("accounts-list");
const spendingsListEl = document.getElementById("spendings-list");
const financesContainerEl = document.getElementById("finances-container");
const financeFlexContainerClass = "finances-container-flex";
const financeContainerClass = "finances-container";


document.addEventListener("click", function(e) {
    /* Only interested when an account pill is selected */
    if (e.target.classList.value === "account-pill") {
        handleAccountClick(Number(e.target.id));
    }
});

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
            // Just setting the background color to blank stops the hover working, remove the property instead
            document.getElementById(account.id).style.removeProperty('background-color')
            return false;
        }
    })[0];

    /* If we have an account that is selected then render it, otherwise hide
       the spendings column as there are no accounts currently selected */
    if (accountObj) {
        renderSpendings(accountObj);
    } else {
        spendingsListEl.style.display = "none";
    }

}

function renderAccounts() {

    accountsListEl.innerHTML = "<h2>Accounts</h2>";
    accounts.forEach(function(account) {
      accountsListEl.innerHTML += `
                        <div class="account-pill" id="${account.id}">
                            <p><nobr>${account.title}</nobr></p>
                            <p>${formatAmount(account.balance)}</p>
                        </div>
                        `;
    });

}

function renderSpendings(accountObj) {

        
    spendingsListEl.innerHTML = "<h2>Spendings</h2>";

    accountObj.spendings.forEach(function(spending) {
            spendingsListEl.innerHTML += `
                        <div class="spending-pill">
                            <p>${spending.category}</p>
                            <p>${formatAmount(spending.spent)}</p>
                        </div>
                        `;
    });

    addOrRemoveFlexContainerClass(accountObj.isSelected);

    calculateSpendingPillWidth();

    /* If we are rendering spendings make sure the display is not hidden */
    spendingsListEl.style.display = "";

}

function formatAmount(amount) {

    const formatter = new Intl.NumberFormat('en-US',
                                            {
                                                style: 'currency',
                                                currency: 'USD',
                                            });
    return formatter.format(amount);
}

function addOrRemoveFlexContainerClass(addFlex) {
    if (addFlex) {
        financesContainerEl.classList.add(financeFlexContainerClass);
        financesContainerEl.classList.remove(financeContainerClass);
    } else {
        financesContainerEl.classList.remove(financeFlexContainerClass);
        financesContainerEl.classList.add(financeContainerClass);
    }
}

function calculateSpendingPillWidth() {

    const spendingPillEls = Array.from(document.getElementsByClassName("spending-pill"));

    spendingPillEls.forEach(function(spendingPill, index) {

        spendingPill.style.width = `${100 - (index * 15)}%`
    })

}

renderAccounts();
