document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearLabel = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    const events = {
        '2026-03-09': 'Турнир по баскетболу',
        '2026-03-19': 'Встреча с командой',
        '2026-03-23': 'Старт курса дизайн',
        '2026-03-01': 'Олимпиада по экономике',
    };

    let currentMonth = 2; // Март (начинается с 0: Январь)
    let currentYear = 2026;

    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

                    cell.textContent = date;

                    if (events[formattedDate]) {
                        const eventDiv = document.createElement('div');
                        eventDiv.textContent = events[formattedDate];
                        eventDiv.classList.add('event');
                        cell.appendChild(eventDiv);
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
        monthYearLabel.textContent = `${new Date(year, month).toLocaleString('ru-RU', { month: 'long' }).toUpperCase()} ${year}`;
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    generateCalendar(currentMonth, currentYear);
});
