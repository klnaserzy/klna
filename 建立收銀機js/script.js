const changeDue = document.getElementById("change-due");
const registerDrawer = document.getElementById("register-drawer");
const purchaseBtn = document.getElementById("purchase-btn");
const totalPrice = document.getElementById("price");
const cashInput = document.getElementById("cash");

const currencyUnit = ['PENNY', 'NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE', 'TEN', 'TWENTY', 'ONE HUNDRED'];
const amount = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

let price = 10;
let cid = [
    ["PENNY", 0], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 5], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 100]
];


totalPrice.textContent = `Total: $${price}`;

const checkStatus = () => {
    let cash = parseFloat(cashInput.value);
    let refundMoney = parseFloat((cash - price).toFixed(2));
    let status = "";
    const remainingMoney = [];
    const registerMoney = [];
    const allCid = cid.reduce((acc, el) => {
        const elStr = String(el[1]).split(".");
        const power = elStr[1] ? elStr[1].length : 0;
        const tenPower = Math.pow(10, power);
        return parseFloat(((acc * tenPower + el[1] * tenPower) / tenPower).toFixed(2));
    }, 0);
    
    if(refundMoney < 0){
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if(refundMoney === 0){
        changeDue.innerHTML = `No change due - customer paid with exact cash`;
        return;
    }

    if(refundMoney > allCid){
        status = `INSUFFICIENT_FUNDS`;
        updateChangeDue([], status);
        return;
    }

    if(refundMoney === allCid){
        status = `CLOSED`;
        updateChangeDue((cid.filter(el => el[1] != 0).reverse()), status);
        cid.map(el => el[1] = 0);
        updateRegister(cid);
        return;
    }

    for(let i = amount.length - 1; i >= 0; --i){
        registerMoney.unshift([cid[i][0], cid[i][1]]);
        if(refundMoney >= registerMoney[0][1]){
            remainingMoney.push([registerMoney[0][0], registerMoney[0][1]]);
            refundMoney = parseFloat((refundMoney - registerMoney[0][1]).toFixed(2));
            registerMoney[0][1] = 0;
        }else{
            const multiple = parseInt(Math.floor(refundMoney / amount[i]));
            const makeARefund = amount[i] * multiple;
            refundMoney = parseFloat((refundMoney - makeARefund).toFixed(2));
            remainingMoney.push([registerMoney[0][0], makeARefund]);
            registerMoney[0][1] = parseFloat((registerMoney[0][1] - makeARefund).toFixed(2));
        }
    }

    if(refundMoney != 0){
        status = `INSUFFICIENT_FUNDS`;
        updateChangeDue([], status);
    }else{
        status = `OPEN`;
        updateChangeDue(remainingMoney.filter(el => el[1] != 0), status);
        cid = registerMoney;
        updateRegister(cid);
    }

    console.log(cid);
}

const updateRegister = (paraCid) => {
    registerDrawer.innerHTML = `<p class="change change-title">Change in drawer:</p>`
    paraCid.forEach(el => {
        registerDrawer.innerHTML += `<p class="change">${el[0]}: $${el[1]}</p>`
    })
}

const updateChangeDue = (remainingMoney, status) => {
    changeDue.innerHTML = `<p class="change-due">Status: ${status}</p>`;
    remainingMoney.forEach(el => {
        changeDue.innerHTML += `<p class="change-due">${el[0]}: $${el[1]}`
    })
    
}

updateRegister(cid);

purchaseBtn.addEventListener("click", checkStatus);
cashInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        checkStatus();
    }
})