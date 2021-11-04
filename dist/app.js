const numberPad = document.querySelectorAll(`.tg-0lax`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)
const expenses = document.querySelectorAll(`.expense-tab`)
const selected = document.querySelectorAll(`.selected`)
const incomes = document.querySelectorAll(`.income-tab`)
const clearButton = document.querySelector(`.clearBtn`)

let numberArray = []
let expenseType = []
let expenseList = []
let incomeType = []
let incomeList = []

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

function clearData() {
    clearExpense()
    clearIncome()
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

function newEntry() {
    event.preventDefault()
    if (expenseType.length > 0) {
        const newExpenseToAdd = new NewExpense(expenseType[0], inputValue.value)
        expenseList.push(newExpenseToAdd)
        saveExpense(expenseList)
        clearData()
    } else if (incomeType.length > 0) {
        const newIncomeToAdd = new NewIncome(incomeType[0], inputValue.value)
        incomeList.push(newIncomeToAdd)
        saveIncome(incomeList)
        clearData()
    } else if (expenseType.length > 0 && incomeType.length > 0) {
        console.log(`select one expense or one income`)
        console.log(expenseType, incomeType);
        clearExpense()
        clearIncome()
    } else {
        console.log(`error type not selected`)
        clearData()
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
    expensesToSearch.forEach(ex => {
        let nodeList = ex.children
        nodeList[0].classList.remove(`selected`)
    })
}

function clearIncome() {
    numberArray = []
    inputValue.value = ``
    expenseType = []
    let incomesNodeList = incomes[0].children
    let incomesToSearch = Array.from(incomesNodeList)
    incomesToSearch.forEach(inc => {
        let nodeList = inc.children
        nodeList[0].classList.remove(`selected`)
    })
}

function saveExpense(expenseList) {
    localStorage.setItem(`expense`, JSON.stringify(expenseList))
}

function saveIncome(incomeList) {
    localStorage.setItem(`income`, JSON.stringify(incomeList))
}

function renderExpenseIncome() {
    let incomeFromLocalStorage = localStorage.getItem(`income`)
    let expenseFromLocalStorage = localStorage.getItem(`expense`)

    console.log(incomeFromLocalStorage);
    console.log(expenseFromLocalStorage);
}

function clearAllLocalStorage() {

}