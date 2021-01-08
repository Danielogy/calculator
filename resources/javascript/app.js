const displayValue = document.querySelector('#value');
const btns = document.querySelectorAll('button');
let expression = {
    num1: null,
    num2: null,
    operator: null,
};

btns.forEach(btn =>{
    btn.addEventListener('click',  e =>{
       let that = e.target.id;  
       const exp = displayValue.textContent += e.target.value;

       if(that == 'mult' || that == 'divide' || that == 'plus' || that == 'minus' || that == 'mod'){
            clear();
            expression.operator = that;
            if(expression['num1'] == null)
                expression['num1'] = exp; 
       }

       if(that == 'equals' && (expression['num1'] != null)){
           expression['num2'] = exp;
           displayValue.textContent = operate(expression.operator, Number(expression.num1), Number(expression.num2));
           expression['num1'] = displayValue.textContent;
           expression['num2'] = null;
           console.log(expression);
       }
       console.log(expression);
       if(e.target.id == 'ac')
            clear();

        if(e.target.id == 'plus-minus' && displayValue.textContent != '')
            displayValue.textContent = convertSign(exp);
    });
});

function clear(){
    displayValue.textContent = '';
    expression.num1 = null;
    expression.num2 = null;
    expression.operator = null;
}

function convertSign(exp){
    return (-exp);
}

function operate(operator, num1, num2){
    if(operator == 'mod')
        return num1 % num2;
    else if(operator == 'divide')
        return num1 / num2
    else if(operator == 'mult')
        return num1 * num2;
    else if(operator == 'minus')
        return num1 - num2;
    else if(operator == 'plus')
        return num1 + num2;
}

