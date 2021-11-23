const numberPad = document.querySelectorAll(`.tg-0lax`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)
const expenses = document.querySelectorAll(`.expense-tab`)
const selected = document.querySelectorAll(`.selected`)
const incomes = document.querySelectorAll(`.income-tab`)
const clearButton = document.querySelector(`.clearBtn`)
const clearItemsFromTransactionBtn = document.querySelector(`.clearItemsBtn`) //transaction dom
const unorderedList = document.querySelector(`.unordered-list`)
const totalValue = document.getElementById(`total-value`)
const listItems = document.querySelectorAll(`.list-items`)

let numberArray = []
let expenseType = []
let expenseList = []
let incomeType = []
let incomeList = []
let totalDollars = []
let allTransactions = []

numberPad.forEach(button => {
    button.addEventListener(`click`, enterNumber)
})
submitBtn.addEventListener(`click`, newEntry)
expenses.forEach(expense => {
    expense.addEventListener(`click`, selectExpense)
})
incomes.forEach(income => {
    income.addEventListener(`click`, selectIncome)
});
clearButton.addEventListener(`click`, clearData)
clearItemsFromTransactionBtn.addEventListener(`click`, clearApp)

function clearData() {
    clearExpense()
    clearIncome()
}

function clearApp() {
    localStorage.removeItem(`allTransactions`)
    localStorage.removeItem(`expense`)
    localStorage.removeItem(`income`)
    unorderedList.textContent = ``
    totalValue.textContent = `$0`
}
function enterNumber() {
    const clicked = event.target.textContent
    numberArray.push(clicked)
    inputValue.value = numberArray.join(``)
}

class NewExpense {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount
    }
}

class NewIncome {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount
    }
}

function selectExpense() {
    const clicked = event.target
    const expenseIndex = expenseType.indexOf(clicked.textContent)
    if (expenseType.length > 0) {
        if (clicked.classList == `selected`) {
            expenseType.splice(expenseIndex, 1) //starting at expenseIndex, remove one from expenseType array
            clicked.classList.remove(`selected`)
        } else {
            let nodeList = [...clicked.parentElement.parentElement.children]
            nodeList.forEach(node => {
                node.children[0].classList.remove(`selected`)
            })
            clicked.classList.add(`selected`)
            expenseType.shift()
            expenseType.push(clicked.textContent)
        }
    } else {
        clicked.classList.add(`selected`)
        expenseType.push(clicked.textContent)
    }
}

function selectIncome() {
    const clicked = event.target
    const incomeIndex = incomeType.indexOf(clicked.textContent)
    if (incomeType.length > 0) {
        if (clicked.classList == `selected`) {
            incomeType.splice(incomeIndex, 1)
            clicked.classList.remove(`selected`)
        } else {
            let nodeList = [...clicked.parentElement.parentElement.children]
            nodeList.forEach(node => {
                node.children[0].classList.remove(`selected`)
            })
            clicked.classList.add(`selected`)
            incomeType.shift()
            incomeType.push(clicked.textContent)
        }
    } else {
        clicked.classList.add(`selected`)
        incomeType.push(clicked.textContent)
    }
}

function clearExpense() {
    numberArray = []
    inputValue.value = ``
    expenseType = []
    let expensesNodeList = expenses[0].children
    let expensesToSearch = Array.from(expensesNodeList)
    expensesToSearch.forEach(expense => {
        let nodeList = expense.children
        nodeList[0].classList.remove(`selected`)
    })
}

function clearIncome() {
    numberArray = []
    inputValue.value = ``
    incomeType = []
    let incomesNodeList = incomes[0].children
    let incomesToSearch = Array.from(incomesNodeList)
    incomesToSearch.forEach(income => {
        let nodeList = income.children
        nodeList[0].classList.remove(`selected`)
    })
}

function saveDataToLocalStorage(incomeList, expenseList, allTransactions) {
    localStorage.setItem(`expense`, JSON.stringify(expenseList))
    localStorage.setItem(`income`, JSON.stringify(incomeList))
    localStorage.setItem(`allTransactions`, JSON.stringify(allTransactions))
}

// function saveExpense(expenseList) {
//     localStorage.setItem(`expense`, JSON.stringify(expenseList))
// }

// function saveIncome(incomeList) {
//     localStorage.setItem(`income`, JSON.stringify(incomeList))
// }

// function saveAllTransactions() {
//     localStorage.setItem(`allTransactions`, JSON.stringify(allTransactions))
// }

function newEntry() {
    event.preventDefault()
    //clearApp()

    //remove latest Data From Dom
    unorderedList.textContent = ``

    if (expenseType.length > 0 && incomeType.length == 0) {
        const newExpenseToAdd = new NewExpense(expenseType[0], Math.abs(inputValue.value) * -1)
        console.log(newExpenseToAdd);
        expenseList.push(newExpenseToAdd)
        console.log(expenseList);
        allTransactions.push(newExpenseToAdd)
        saveDataToLocalStorage(incomeList, expenseList, allTransactions)
        // saveAllTransactions()
        // saveIncome(incomeList)
        // saveExpense(expenseList)
    } else if (incomeType.length > 0 && expenseType.length == 0) {
        const newIncomeToAdd = new NewIncome(incomeType[0], Math.abs(inputValue.value) * 1)
        incomeList.push(newIncomeToAdd)
        allTransactions.push(newIncomeToAdd)
        saveDataToLocalStorage(incomeList, expenseList, allTransactions)
        // saveAllTransactions()
        // saveIncome(incomeList)
        // saveExpense(expenseList)
    } else if (expenseType.length > 0 && incomeType.length > 0) {
        console.log(`only select one income or expense`);
        //clearData()
    } else {
        //clearData()
    }
    console.log(expenseList);
    getTotal()
    clearIncome()
    clearExpense()
    renderTransactions()
}

function getTotal() {

    let allTransactionsFromLocalStorage = JSON.parse(localStorage.getItem(`allTransactions`))
    if (allTransactionsFromLocalStorage === null) {
        localStorage.setItem(`allTransactions`, ``)
        totalValue.textContent = `$0`
    } else {
        totalDollars = []
        allTransactionsFromLocalStorage.forEach(num => {
            const transactionDollarAmount = num.amount
            totalDollars.push(transactionDollarAmount)
        })
        let sum = totalDollars.reduce((prevValue, currentValue) => {
            return prevValue + currentValue
        })
        totalValue.textContent = `$${sum}`
    }
}

function renderTransactions() {
    let allTransactionsFromLocalStorage = JSON.parse(localStorage.getItem(`allTransactions`))
    if (allTransactionsFromLocalStorage.length >= 0) {
        let arrayToRender = allTransactionsFromLocalStorage.slice(-5)
        arrayToRender.forEach(el => {
            const newEl = document.createElement(`li`)
            newEl.classList.add(`list-items`)
            const liContent = document.createTextNode(`${el.type}: $${el.amount}`)
            newEl.appendChild(liContent)
            unorderedList.appendChild(newEl)
        })
    } else if (allTransactionsFromLocalStorage == null) {
        localStorage.setItem(`allTransactions`, ``)
    } else {
        console.log(`no transactions`);
    }

    //getTotal()
}

window.onload = function (event) {
    event.preventDefault()
    //clear all data from dom
    unorderedList.textContent = ``
    //check ls for data
    let allExistingTransactions = JSON.parse(localStorage.getItem(`allTransactions`))
    if (allExistingTransactions == null) {
        localStorage.setItem(`allTransactions`, JSON.stringify([]))
    }
    let expense = JSON.parse(localStorage.getItem(`expense`))
    if (expense == null) {
        localStorage.setItem(`expense`, JSON.stringify([]))
    }
    let income = JSON.parse(localStorage.getItem(`income`))
    if (income == null) {
        localStorage.setItem(`income`, JSON.stringify([]))
    }

    //renderTransactions()
}
window.addEventListener('load', function (e) {
    renderTransactions()
})