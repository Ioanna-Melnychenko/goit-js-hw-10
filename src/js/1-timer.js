// Описаний в документації
import flatpickr from "flatpickr";
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const inputEl=document.querySelector("#datetime-picker");
const btnEl=document.querySelector("[data-start]");
const daysEl=document.querySelector("[data-days]");
const hoursEl=document.querySelector("[data-hours]");
const minEl=document.querySelector("[data-minutes]");
const secEl=document.querySelector("[data-seconds]");

let userSelectedDate=null;
let userInterval=null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0]<=new Date()){
        iziToast.error({message:"Please choose a date in the future", position:"topRight"});
        btnEl.disabled=true;
    } else {
        userSelectedDate=selectedDates[0];
        btnEl.disabled=false;
    };
  },
};

flatpickr(inputEl, options);
btnEl.addEventListener("click", onClick);

function onClick(){
    btnEl.disabled=true;
    inputEl.disabled=true;
    userInterval=setInterval(() => {
    const dif=userSelectedDate-new Date();
    if(dif<=0){
        inputEl.disabled=false;
        clearInterval(userInterval);
        iziToast.success({message: "Finished", position: "topRight"});
        return;
    };
        upDateTimer(convertMs(dif))
    }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function upDateTimer({days, hours, minutes, seconds}){
    daysEl.textContent=addZero(days);
    hoursEl.textContent=addZero(hours);
    minEl.textContent=addZero(minutes);
    secEl.textContent=addZero(seconds);
};

function addZero(value){
    return String(value).padStart(2, "0");
};
