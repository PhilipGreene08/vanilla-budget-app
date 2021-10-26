const numberPad = document.querySelector(`.tg`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)
const expenses = document.querySelectorAll(`.expense-tab`)
const selected = document.querySelectorAll(`.selected`)
const incomes = document.querySelectorAll(`.income-tab`)

const incomess = document.querySelectorAll(`.income`)

numberPad.addEventListener(`click`, enterNumber)
submitBtn.addEventListener(`click`, newEntry)
expenses.forEach(expense => {
    expense.addEventListener(`click`, selectExpense)
})
incomes.forEach(income => {
    income.addEventListener(`click`, selectIncome)
});

let numberArray = [] //used to store numbers from input
let expenseType = [] //used to select the type of expense in selectExpense()
let expenseList = []
let incomeType = []
let incomeList = []

function selectIncome() { //adjust the incomess variable to make sense
    const clicked = event.target
    if (incomeType.length >= 1) {
        incomess.forEach(income => {
            let arrayOfIncome = [...income.children]
            arrayOfIncome[0].classList.remove(`selected`)
        })
        clicked.parentElement.children[0].classList.add(`selected`)
        incomeType.shift()
        incomeType.push(clicked.textContent)
    } else {
        clicked.classList.add(`selected`)
        incomeType.push(clicked.textContent)
    }

    console.log(incomeType);

}

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

class NewIncome {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount
    }
}

function newEntry() {
    event.preventDefault()
    if (expenseType.length > 0) {
        //console.log(expenseType);
        const newExpenseToAdd = new NewExpense(expenseType[0], inputValue.value)
        expenseList.push(newExpenseToAdd)
    } else if (incomeType.length > 0) {
        const newIncomeToAdd = new NewIncome(incomeType[0], inputValue.value)
        incomeList.push(newIncomeToAdd)
        console.log(incomeList, incomeType);
    } else {
        error(`error type not selected`)
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
    let incomeNodes = [...incomes] //need to be able to clear income node
    incomeNodes[0].children.forEach(el => { //this code is not working
        console.log(el);
    })

    console.log(incomeNodes[0].children);
}
