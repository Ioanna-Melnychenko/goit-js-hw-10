import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl=document.querySelector(".form");
formEl.addEventListener("submit", onSubmit);
 function onSubmit(ev){
    ev.preventDefault();
    const delay=Number(ev.target.elements.delay.value);
    const state=ev.target.elements.state.value;
    createPromise(delay, state).then(delay=>{
        iziToast.success({message: `✅ Fulfilled promise in ${delay}ms`, position:"topRight"});
    }).catch(delay=>{
        iziToast.error({message: `❌ Rejected promise in ${delay}ms`, position:"topRight"});
    });
    formEl.reset();
 };

 function createPromise(delay, state){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(state==="fulfilled"){
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
 }