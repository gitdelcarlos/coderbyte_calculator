const c_calculator = {
	display_value: '0',
	first_number: null,
	waiting_second_number: false,
	operator: null,
};

function input_number(digit) {
	const { display_value, waiting_second_number } = c_calculator;
	if (waiting_second_number === true) {
		c_calculator.display_value = digit;
		c_calculator.waiting_second_number = false;
	} else {
		c_calculator.display_value = display_value === '0' ? digit : display_value + digit;
	}
}

function input_dot(dot) {
	if (c_calculator.waiting_second_number === true) {
		c_calculator.display_value = "0."
		c_calculator.waiting_second_number = false;
		return
	}

	if (!c_calculator.display_value.includes(dot)) {
		c_calculator.display_value += '.';
	}
}

function set_operator(nextOperator) {
	const { first_number, display_value, operator } = c_calculator
	const inputValue = parseFloat(display_value);
	
	if (operator && c_calculator.waiting_second_number)	{
		c_calculator.operator = nextOperator;
		return;
	}


	if (first_number == null && !isNaN(inputValue)) {
		c_calculator.first_number = inputValue;
	} else if (operator) {
		const result = calculate(first_number, inputValue, operator);

		c_calculator.display_value = `${parseFloat(result.toFixed(9))}`;
		c_calculator.first_number = result;
	}

	c_calculator.waiting_second_number = true;
	c_calculator.operator = nextOperator;
}

function calculate(first_number, second_number, operator) {
	if (operator === 'increment') {
		return first_number + second_number;
	} else if (operator === 'decrement') {
		return first_number - second_number;
	} else if (operator === 'multiplication') {
		return first_number * second_number;
	} else if (operator === 'division') {
		return first_number / second_number;
	}

	return second_number;
}

function reset() {
	c_calculator.display_value = '0';
	c_calculator.first_number = null;
	c_calculator.waiting_second_number = false;
	c_calculator.operator = null;
}

function update_display() {
	const display = document.querySelector('.calculator-display');
	display.value = c_calculator.display_value;
}

update_display();

const keys = document.querySelector('.calculator-keyboard');
keys.addEventListener('click', event => {
	const { target } = event;
	const { value } = target;
	if (!target.matches('button')) {
		return;
	}

	switch (value) {
		case 'increment':
		case 'decrement':
		case 'multiplication':
		case 'division':
		case 'equals':
			set_operator(value);
			break;
		case 'dot':
			input_dot(value);
			break;
		case 'clear':
			reset();
			break;
		default:
			if (Number.isInteger(parseFloat(value))) {
				input_number(value);
			}
	}

	update_display();
});