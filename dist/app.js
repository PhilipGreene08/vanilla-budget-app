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


let numberArray = []
testarr = []

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

var testExpenses = []

function TestExpense(type, amount) {
    this.type = type
    this.amount = amount
}

function newExpenseEntry() {
    event.preventDefault()
    const clicked = event.target
    var newTestExpense = new TestExpense(selectedExpense, inputValue.value)
    testExpenses.push(newTestExpense)
    console.log(testExpenses);
    testarr.push(createNewData(inputValue.value))
}

let expenseType = []
function selectExpense() {
    expenseType
    const clicked = event.target
    console.log(clicked);
    if (clicked.classList == `selected`) {
        expenseType.filter(word => console.log(word))
        clicked.classList.remove(`selected`)
    } else {
        clicked.classList.add(`selected`)
        expenseType.push(clicked.textContent)
    }
    console.log(expenseType);

}

