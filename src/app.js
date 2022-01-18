'use strict'

const currencyElOne = document.getElementById('currency-one')
const currencyElTwo = document.getElementById('currency-two')
const amountElOne = document.getElementById('amount-one')
const amountElTwo = document.getElementById('amount-two')
const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch exchange rates & update the dom
function calculate() {
	const currencyOne = currencyElOne.value
	const currencyTwo = currencyElTwo.value

	fetch(
		`https://v6.exchangerate-api.com/v6/34ca540681c68a1109e86a7b/latest/${currencyOne}`,
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.conversion_rates)
			const rate = data.conversion_rates[currencyTwo]
			rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`

			amountElTwo.value = (amountElOne.value * rate).toFixed(2)
		})
}

// Event Listeners
currencyElOne.addEventListener('change', calculate)
amountElOne.addEventListener('input', calculate)
currencyElTwo.addEventListener('change', calculate)
amountElTwo.addEventListener('input', calculate)
swap.addEventListener('click', () => {
	const temp = currencyElOne.value
	currencyElOne.value = currencyElTwo.value
	currencyElTwo.value = temp
	calculate()
})
// initalize calculate
calculate()
