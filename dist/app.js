const numberPad = document.querySelector(`.tg`)
const inputForm = document.querySelector(`.input-Form`)
let inputValue = document.querySelector(`.inputValue`)
const submitBtn = document.querySelector(`.submit`)

numberPad.addEventListener(`click`, enterNumber)

let numberArray = []

function enterNumber() {
    const clicked = event.target.textContent
    numberArray.push(clicked)
    inputValue.value = numberArray.join('')
}

submitBtn.addEventListener(`click`, testData)

function testData() {
    event.preventDefault()
    console.log(`yes`);
}

console.log(inputValue);