const numberPad = document.querySelector(`.tg`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)
const expenses = document.querySelectorAll(`.expense-tab`)

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

function newExpenseEntry() {
    event.preventDefault()
    const clicked = event.target
    expenses.forEach((node) => {
        console.log(node.children);
        if (node.children.classList.hasAttribute(`selected`)) {
            console.log(node);
        }
    })
    // })); //keep this line

    // createNewData(inputValue.value) 
    testarr.push(createNewData(inputValue.value))
}

function selectExpense() {
    const clicked = event.target
    clicked.parentElement.classList.toggle(`selected`)
}

