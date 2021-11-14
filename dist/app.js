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
const listItems = document.querySelectorAll(`.list-item`)

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
clearItemsFromTransactionBtn.addEventListener(`click`, clearItemsFromDomList)

function clearData() {
    clearExpense()
    clearIncome()
}

function clearAllLocalStorage() {
    localStorage.clear()
}

function clearItemsFromDomList() {
    //clearAllLocalStorage()
    localStorage.clear()
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

function saveExpense(expenseList) {
    localStorage.setItem(`expense`, JSON.stringify(expenseList))
}

function saveIncome(incomeList) {
    localStorage.setItem(`income`, JSON.stringify(incomeList))
}

function saveAllTransactions() {
    localStorage.setItem(`allTransactions`, JSON.stringify(allTransactions))
}

function newEntry() {
    event.preventDefault()
    clearItemsFromDomList()

    if (expenseType.length > 0 && incomeType.length == 0) {
        const newExpenseToAdd = new NewExpense(expenseType[0], Math.abs(inputValue.value) * -1)
        expenseList.push(newExpenseToAdd)
        allTransactions.push(newExpenseToAdd)
        saveAllTransactions()
        saveExpense(expenseList)
        saveIncome(incomeList)
        getTotal()
        clearExpense()
    } else if (incomeType.length > 0 && expenseType.length == 0) {
        const newIncomeToAdd = new NewIncome(incomeType[0], Math.abs(inputValue.value) * 1)
        incomeList.push(newIncomeToAdd)
        allTransactions.push(newIncomeToAdd)
        saveAllTransactions()
        saveIncome(incomeList)
        saveExpense(expenseList)
        getTotal()
        clearIncome()
    } else if (expenseType.length > 0 && incomeType.length > 0) {
        console.log(expenseType, incomeType);
        //clearData()
    } else {
        //clearData()
    }

}

function getTotal() {

    let allTransactionsFromLocalStorage = JSON.parse(localStorage.getItem(`allTransactions`))
    if (allTransactionsFromLocalStorage === null) {
        localStorage.setItem(`allTransactions`, ``)
        totalValue.textContent = `$0`
    } else {
        // console.log(
        //     JSON.parse(localStorage.getItem(`expense`)),
        //     JSON.parse(localStorage.getItem(`income`))
        // );

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

getTotal()


// function onDomLoad () {
//     if (localStorage.getItem(`allTransactions`) === null) {
//         localStorage.setItem()
//     }

// }
// function newEntry() {
//     event.preventDefault()
//     clearItemsFromDomList()
//     if (expenseType.length > 0) {
//         const newExpenseToAdd = new NewExpense(expenseType[0], inputValue.value)
//         expenseList.push(newExpenseToAdd)
//         allTransactions.push(newExpenseToAdd)
//         saveAllTransactions()
//         saveExpense(expenseList)
//         clearData()
//     } else if (incomeType.length > 0) {
//         const newIncomeToAdd = new NewIncome(incomeType[0], inputValue.value)
//         incomeList.push(newIncomeToAdd)
//         allTransactions.push(newIncomeToAdd)
//         saveAllTransactions()
//         saveIncome(incomeList)
//         clearData()
//     } else if (expenseType.length > 0 && incomeType.length > 0) {
//         console.log(`select one expense or one income`)
//         console.log(expenseType, incomeType);
//         clearData()
//     } else {
//         console.log(`error type not selected`)
//         clearData()
//     }
//     onLoad()
// }









// function onLoad() {

//     let allTransactionsFromLocalStorage = JSON.parse(localStorage.getItem(`allTransactions`))
//     if (allTransactionsFromLocalStorage == null) { //if transactions dont exist
//         console.log(`no transactions`);
//     }

//     else if (allTransactionsFromLocalStorage.length < 5 && allTransactionsFromLocalStorage.length >= 0) { //if trans are less than 5
//         clearItemsFromDomList()    //or greater than 0... clear trans page
//         allTransactions.forEach(el => { //create new element for each one
//             const newEl = document.createElement('li')
//             newEl.classList.add(`list-item`)
//             const newContent = document.createTextNode(el.type)
//             newEl.appendChild(newContent)
//             unorderedList.appendChild(newEl)
//         })
//         getTotal()
//     }

//     else if (allTransactionsFromLocalStorage.length >= 5) { //if trans are more than 5
//         clearItemsFromDomList() //clear trans page 
//         let lastFiveTransactions = allTransactionsFromLocalStorage.slice(Math.max(allTransactionsFromLocalStorage.length - 5, 0)) //get last 5 units
//         lastFiveTransactions.forEach(transaction => { //create a new element for each
//             const newEl = document.createElement(`li`)
//             const newContent = document.createTextNode(transaction.type)
//             newEl.appendChild(newContent)
//             unorderedList.appendChild(newEl)
//         })
//         getTotal()
//     } else {
//         console.log(`something else is wrong`);
//     }

// }



// function getTotal() {

//     let plusTotal = JSON.parse(localStorage.getItem(`income`))
//     if (plusTotal == null) {
//         localStorage.setItem(`income`, ``)
//     } else {
//         plusTotal.forEach(income => {
//             let incomeNumber = income.amount
//             totalDollars.push(+incomeNumber)//turns string into number
//         })
//     }

//     let minusTotal = JSON.parse(localStorage.getItem(`expense`))
//     if (minusTotal == null) {
//         localStorage.setItem(`expense`, ``)
//     } else {
//         minusTotal.forEach(expense => {
//             let negativeNumber = Math.abs(expense.amount) * -1
//             totalDollars.push(negativeNumber)
//         })
//     }

//     //const reducer = (a, b) => a + b
//     const finalTotal = totalDollars.reduce(function (acc, curr) {
//         return acc + curr
//     })
//     totalValue.textContent = ``
//     totalValue.textContent = `$${finalTotal}`
//     console.log(finalTotal);
// }

// function listItemRemove() {
//     console.log(`remove list item`);
//     listItems.forEach(el => {
//         el.remove()
//     })
// }

// function checkLocalStorageForData() {
//     if (localStorage.getItem(`income`) == null) {

//     }
// }

// window.onload = onLoad()