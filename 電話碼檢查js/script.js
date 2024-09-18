const input = document.getElementById("user-input");
const output = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const checkPhoneNum = () => {
    if(input.value === ""){
        alert("Please provide a phone number.");
        return ;
    }

    let readyToTest = input.value;

    if(isElevenNum(input.value)){
        console.log(readyToTest[0]);
        if(readyToTest[0] === "1"){
            if(readyToTest[1] === " "){
                readyToTest = readyToTest.slice(2);
            }else{
                readyToTest = readyToTest.slice(1);
            }
        }
    }
    
    const outputText = document.createElement("p");
    outputText.className = "output-text";


    if(checkNumRight(readyToTest) && readyToTest.match(/\d/g).length === 10){
        outputText.appendChild(
            document.createTextNode("Valid US number: " + input.value)
        )
    }else{
        outputText.appendChild(
            document.createTextNode("Invalid US number: " + input.value)
        )
    }
    
    output.appendChild(outputText);
    input.value = "";
}

const checkNumRight = (num) => {
    const regex = /^(?:\(?\d{3})\)?[ -]?\d{3}[ -]?\d{4}$/;

    if(num[0] === "(" || num[3] === ")"){
        if(num[4] !== ")")
            return false;
    }

    return regex.test(num);
}

const isElevenNum = (num) => {
    const regexNumLength = /\d/g;
    const storeNumArr = num.match(regexNumLength);

    if(storeNumArr !== null && storeNumArr.length === 11)
        return true;
    else
        return false;
}

const clearResult = () => {
    output.textContent = "";
}

checkBtn.addEventListener("click", checkPhoneNum);
clearBtn.addEventListener("click", clearResult);
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter")
        checkPhoneNum();
})