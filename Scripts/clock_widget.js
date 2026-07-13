const clockHourHand = document.querySelector("#clockHourHand");
const clockMinuteHand = document.querySelector("#clockMinuteHand");
const clockSecondHand = document.querySelector("#clockSecondHand");

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDegrees = (hours % 12) * 30 + (minutes / 60) * 30;
  const minuteDegrees = (minutes / 60) * 360;
  const secondDegrees = (seconds / 60) * 360;

  clockHourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
  clockMinuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
  clockSecondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
}

updateClock();
setInterval(updateClock, 1000);