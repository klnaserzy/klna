const inputText = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultArea = document.querySelector(".result");

inputText.textContent = "123";

function checkPalindrome(str) {
    str = str.toLowerCase();
    
    const useToRemove = /[a-z0-9]/ig;
    let removeSpaceStr = str.match(useToRemove);
    
    let i = 0;
    let j = removeSpaceStr.length - 1;
    console.log(removeSpaceStr);
    while(i < j){
        if(removeSpaceStr[i] != removeSpaceStr[j])
        return false;
        ++i;
        --j;
    }
    return true;
}

const returnText = () => {
    console.log(inputText.value);
    if(inputText.value == ""){
        alert("Please input a value");
    }
    else if(checkPalindrome(inputText.value)){
        resultArea.textContent = `${inputText.value} is a palindrome`;
    }else{
        resultArea.textContent = `${inputText.value} is not a palindrome`;
    }
}

checkBtn.addEventListener("click", returnText);