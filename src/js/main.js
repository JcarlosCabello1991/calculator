let resul = document.querySelector("div.screen");
var resulLog = "";
let equalPulse = false;

function numButtonFuction(event){
    const number = event.target.textContent;
   
    if(equalPulse == false){
        if(resul.textContent == 0){
            if(!isNaN(number)){
                resul.textContent = number;
            }
        }else{    
            let bool = comprobarSpecial(number, resul.textContent);
            if(bool == true){
                comprobarTamaño(resul.textContent);
                resul.textContent = comprobarMasMenos(number, resul.textContent);
            }
        }
    }else{
        if(!isNaN(number)){
            resul.textContent = number;
        }else{    
         resul.textContent += number;
        }
    }
    equalPulse = false;
}

function comprobarTamaño(resToComp){
    let array = resToComp.split("");
    let displayScreen = document.getElementsByClassName("screen");
    let dSStyle = window.getComputedStyle([...displayScreen][0]);
    let size = dSStyle.getPropertyValue("font-size");
    console.log("letra "+size)

    let tamanyo = size.split("");
    let newSize = "";
    for(let j = 0; j < tamanyo.length; j++){
        if(tamanyo[j] != "p"){
            newSize += tamanyo[j];
        }else{
            j = tamanyo.length;
        }
    }
    if(array.length>= 7){
        let currentfS = newSize * 0.9;
        console.log(currentfS);
        [...displayScreen][0].style.fontSize = currentfS+"px";
    }
}

function comprobarMasMenos(n, resText){
    let res="";
    let arrayOperation = resText.split("");
    if(isNaN(n)){
        if(arrayOperation[arrayOperation.length-1] == "+" && n == "-"){
            arrayOperation[arrayOperation.length-1] = "-";
        }else if(arrayOperation[arrayOperation.length-1] == "-" && n == "+"){
            arrayOperation[arrayOperation.length-1] = "+";
        }else{
            return resText+n;
        }

        for(let i = 0; i < arrayOperation.length; i++){
            res += arrayOperation[i];
        }
        return res;
    }else{
        resText += n;
        return resText;
    }
}

function comprobarSpecial(number, rT){
    let b = true;
    let i = rT.length-1;
    let arrayOp = rT.split("");
    if(isNaN(number)){
        if(number == rT[i]){
          b = false;
        }
    }
    return b;
}

function operationEqual(){
    let operation = resul.textContent;
    let array = operation.split("");

    let i = 0;
    let operToCalculate="";
    while(i < array.length){
        if(array[i] == "x"){
            array[i] = "*";
            operToCalculate += array[i];
        }else if(array[i] == "÷"){
            array[i] = "/";
            operToCalculate += array[i];
        }
        else{
            operToCalculate += array[i];
        }
        i++;
    }
    if(isNaN(operation)){
        if(!isNaN(array[array.length-1])){
            resul.textContent = eval(operToCalculate);
            resulLog += operToCalculate +"="+ eval(operToCalculate)+"\n";
            equalPulse = true;
        }
    }
}

function operationReset(){
    let reset = resul.textContent;
    let displayScreen = document.getElementsByClassName("screen");
    [...displayScreen][0].style.fontSize = "72px";
    resul.textContent = 0;
}

function plusMinus(){
    let operation = resul.textContent;
    let array = operation.split("");
    let operationChanged ="";

    if(array.length == 1){
        array[0] = "-"+array[0];
        operationChanged = array[0];
    }else{
        for(let j = array.length-1; j >= 0; j--){
            if(array[j] == "x" || array[j] == "%" || array[j] == "÷"){
                if(array[j+1] == "-"){
                    array.splice(j+1, 1)
                    j = 0;
                }else{
                    array.splice(j+1, 0, "-")
                    j = 0;
                }
            }else if(array[j] == "+"){
                    array[j] = "-";
                    j = 0;
            }else if(array[j] == "-"){
                array.splice(j, 1)
                j = 0;
            }else{
                if(j == 0 && array[j]!="-"){
                    array.splice(j, 0, "-")
                    j = 0;
                }
            }
        }
        for(let i = 0; i < array.length; i++){
            operationChanged += array[i];
        }
    }
    
    resul.textContent = operationChanged;
}

function modo (event) {
    console.log(event.target.classList)
    if (event.target.classList.contains("button-aspect-bright")) {
        /* Mode Bright */
    document.getElementsByClassName("color-button-container-bright")[0].classList.replace("color-button-container-bright","color-button-container-dark");
    document.getElementsByClassName("color-combi-bright")[0].classList.replace("color-combi-bright","color-combi-dark");
    document.getElementsByClassName("color-calculator-bright")[0].classList.replace("color-calculator-bright","color-calculator-dark");
    document.getElementsByClassName("button-aspect-container-bright")[0].classList.replace("button-aspect-container-bright","button-aspect-container-dark");
    document.getElementsByClassName("button-aspect-bright")[0].classList.replace("button-aspect-bright","button-aspect-dark");
    }
    
    else {
        document.getElementsByClassName("color-button-container-dark")[0].classList.replace("color-button-container-dark","color-button-container-bright");
        document.getElementsByClassName("color-combi-dark")[0].classList.replace("color-combi-dark","color-combi-bright");
        document.getElementsByClassName("color-calculator-dark")[0].classList.replace("color-calculator-dark","color-calculator-bright");
        document.getElementsByClassName("button-aspect-container-dark")[0].classList.replace("button-aspect-container-dark","button-aspect-container-bright");
        document.getElementsByClassName("button-aspect-dark")[0].classList.replace("button-aspect-dark","button-aspect-bright");
    }
}

document.getElementById("button-log").addEventListener("click", loglist)
function loglist(event){
    
    let screenDisplay = document.querySelector(".screen");
    screenDisplay.textContent = resulLog;

    let buttonsOp = document.querySelectorAll(".button-operation");
    let buttonsNum = document.getElementsByClassName("button-number");
    let buttonEq = document.getElementsByClassName("button-equal-sign");

    if([...buttonsOp][0].style.display == "none"){
        for(let i = 0; i < [...buttonsOp].length; i++){
            [...buttonsOp][i].style.display = "";
        }
        for(let i = 0; i < [...buttonsNum].length; i++){
            [...buttonsNum][i].style.display = "";
            if(i == 0){
                [...buttonEq][0].style.display = "";
            }    
        }
        screenDisplay.style.height = "100px";
        screenDisplay.style.overflow = "hidden";
        screenDisplay.style.fontSize = "72px";
    }else{
        for(let i = 0; i < [...buttonsOp].length; i++){
            [...buttonsOp][i].style.display = "none";
        }
        for(let i = 0; i < [...buttonsNum].length; i++){
            [...buttonsNum][i].style.display = "none";
            if(i == 0){
                [...buttonEq][0].style.display = "none";
            }    
        }
        screenDisplay.style.height = "500px";
        screenDisplay.style.overflowY = "scroll"
        screenDisplay.style.fontSize = "36px";
    } 
}