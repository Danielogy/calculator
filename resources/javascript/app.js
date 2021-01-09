const displayValue = document.querySelector('#value');
const btns = document.querySelectorAll('button');
const dot = document.querySelector('#dot');
let expression = {
    num1: null,
    num2: null,
    operator: null,
};

btns.forEach(btn =>{
    btn.addEventListener('click',  e =>{
       let that = e.target.id;
       const operands = displayValue.textContent += e.target.value;
       displayValue.style.cssText = 'font-size: 3rem';

       if(that == 'mult' || that == 'divide' || that == 'plus' || that == 'minus' || that == 'mod'){
            clear();
            expression.operator = that;
            if(expression['num1'] == null)
                expression['num1'] = operands;      
       }

       if(that == 'equals' && (expression['num1'] != null)){
           expression['num2'] = operands;
           let answer = operate(expression.operator, Number(expression.num1), Number(expression.num2));
           answer.toString().length = 0;
           
           resizeDisplay(answer);

           expression['num1'] = displayValue.textContent;
       }

       if(displayValue.textContent.includes('.') && that == 'dot'){
            btn.disabled = true;
       }

        if(that == 'ac')
            clear();

        if(that == 'plus-minus' && displayValue.textContent != '')
            displayValue.textContent = convertSign(displayValue.textContent);
    });
});

function clear(){
    displayValue.textContent = '';
    expression.num1 = null;
    expression.num2 = null;
    expression.operator = null;
    dot.disabled = false;
}

function convertSign(exp){
    Number(exp);
    return (-exp);
}

function operate(operator, num1, num2){
    if(operator == 'mod')
        return num1 % num2;
    else if(operator == 'divide'){
        if(num2 != 0)
            return num1 / num2;
        else
            displayValue.textContent = "Uhhhh....";
    }
    else if(operator == 'mult')
        return num1 * num2;
    else if(operator == 'minus')
        return num1 - num2;
    else if(operator == 'plus')
        return num1 + num2;
}

window.addEventListener('keydown', e =>{
    if(e.key >= 0 && e.key <= 9)  
        displayValue.textContent += e.key;
    if(e.key === ".")
        displayValue.textContent += e.key;
    if(e.key === "=" || e.key === "Enter"){
        if(expression['num1'] != null){
            console.log('hi');
            expression['num2'] = displayValue.textContent;
            let answer = operate(expression.operator, Number(expression.num1), Number(expression.num2));
            resizeDisplay(answer);
            expression['num1'] = displayValue.textContent;
            expression['num2'] = null;
        }
    }
    if(e.key === "Escape") 
        clear();
    if(e.key === "Backspace")
        displayValue.textContent = displayValue.textContent.toString().slice(0, -1);
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
        setOperator(e.key); 
});

function setOperator(key) {
    if(key === "/"){
        expression.operator = "divide";
        readyToMath();
    }
    if(key === "*"){
        expression.operator = 'mult';
        readyToMath();
    }
    if(key === "-"){
        expression.operator = 'minus';
        readyToMath();
    }   
    if(key === "+"){
        expression.operator = 'plus';
        readyToMath()
    }
}

function readyToMath(){
    if(displayValue.textContent == '')
        expression.operator = null;
    else{
        expression['num1'] = displayValue.textContent;
        console.log(expression);
        displayValue.textContent = '';
    }
}

function resizeDisplay(answer){
    if (answer.toString().length >= 15) {
        let rounded = Math.round(answer * 100) / 100;
        displayValue.textContent = rounded;
        displayValue.style.cssText = 'font-size: 2rem';
    } 
    else {
        displayValue.textContent = answer;
        displayValue.style.cssText = 'font-size: 3rem';
    }
}