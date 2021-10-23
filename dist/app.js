const numberPad = document.querySelector(`.tg`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)
const expenses = document.querySelectorAll(`.expense-tab`)
const selectedExpense = document.querySelectorAll(`.selected`)

const incomes = document.querySelectorAll(`.income-tab`)
console.log(incomes);

incomes.forEach(income => {
    income.addEventListener(`click`, selectIncome)
});

numberPad.addEventListener(`click`, enterNumber)
submitBtn.addEventListener(`click`, newExpenseEntry)
expenses.forEach(expense => {
    expense.addEventListener(`click`, selectExpense)
})

let numberArray = [] //used to store numbers from input
let expenseType = [] //used to select the type of expense in selectExpense()
let expenseList = []

let incomeType = []

function selectIncome() {
    const clicked = event.target
    clicked.classList.toggle(`selected`)
    if (clicked.className === `selected` && incomes.length <= 1) {
        console.log(`active`);
        [...incomes[0].children].forEach(el => {
            console.log(el);
        })
        console.log([...incomes[0].children]);
    } else {
        console.log(`not active`);
        console.log(incomes);
    }
    //console.log(incomes);
}

// function createNewData(amount, type) {
//     const obj = {}
//     obj.amount = amount
//     obj.type = type
//     return obj
// } //do i need this code? Was it test code?

// function NewExpense(type, amount) {
//     this.type = type
//     this.amount = amount
// } //do i need this? 
function enterNumber() {
    const clicked = event.target.textContent
    numberArray.push(clicked)
    inputValue.value = numberArray.join('')
}



class NewExpense {

    constructor(type, amount) {
        this.type = type;
        this.amount = amount
    }

}

function newExpenseEntry() {
    event.preventDefault()
    if (expenseType.length > 0) {
        console.log(expenseType);
        const newExpenseToAdd = new NewExpense(expenseType[0], inputValue.value)
        expenseList.push(newExpenseToAdd)
    } else if (incomeType.length > 0) {

    } else {
        console.log(`error type not selected`);
    }
    clearData()
}

function selectExpense() {
    const clicked = event.target

    if (expenseType.length >= 1) {
        let expenseIndex = expenseType.indexOf(clicked.textContent)
        if (clicked.classList == `selected`) {
            expenseType.splice(expenseIndex, 1)
            clicked.classList.remove(`selected`)
        } else if (clicked.classList !== `selected`) {
            let nodeList = [...clicked.parentElement.parentElement.children]
            nodeList.forEach(node => {
                node.children[0].classList.remove(`selected`)
            })
            clicked.classList.add(`selected`)
            expenseType.pop()
            expenseType.push(clicked.textContent)
        } else {
            console.log(`yes`);
        }

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
    }
}

function clearData() {
    numberArray = []
    inputValue.value = ``

    let expenseNodes = [...expenses[0].children]
    expenseNodes.forEach(el => {
        el.childNodes[1].classList.remove(`selected`)
    })
}
