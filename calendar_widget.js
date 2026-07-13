const calendarDays = document.querySelector("#calendarDays");
const calendarCurrentMonthYear = document.querySelector("#calendarCurrentMonthYear");
const prevMonthBtn = document.querySelector("#calendarBack");
const nextMonthBtn = document.querySelector("#calendarForward");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
    calendarDays.innerHTML = "";
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarCurrentMonthYear.innerText = `${months[month]} ${year}`;

    const today = new Date();
    const isCurrentMonth = (month === today.getMonth() && year === today.getFullYear());

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar_day", "empty");
        calendarDays.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar_day");
        dayCell.innerText = day.toString();

        if (isCurrentMonth && day === today.getDate()) {
            dayCell.classList.add("calendar_today");
        }

        calendarDays.appendChild(dayCell);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);