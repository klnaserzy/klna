const inputNumEl = document.getElementById("number");
const convertBtnEl = document.getElementById("convert-btn");
const outputEl = document.getElementById("output");

const romanNum = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
const number = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

const chkInvalidInput = (numElVal) => {
  if(!numElVal){
    outputEl.textContent = "Please enter a valid number";
    return true;
  }

  if(parseInt(numElVal) < 1){
    outputEl.textContent = "Please enter a number greater than or equal to 1";
    return true;
  }

  if(parseInt(numElVal) > 3999){
    outputEl.textContent = "Please enter a number less than or equal to 3999";
    return true;
  }

  return false;
}

const convertToRoman = () => {
  if(chkInvalidInput(inputNumEl.value))
    return ;
  
  let resultRoman = "";
  let curNumber = parseInt(inputNumEl.value);
  let curIndex = romanNum.length - 1;

  while(curIndex >= 0){
    if(curNumber >= number[curIndex]){
      resultRoman += romanNum[curIndex];
      curNumber -= number[curIndex];
    }else{
      --curIndex;
    }
  }

  outputEl.textContent = resultRoman;
}

convertBtnEl.addEventListener("click", convertToRoman);
inputNumEl.addEventListener("keydown", (e) => {
  if(e.key === "Enter")
  convertToRoman();
})

