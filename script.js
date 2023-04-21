const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const deletebutton = document.querySelector('[data-delete]');


class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = '';
    }
    
    deleteNumber(){
       if(this.currentOperand === "") return;

       this.currentOperand = this.currentOperand.slice(0,-1);
    }
    appendNumber(number){

        if(number === "." && this.currentOperand.includes('.')) return;

        this.currentOperand += number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === "") return 

        if(this.previousOpearand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let result;
        const first = parseFloat(this.previousOperand);
        const second = parseFloat(this.currentOperand);

        if(isNaN(first) || isNaN(second)) return;

        switch(this.operation){
            case '+':
                result = first + second ;
                break;
            case '-':
                result = first - second ;
                break;
            case '*':
                result = first * second;
                break;
            case '÷':
                result = first / second;
                break;
            default :
                return;
        }
        this.previousOperand = "";
        this.currentOperand = result.toString();
        this.operation = '';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand; 
        this.previousOperandTextElement.innerText = `${this.previousOperand}`+`${this.operation}`;
    }
}


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});



equalsButton.addEventListener('click',() =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deletebutton.addEventListener('click',()=>{
    calculator.deleteNumber();
    calculator.updateDisplay();
})