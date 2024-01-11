const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns ){
    for( let currCode in countryList){
        let newOtion=document.createElement("option");
        newOtion.innerText=currCode;
        newOtion.value=currCode;
        if (select.name === "from" && currCode === "USD") {
            newOtion.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOtion.selected = "selected";
        }
        select.append(newOtion);
    };
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const  updateexchangerate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    let URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let finalamt=amtval*rate;
    msg.innerText=`${amtval}${fromcurr.value} = ${finalamt}${tocurr.value}`;
    
}



const updateflag= (element)=>{
        let currCode=element.value;
        let countrycode=countryList[currCode];
        let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=newsrc;

};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchangerate();
});
window.addEventListener("load", () => {
    updateexchangerate();
});