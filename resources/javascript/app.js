const displayValue = document.querySelector('#value');
const btns = document.querySelectorAll('button');
const dot = document.querySelector('#dot');

//object to hold the first operand, second operand and operator
let expression = {
    num1: null,
    num2: null,
    operator: null,
};

btns.forEach(btn =>{
    btn.addEventListener('click',  e =>{
        //prevent redundancy in code
       let that = e.target.id;
       
       const operands = displayValue.textContent += e.target.value;
       displayValue.style.cssText = 'font-size: 1.3em'; 

       //set the first operand of expressions object after hitting the operator
       if(that == 'mult' || that == 'divide' || that == 'plus' || that == 'minus' || that == 'mod'){
            clear();
            expression.operator = that;
            if(expression['num1'] == null)
                expression['num1'] = operands;      
       }

       //get the answer based on the object's values.
       if(that == 'equals' && (expression['num1'] != null)){
           //if the first num isn't null, set the second one to the display's value.
           expression['num2'] = operands;
           let answer = operate(expression.operator, Number(expression.num1), Number(expression.num2));
           answer.toString().length = 0;
           
           //if the answer is too big, make the font smaller
           resizeDisplay(answer);
            
           //set the first number to the display value to get ready for the next operation
           expression['num1'] = displayValue.textContent;
       }

       //if the display already has a '.', prevent the user from hitting it again
       if(displayValue.textContent.includes('.') && that == 'dot'){
            btn.disabled = true;
       }

        if(that == 'ac')
            clear();

        //get the display's value and return its negation
        if(that == 'plus-minus' && displayValue.textContent != '')
            displayValue.textContent = convertSign(displayValue.textContent);
    });
});

//clear the display and the object's values
function clear(){
    displayValue.textContent = '';
    expression.num1 = null;
    expression.num2 = null;
    expression.operator = null;
    dot.disabled = false;
}

//return the values negation
function convertSign(exp){
    Number(exp);
    return (-exp);
}

//arithmetic function
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

//keyboard support
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

//if answer's value is longer than 15 digits in length,
//make the font smaller and round. otherwise continue.
function resizeDisplay(answer){
    if (answer.toString().length >= 15) {
        let rounded = Math.round(answer * 100) / 100;
        displayValue.textContent = rounded;
        displayValue.style.cssText = 'font-size: .8em';
    } 
    else {
        displayValue.textContent = answer;
        displayValue.style.cssText = 'font-size: 1.3em';
    }
}