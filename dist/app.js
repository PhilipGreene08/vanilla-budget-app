const numberPad = document.querySelector(`.tg`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)
const expenses = document.querySelectorAll(`.expense-tab`)
const selectedExpense = document.querySelectorAll(`.selected`)


numberPad.addEventListener(`click`, enterNumber)
submitBtn.addEventListener(`click`, newExpenseEntry)
expenses.forEach(expense => {
    expense.addEventListener(`click`, selectExpense)
})


let numberArray = [] //used to store numbers from input
let expenseType = [] //used to select the type of expense in selectExpense()

function createNewData(amount, type) {
    const obj = {}
    obj.amount = amount
    obj.type = type
    return obj
}

function enterNumber() {
    const clicked = event.target.textContent
    numberArray.push(clicked)
    inputValue.value = numberArray.join('')
}

let expenseList = []

function newExpense(type, amount) {
    this.type = type
    this.amount = amount
}

function newExpenseEntry() {
    event.preventDefault()
    const clicked = event.target
    var newTestExpense = new newExpense(expenseType[0], inputValue.value)
    expenseList.push(newTestExpense)
    console.log(expenseList);
}


function selectExpense() {
    const clicked = event.target

    if (expenseType.length >= 1) {
        console.log(`error`);
    } else {
        console.log(clicked.textContent);
        if (clicked.classList == `selected`) {
            let expenseIndex = expenseType.indexOf(clicked.textContent)
            expenseType.splice(expenseIndex, 1)
            clicked.classList.remove(`selected`)
        } else {
            clicked.classList.add(`selected`)
            expenseType.push(clicked.textContent)
        }
        console.log(expenseType);
    }
}

